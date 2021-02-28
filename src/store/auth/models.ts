export interface IauthState {
  userData: object | undefined;
  isAuthed: boolean;
  userName: string;
}

export class AuthState implements IauthState {
  userData = undefined; // ユーザー情報
  isAuthed = false; // ログインしているか
  userName = "ゲスト"; // ユーザー名(ログアウト時はゲスト)
}