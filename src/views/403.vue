<template>
  <div class="container">
    <a-result status="403"
      title="403"
      sub-title="Sorry, you are not authorized to access this page.">
      <template #extra>
        <a-button type="primary" @click="goHome">
          Home
        </a-button>
      </template>
      <a-button type="primary"
          @click="goBack"
          icon="arrow-left">
          Back
        </a-button>
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
