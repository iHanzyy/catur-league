import Image from 'next/image';
import SignInButtons from './SignInButtons';

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-950 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Catur League</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Sign in to manage the chess scoreboard</p>
        </div>
        
        <SignInButtons />
        
        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Only authorized admins can modify scores</p>
        </div>
      </div>
    </div>
  );
}
