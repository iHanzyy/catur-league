import PlayerCard from '@/components/ui/PlayerCard';
import AuthButton from '@/components/ui/AuthButton';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { getScores } from '@/lib/firestore';
import { getAuthData } from '@/lib/auth';
import { 
  addPlayer1Win, 
  addPlayer2Win, 
  addDraw, 
  resetScores 
} from './actions';

export default async function Home() {
  // Get data from Firestore
  const scores = await getScores();
  const { user, isAdmin } = await getAuthData();
  
  const { player1Wins, player2Wins, draws } = scores;
  const totalMatches = player1Wins + player2Wins + draws;

  // Logika untuk menentukan leader
  const isPlayer1Leader = player1Wins > player2Wins;
  const isPlayer2Leader = player2Wins > player1Wins;
  
  return (
    <div className="min-h-screen transition-colors bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="flex items-center justify-between w-full px-6 py-4 bg-white shadow-sm dark:bg-slate-800">
        <h1 className="text-xl font-bold md:text-2xl">Catur League</h1>
        <div className="flex items-center gap-4">
          <AuthButton />
          <ThemeSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl px-4 py-12 mx-auto">
        {/* Players */}
        <div className="flex flex-row items-center justify-center gap-1 mb-12 sm:gap-6">
          <div className="flex justify-end flex-1">
            <PlayerCard 
              name="Andra" 
              wins={player1Wins} 
              action={addPlayer1Win}
              disabled={!isAdmin}
              photoUrl="/andra.jpg"
              isLeader={isPlayer1Leader}
            />
          </div>

          {/* VS Image di tengah */}
          <div className="flex items-center justify-center flex-shrink-0 mx-1 sm:mx-3">
            <img 
              src="/vsImage.png" 
              alt="VS" 
              className="object-contain w-16 h-16 sm:w-24 sm:h-24"
              style={{ minWidth: '4rem', minHeight: '4rem' }}
            />
          </div>
          
          <div className="flex justify-start flex-1">
            <PlayerCard 
              name="Jojo" 
              wins={player2Wins} 
              action={addPlayer2Win}
              disabled={!isAdmin}
              photoUrl="/jojo.jpg"
              isLeader={isPlayer2Leader}
            />
          </div>
        </div>
        
        {/* Leader Status */}
        {(isPlayer1Leader || isPlayer2Leader) && (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center px-4 py-2 text-yellow-800 bg-yellow-100 rounded-lg dark:bg-yellow-900/30 dark:text-yellow-400">
              <span className="mr-2 text-2xl">👑</span>
              <span className="font-semibold">
                {isPlayer1Leader ? 'Andra' : 'Jojo'} is currently leading with {Math.max(player1Wins, player2Wins)} wins!
              </span>
            </div>
          </div>
        )}
        
        {/* Draw message when tied */}
        {player1Wins === player2Wins && player1Wins > 0 && (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center px-4 py-2 text-blue-800 bg-blue-100 rounded-lg dark:bg-blue-900/30 dark:text-blue-400">
              <span className="mr-2 text-2xl">⚖️</span>
              <span className="font-semibold">
                It's a tie! Both players have {player1Wins} wins each.
              </span>
            </div>
          </div>
        )}
        
        {/* Statistics */}
        <div className="p-6 mb-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl">
          <h2 className="mb-4 text-xl font-semibold text-center">Match Statistics</h2>
          
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3">
            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">Draws</p>
              <p className="text-2xl font-bold">{draws}</p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Matches</p>
              <p className="text-2xl font-bold">{totalMatches}</p>
            </div>
            
            <div className="col-span-2 p-4 rounded-lg md:col-span-1 bg-slate-100 dark:bg-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">Last Updated</p>
              <p className="text-lg font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <form action={addDraw}>
              <button 
                type="submit"
                className="w-full px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700"
              >
                Catat Hasil Seri
              </button>
            </form>
            
            <form action={resetScores}>
              <button 
                type="submit"
                className="w-full px-6 py-3 text-white transition-colors bg-red-600 rounded-lg sm:w-auto hover:bg-red-700"
              >
                Reset Skor
              </button>
            </form>
          </div>
        )}
      </main>
      
      <footer className="py-6 text-sm text-center border-t text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700">
        &copy; {new Date().getFullYear()} Catur League. All rights reserved.
      </footer>
    </div>
  );
}
