<template>
  <div class="home">
    <a-form>
      <a-form-item></a-form-item>
    </a-form>
    <a-button type="primary">Tra cứu</a-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Button, Calendar, Input, Form,
} from 'ant-design-vue';

Vue
  .use(Button)
  .use(Form)
  .use(Calendar)
  .use(Input);

export default Vue.extend({
});
</script>
