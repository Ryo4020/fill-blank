<template>
  <div class="arrow-home" @click="transHome">
    <img src="@/assets/icons/arrow-back.svg" />
    <div class="arrow-home-text">一覧に戻る</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Router, useRouter } from 'vue-router';

export default defineComponent({
  name: "ArrowToHome",
  setup() {
    const router: Router = useRouter();

    function transHome(): void { // ホーム画面へ遷移
      router.push('/');
    }

    return {
      transHome
    };
  },
});
</script>

<style lang="scss" scoped>
.arrow-home {
  width: 104px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &-text {
    font-size: 14px;
    padding: 0px 4px;
  }

  &:hover {
    border: 1px solid gray;
  }
}
</style>