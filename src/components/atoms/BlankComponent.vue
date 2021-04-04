<template>
  <div :class="['blank', setClassOpen]" @click="clickBlank">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from "vue";

export default defineComponent({
  name: "BlankComponent",
  props: {
    blankId: {
      type: Number,
      required: true,
    },
    isOpened: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  emits: ["click-blank"],
  setup(props, context: SetupContext) {
    const setClassOpen = computed(() => props.isOpened ? "open" : ""); // propsを監視して解答表示切り替え

    function clickBlank(): void {
      context.emit("click-blank", props.blankId);
    }

    return {
      setClassOpen,

      clickBlank,
    };
  },
});
</script>

<style lang="scss" scoped>
.blank {
  font-size: 24px;
  color: white;
  background: white;
  display: inline;
  border: 1px solid black;
  margin: 0px 8px;
}

.open {
  color: black !important;
  background: silver !important;
  border: none !important;
}
</style>