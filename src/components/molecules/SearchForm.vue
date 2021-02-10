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
  emits: ["search-event"],
  setup(props, context: SetupContext) {
    const searchWord = ref<string>(""); // 検索ワード

    function search(): void {
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
  grid-template-columns: 1fr 48px;
  column-gap: 8px;

  .button-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>