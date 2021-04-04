<template>
  <div class="search-form">
    <TextField v-model="searchWord" label="探したいワードを入力" />
    <div class="button-wrapper">
      <CommonButton label="検索" @click-event="search" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from "vue";

import TextField from "@/components/atoms/TextField.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default defineComponent({
  name: "SearchForm",
  components: {
    TextField,
    CommonButton,
  },
  props: {
    word: {
      // 入力される文字列
      type: String,
      required: true,
    },
  },
  emits: ["search-event"],
  setup(props, context: SetupContext) {
    const searchWord = ref<string>(props.word); // 検索ワードをコピー

    function search(): void { // 検索開始
      context.emit("search-event", searchWord.value);
    }

    return {
      searchWord,
      search,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-form {
  width: 100%;
  height: 36px;
  display: grid;
  grid-template-columns: 1fr 64px;
  column-gap: 8px;

  .button-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>