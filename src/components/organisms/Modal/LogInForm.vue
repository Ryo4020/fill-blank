<template>
  <ModalFrame size="M">
    <template v-slot:header>
      <div class="header-label">{{ label(0) }}</div>
    </template>
    <template v-slot:content>
      <FormComponent
        v-for="form in logInDataList"
        :key="form.id"
        :form="form"
        @change-value="changeFormValue"
      />
    </template>
    <template v-slot:footerLeft>
      <div class="footer-left">
        <div>{{ label(1) }}は</div>
        <div class="footer-left-link" @click="shiftMode">こちら</div>
      </div>
    </template>
    <template v-slot:footerRight>
      <CommonButton :label="label(0)" @click-event="authenticate" />
    </template>
  </ModalFrame>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

import ModalFrame from "@/components/organisms/Modal/ModalFrame.vue";
import FormComponent, {
  PropFormType as IlogInData,
} from "@/components/molecules/FormComponent.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default defineComponent({
  name: "LogInForm",
  components: {
    ModalFrame,
    FormComponent,
    CommonButton,
  },
  setup() {
    const logInDataList = ref<IlogInData[]>([
      // フォームのデータを格納
      {
        id: 1,
        label: "Name(任意)",
        value: "デフォルト",
        formType: "TextField",
      },
      {
        id: 2,
        label: "E-Mail",
        value: "",
        formType: "TextField",
      },
      {
        id: 3,
        label: "Password",
        value: "",
        formType: "PasswordField",
      },
    ]);

    function changeFormValue(value: string, id: number): void {
      // フォームの入力内容をデータに反映
      logInDataList.value[id - 1].value = value;
    }

    const isSignIn = ref<boolean>(true); // ログインのモーダルならtrue、新規登録ならfalse
    const label = computed(() => {
      // 表示するラベルを場所と種類で場合分け
      return function (key: number): string {
        if (key === 0) {
          return isSignIn.value ? "ログイン" : "新規登録";
        } else {
          return isSignIn.value ? "新規登録" : "ログイン";
        }
      };
    });

    function shiftMode(): void {
      // ログインと新規登録の切り替え
      isSignIn.value = !isSignIn.value;
    }

    const store = useStore();
    
    function authenticate(): void {
      // サインインまたはサインアップ
      const methodName: string = isSignIn.value ? "signIn" : "signUp";
      const authData: {name: string; id: string; password: string} = { // 認証情報
        name: logInDataList.value[0].value,
        id: logInDataList.value[1].value,
        password: logInDataList.value[2].value,
      };

      store.dispatch(`auth/${ methodName }`, authData);
    }

    return {
      logInDataList,
      changeFormValue,

      label,
      shiftMode,

      authenticate,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-label {
  font-size: 18px;
  font-weight: bold;
}

.footer-left {
  display: flex;

  &-link {
    border-bottom: 1px solid black;
    padding-left: 2px;
    cursor: pointer;

    &:hover {
      color: gray;
      border-bottom-color: gray;
    }
  }
}
</style>