export enum AuthError {
  'EMAIL_EXISTS' = 'The email address is already in use by another account',
  'TOO_MANY_ATTEMPTS_TRY_LATER' = 'We have blocked all requests from this device due to unusual activity. Try again later',
  'EMAIL_NOT_FOUND' = 'Invalid email or password',
  'INVALID_PASSWORD' = 'Invalid email or password',
  'USER_DISABLED' = 'The user account is currently disabled',
  'TOKEN_EXPIRED' = 'The token has expired. Please login again',
  'USER_NOT_FOUND' = 'The user corresponding to the refresh token was not found. It is likely the user was deleted',
  'INVALID_REFRESH_TOKEN' = 'The refresh token provided is invalid',
}
