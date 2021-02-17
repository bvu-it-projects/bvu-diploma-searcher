<template>
  <div class="container">
    <a-result status="404" title="404"
      sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <a-button type="primary"
          @click="goHome"
          icon="appstore">
          Dashboard
        </a-button>
        <a-button type="primary"
          @click="goBack"
          icon="arrow-left">
          Back
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Result, Button } from 'ant-design-vue';

Vue.use(Result).use(Button);

export default Vue.extend({
  methods: {
    goHome() {
      this.$router.push('/');
    },
    goBack() {
      this.$router.back();
    },
  },
});
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
