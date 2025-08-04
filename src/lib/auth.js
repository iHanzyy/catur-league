import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * Retrieves the current session on the server
 * @returns {Promise<Session|null>} The session object or null if not authenticated
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Checks if the current user is an admin
 * @returns {Promise<boolean>} True if the user is an admin, false otherwise
 */
export async function isAdmin() {
  const session = await getSession();
  return session?.user?.isAdmin === true;
}

/**
 * Provides authentication-related data for client components
 * @returns {Promise<{isAuthenticated: boolean, isAdmin: boolean, user: Object|null}>}
 */
export async function getAuthData() {
  const session = await getSession();
  
  return {
    isAuthenticated: !!session,
    isAdmin: session?.user?.isAdmin === true,
    user: session?.user || null
  };
}
