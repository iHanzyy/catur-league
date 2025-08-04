'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PlayerCard({ name, wins, action, disabled, photoUrl, isLeader }) {
  const [prevWins, setPrevWins] = useState(wins);
  const [scoreChanged, setScoreChanged] = useState(false);

  // Detect when score changes to trigger animation
  useEffect(() => {
    if (wins !== prevWins) {
      setScoreChanged(true);
      // Reset after animation completes
      const timer = setTimeout(() => {
        setScoreChanged(false);
        setPrevWins(wins);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [wins, prevWins]);

  const handleAction = async () => {
    if (action && !disabled) {
      await action();
    }
  };

  // Default avatar placeholder (fallback jika foto tidak ada)
  const defaultAvatar = `data:image/svg+xml;base64,${btoa(`
    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" fill="#e2e8f0"/>
      <circle cx="64" cy="45" r="20" fill="#94a3b8"/>
      <path d="M64 75c-22 0-40 18-40 40v13h80v-13c0-22-18-40-40-40z" fill="#94a3b8"/>
    </svg>
  `)}`;

  return (
    <div className="relative p-8 text-center transition-all duration-300 bg-white border shadow-xl hover:shadow-2xl dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
      {/* Crown for leader - Hanya tampil jika isLeader = true */}
      {isLeader && (
        <div className="absolute transform -translate-x-1/2 left-1/2">
          <motion.div
            className="absolute w-16 h-16 text-4xl -top-8"
            initial={{ y: -20, opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotate: 25 }}
            exit={{ y: -20, opacity: 0, scale: 0.5, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              duration: 0.6
            }}
          >
            👑
          </motion.div>
        </div>
      )}
      
      {/* Avatar with real photo */}
      <div className={`relative w-36 h-36 mx-auto mb-6 overflow-hidden border-4 rounded-full transition-all duration-300 ${
        isLeader 
          ? 'border-yellow-400 shadow-lg shadow-yellow-400/50 ring-4 ring-yellow-100 dark:ring-yellow-900/30' 
          : 'border-slate-200 dark:border-slate-700'
      }`}>
        <Image
          src={photoUrl || defaultAvatar}
          alt={name}
          width={144}
          height={144}
          className="object-cover w-full h-full"
          priority
          onError={(e) => {
            // Fallback ke default avatar jika foto gagal load
            e.target.src = defaultAvatar;
          }}
        />
      </div>

      {/* Player name */}
      <h2 className={`mb-4 text-2xl font-display font-bold transition-colors duration-300 ${
        isLeader 
          ? 'text-yellow-600 dark:text-yellow-400' 
          : 'text-slate-800 dark:text-white'
      }`}>
        {name}
        {isLeader && <span className="block mt-1 text-sm font-medium text-yellow-500 dark:text-yellow-400">🏆 Champion</span>}
      </h2>
      
      {/* Score */}
      <div className="mb-6 text-center">
        <p className="mb-2 text-sm font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400">Wins</p>
        <motion.span
          className={`text-5xl font-display font-bold transition-colors duration-300 ${
            isLeader 
              ? 'text-yellow-600 dark:text-yellow-400' 
              : 'text-slate-900 dark:text-white'
          }`}
          animate={scoreChanged ? {
            scale: [1, 1.2, 1],
            color: isLeader ? ['#ca8a04', '#10b981', '#ca8a04'] : ['currentColor', '#10b981', 'currentColor']
          } : {}}
          transition={{ duration: 0.5 }}
          key={wins}
        >
          {wins}
        </motion.span>
      </div>

      {/* Win button */}
      {!disabled && (
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAction}
          className={`w-full px-6 py-3 mt-4 text-white font-display font-semibold transition-all duration-200 rounded-xl shadow-lg hover:shadow-xl ${
            isLeader 
              ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700' 
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
          }`}
        >
          Jadikan Pemenang
        </motion.button>
      )}
    </div>
  );
}
