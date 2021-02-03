<template>
  <div class="global-header">
    <HeaderLogo />
    <div class="global-header-link">
      <AccountLink :label="linkLabel" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HeaderLogo from "@/components/atoms/HeaderLogo.vue";
import AccountLink from "@/components/atoms/AccountLink.vue";

export default defineComponent({
  name: "GlobalHeader",
  components: {
    HeaderLogo,
    AccountLink,
  },
  props: {
    linkLabel: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.global-header {
  width: 100%;
  height: 72px;
  background: silver;
  display: flex;
  justify-content: center;
  align-items: center;

  &-link {
    position: absolute;
    right: 24px;
  }
}
</style>