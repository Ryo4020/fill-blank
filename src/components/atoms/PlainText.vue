<template>
  <div class="plain">{{ text }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlainText",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.plain {
  font-size: 22px;
  display: inline;
  word-break: break-all;
}
</style>