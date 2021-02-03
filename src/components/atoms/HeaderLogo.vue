<template>
  <div class="header-logo" @click="transHome">Fill Blank</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Router, useRouter } from 'vue-router'

export default defineComponent({
  name: 'HeaderLogo',
  setup() {
    const router: Router = useRouter();

    function transHome(): void {
      router.push('/');
    }

    return {
      transHome
    };
  },
});
</script>

<style lang="scss" scopped>
.header-logo {
    font-size: 28px;
    color: black;
    font-weight: bold;
    cursor: pointer;
}
</style>