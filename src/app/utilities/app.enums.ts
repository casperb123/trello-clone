export enum DialogType {
  'CreateWorkspace',
  'CreateBoard',
}

export enum ControlType {
  Email = 'email',
  DisplayName = 'display name',
  Password = 'password',
  Title = 'title',
  Description = 'description',
  ColorRed = 'red color',
  ColorGreen = 'green color',
  ColorBlue = 'blue color',
}

export enum ApiEndpoint {
  AuthRegister = '/accounts:signUp',
  AuthLogin = '/accounts:signInWithPassword',
  AuthRefreshToken = '/token',
  AuthGetUserData = '/accounts:lookup',
  AuthUpdateUserData = '/accounts:update',
  Workspaces = '/workspaces.json',
  Boards = '/boards.json',
}

export enum ApiType {
  Auth,
  Database,
}
