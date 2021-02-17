export interface IauthState {
  userName: string;
  userData: object | undefined;
  isAuthed: boolean;
}

export class AuthState implements IauthState {
  userName = "guest"; // ユーザー名(ログアウト時はguest)
  userData = undefined; // ユーザー情報
  isAuthed = false; // ログインしているか
}
