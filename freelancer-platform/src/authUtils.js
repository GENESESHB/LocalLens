import { BACKEND_ENDPOINT } from './constants';

export async function checkUserAuthentication() {
  try {
    const response = await fetch(`${BACKEND_ENDPOINT}api/users/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {


      const refreshResponse = await fetch(`${BACKEND_ENDPOINT}auth/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        return checkUserAuthentication();
      } else {
        throw new Error('Failed to refresh token');
      }
    } else {
      throw new Error('Failed to authenticate user');
    }
  } catch (error) {
    console.error('Error during authentication check:', error);
    throw error;
  }
}
