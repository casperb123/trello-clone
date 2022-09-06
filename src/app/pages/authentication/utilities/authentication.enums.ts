export enum AuthError {
  'EMAIL_EXISTS' = 'This email address is already in use by another account',
  'TOO_MANY_ATTEMPTS_TRY_LATER' = 'We have blocked all requests from this device due to unusual activity. Try again later',
  'EMAIL_NOT_FOUND' = 'Invalid email or password',
  'INVALID_PASSWORD' = 'Invalid email or password',
  'USER_DISABLED' = 'This account is currently disabled',
}
