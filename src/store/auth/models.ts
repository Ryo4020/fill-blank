export interface IauthState {
  userData: object | undefined;
  isAuthed: boolean;
}

export class AuthState implements IauthState {
  userData = undefined; // ユーザー情報
  isAuthed = false; // ログインしているか
}
