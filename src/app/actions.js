'use server';

import { isAdmin } from '@/lib/auth';
import { getScores, updateScores, resetScores as resetFirestoreScores } from '@/lib/firestore';
import { revalidatePath } from 'next/cache';

/**
 * Adds a win for player 1
 */
export async function addPlayer1Win() {
  // Server-side validation to ensure only admins can modify scores
  if (!await isAdmin()) {
    throw new Error('Unauthorized: Only admins can modify scores');
  }

  try {
    const currentScores = await getScores();
    const newScores = {
      ...currentScores,
      player1Wins: currentScores.player1Wins + 1
    };
    
    await updateScores(newScores);
    revalidatePath('/'); // Revalidate the home page to reflect new scores
    return { success: true };
  } catch (error) {
    console.error('Failed to update player 1 score:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Adds a win for player 2
 */
export async function addPlayer2Win() {
  // Server-side validation to ensure only admins can modify scores
  if (!await isAdmin()) {
    throw new Error('Unauthorized: Only admins can modify scores');
  }

  try {
    const currentScores = await getScores();
    const newScores = {
      ...currentScores,
      player2Wins: currentScores.player2Wins + 1
    };
    
    await updateScores(newScores);
    revalidatePath('/'); // Revalidate the home page to reflect new scores
    return { success: true };
  } catch (error) {
    console.error('Failed to update player 2 score:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Adds a draw
 */
export async function addDraw() {
  // Server-side validation to ensure only admins can modify scores
  if (!await isAdmin()) {
    throw new Error('Unauthorized: Only admins can modify scores');
  }

  try {
    const currentScores = await getScores();
    const newScores = {
      ...currentScores,
      draws: currentScores.draws + 1
    };
    
    await updateScores(newScores);
    revalidatePath('/'); // Revalidate the home page to reflect new scores
    return { success: true };
  } catch (error) {
    console.error('Failed to update draw count:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Resets all scores to zero
 */
export async function resetScores() {
  // Server-side validation to ensure only admins can modify scores
  if (!await isAdmin()) {
    throw new Error('Unauthorized: Only admins can reset scores');
  }

  try {
    await resetFirestoreScores();
    revalidatePath('/'); // Revalidate the home page to reflect reset scores
    return { success: true };
  } catch (error) {
    console.error('Failed to reset scores:', error);
    return { success: false, error: error.message };
  }
}
