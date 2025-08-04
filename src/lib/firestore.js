import { db } from './firebase';

// Default initial scores
const DEFAULT_SCORES = {
  player1Wins: 0,
  player2Wins: 0,
  draws: 0
};

const SCORES_COLLECTION = 'chess-scores';
const SCORES_DOC_ID = 'current-scores';

/**
 * Retrieves the current chess scores from Firestore
 * @returns {Promise<{player1Wins: number, player2Wins: number, draws: number}>}
 */
export async function getScores() {
  try {
    const docRef = db.collection(SCORES_COLLECTION).doc(SCORES_DOC_ID);
    const doc = await docRef.get();
    
    if (doc.exists) {
      return doc.data();
    } else {
      // If document doesn't exist, create it with default values
      await docRef.set(DEFAULT_SCORES);
      return DEFAULT_SCORES;
    }
  } catch (error) {
    console.error('Failed to get scores from Firestore:', error);
    return DEFAULT_SCORES;
  }
}

/**
 * Updates the chess scores in Firestore
 * @param {Object} newScores - The new scores object to store
 * @returns {Promise<boolean>} - Success status of the update operation
 */
export async function updateScores(newScores) {
  try {
    const docRef = db.collection(SCORES_COLLECTION).doc(SCORES_DOC_ID);
    await docRef.set(newScores);
    return true;
  } catch (error) {
    console.error('Failed to update scores in Firestore:', error);
    return false;
  }
}

/**
 * Resets all scores to zero
 * @returns {Promise<boolean>} - Success status of the reset operation
 */
export async function resetScores() {
  try {
    const docRef = db.collection(SCORES_COLLECTION).doc(SCORES_DOC_ID);
    await docRef.set(DEFAULT_SCORES);
    return true;
  } catch (error) {
    console.error('Failed to reset scores in Firestore:', error);
    return false;
  }
}
