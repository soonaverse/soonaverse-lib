import { initializeApp } from 'firebase/app';

/**
 * Public api key for Soonaverse
 */
export const API_KEY = 'AIzaSyB4fcG8rtNWAiAtSmxmK3q3JLfMvtNCGP4';

/**
 * Soonaverse prod project id
 */
export const PROJECT_ID = 'soonaverse';

/**
 * Initializes the soonaverse firebase app
 * @param apiKey - Firebase api key, default is the public soonaverse api key
 * @param projectId - Firebase project id, default is soonaverse
 * @returns
 */
export const initSoonApp = (apiKey = API_KEY, projectId = PROJECT_ID) =>
  initializeApp({ apiKey, projectId });
