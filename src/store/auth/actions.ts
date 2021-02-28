import { ActionTree } from "vuex";
import { IauthState } from "./models";
import { RootState } from "../RootState";

import router from '@/router';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const actions: ActionTree<IauthState, RootState> = {
  signUp({ dispatch }, payload: { id: string; password: string; name: string }): void { // サインアップの処理
    firebase.auth().createUserWithEmailAndPassword(payload.id, payload.password)
      .then(user => {
        dispatch("setUserDocument", user.user); // dbにデータ追加
        dispatch("updateUserName", { user: user.user, name: payload.name }); // ユーザーネームを設定

        // 成功したらモーダル閉じてホームへ
        dispatch("modal/closeModal", null, { root: true });
        router.push('/');
      })
      .catch(error => {
        alert(error.message);
      });
  },
  signIn({ dispatch }, payload: { name: string; id: string; password: string }): void { // ログインの処理
    firebase.auth().signInWithEmailAndPassword(payload.id, payload.password)
      .then(() => { // 成功したらモーダル閉じてホームへ
        dispatch("modal/closeModal", null, { root: true });
        router.push('/');
      })
      .catch(error => {
        alert(error.message);
      });
  },
  signOut({ dispatch }): void { // ログアウト処理
    firebase.auth().signOut()
      .then(() => {
        dispatch("modal/closeModal", null, { root: true });
        router.push('/'); // 成功したらホームへ
      }).catch(error => {
        alert(error.message);
      })
  },
  onAuthChanged({ commit }): void { // 認証情報の変更で自動的に書き換え
    firebase.auth().onAuthStateChanged(user => {
      const userData: firebase.User | undefined = user ? user : undefined;
      commit("setUserData", userData);
      commit("setSignInState", userData?.uid ? true : false);
      commit("setUserName", userData?.uid ? userData.displayName : "ゲスト");
    });
  },
  setUserDocument(context, payload: firebase.User): void { // dbのuserコレクションにドキュメント追加
    firebase.firestore().collection('users').doc(payload.uid).set({
      uid: payload.uid,
      id: payload.email,
    }).then(() => {
      console.log(payload.uid);
    });
  },
  async updateUserName({ dispatch }, payload: { user: firebase.User; name: string }): Promise<void> { // firebase上のユーザーネームを更新
    await payload.user.updateProfile({ displayName: payload.name });

    dispatch("onAuthChanged"); // 変更をvuex
  },
  error({ commit }, payload): void {
    commit("setErrorMessage", payload);
  },
};