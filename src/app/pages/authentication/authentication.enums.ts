export enum AuthControlType {
  email = 'email',
  password = 'password',
}

export enum AuthDialogType {
  'login',
  'register',
}

export enum AuthError {
  'EMAIL_EXISTS' = 'The email address is already in use by another account',
  'TOO_MANY_ATTEMPTS_TRY_LATER' = 'We have blocked all requests from this device due to unusual activity. Try again later',
  'EMAIL_NOT_FOUND' = 'Invalid email or password',
  'INVALID_PASSWORD' = 'Invalid email or password',
  'USER_DISABLED' = 'The user account is currently disabled',
}
