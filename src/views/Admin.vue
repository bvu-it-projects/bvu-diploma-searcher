<template>
  <div class="admin-page">
    <router-view></router-view>
    <a-button type="danger" @click="logout">Logout</a-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Button, Calendar, Input, Form,
} from 'ant-design-vue';
import firebase from 'firebase/app';

Vue
  .use(Button)
  .use(Form)
  .use(Calendar)
  .use(Input);

export default Vue.extend({
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        window.location.href = '/';
      });
    },
  },
});
</script>
