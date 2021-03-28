import firebase from "firebase/app";

export interface IauthState {
  userData: firebase.User | undefined;
  isAuthed: boolean;
  userName: string;
}

export class AuthState implements IauthState {
  userData = undefined; // ユーザー情報
  isAuthed = false; // ログインしているか
  userName = "ゲスト"; // ユーザー名(ログアウト時はゲスト)
}