import { ActionTree } from "vuex";
import { IauthState } from "./models";
import { RootState } from "../RootState";

import router from '@/router';

import firebase from "firebase/app";
import "firebase/auth";

export const actions: ActionTree<IauthState, RootState> = {
  signUp(context, payload: { name: string; id: string; password: string }) { // サインアップの処理
    firebase.auth().createUserWithEmailAndPassword(payload.id, payload.password)
      .then(() => { // 成功したらモーダル閉じてホームへ
        context.dispatch("modal/closeModal", null, {root: true});
        router.push('/');

        context.commit("setUserName", payload.name);
      })
      .catch(error => {
        alert(error.message);
      });
  },
  signIn(context, payload: { name: string; id: string; password: string }) { // ログインの処理
    firebase.auth().signInWithEmailAndPassword(payload.id, payload.password)
      .then(() => { // 成功したらモーダル閉じてホームへ
        context.dispatch("modal/closeModal", null, {root: true});
        router.push('/');

        context.commit("setUserName", payload.name);
      })
      .catch(error => {
        alert(error.message);
      });
  },
  signOut(context) { // ログアウト処理
    firebase.auth().signOut()
      .then(() => {
        context.dispatch("modal/closeModal", null, {root: true});
        router.push('/'); // 成功したらホームへ

        context.commit("setUserName", "guest");
      }).catch(error => {
        alert(error.message);
      })
  },
  onAuthChanged({ commit }) { // 認証情報の変更で自動的に書き換え
    firebase.auth().onAuthStateChanged(user => {
      const userData: firebase.User | undefined = user ? user : undefined;
      commit("setUserData", userData);
      commit("setSignInState", userData?.uid ? true : false);
    });
  },
  error({ commit }, payload) {
    commit("setErrorMessage", payload);
  },
};