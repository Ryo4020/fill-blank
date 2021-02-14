<template>
  <div class="modal-frame" :class="setClassSize">
    <div class="modal-header">
      <slot name="header"></slot>
      <div class="close">
        <img src=@/assets/icons/cross-closer.svg @click="closeModal" />
      </div>
    </div>
    <div class="modal-content">
      <slot name="content"></slot>
    </div>
    <div class="modal-footer">
      <slot name="footerLeft"></slot>
      <slot name="footerRight"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ModalFrame",
  props: {
    size: {
      // モーダルのサイズ
      type: String,
      default: "M",
      validator: (value: string) => {
        // プロパティの値は、必ずいずれかの文字列でなければならない
        return ["S", "M", "L"].indexOf(value) !== -1;
      },
    },
  },
  setup(props) {
    const store = useStore();

    const setClassSize = computed(() => `size-${props.size}`); // モーダルの大きさごとにクラス付与

    function closeModal(): void {
      // モーダル閉じる処理
      store.dispatch("modal/closeModal");
    }

    return {
      setClassSize,
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal-frame {
  z-index: 1000;
  width: 400px;
  background: white;
  display: grid;
  grid-template-rows: 32px 1fr 32px;
  row-gap: 8px;
  border-radius: 4px;
  padding: 16px;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .close {
      width: 24px;
      display: flex;
      justify-content: center;
      img {
        width: 24px;
        cursor: pointer;
      }

      &:hover {
        border: 1px solid black;
      }
    }
  }

  .modal-content {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto; // 左右中央揃え用
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.size-S {
  height: 200px;
}

.size-M {
  height: 400px;
}

.size-L {
  height: 600px;
}
</style>