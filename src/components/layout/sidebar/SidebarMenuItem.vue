<template functional>
  <div>
    <a-sub-menu :key="item.href" v-if="item.children">
      <span slot="title" class="flex items-center">
        <ion-icon :name="item.icon"></ion-icon>
        <span class="ml-3 mr-4 font-bold capitalize">{{ item.title }}</span>
      </span>

      <a-menu-item v-for="subItem in item.children" :key="item.href + subItem.href">
        <router-link :to="item.href + subItem.href" class="pl-2">{{ subItem.title }}</router-link>
      </a-menu-item>
    </a-sub-menu>

    <a-menu-item :key="item.href" v-if="!item.children">
      <router-link :to="item.href">
        <span class="flex items-center">
          <ion-icon :name="item.icon"></ion-icon>
          <span class="ml-3 mr-4 font-bold capitalize">{{ item.title }}</span>
        </span>
      </router-link>
    </a-menu-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Menu } from 'ant-design-vue';

Vue.use(Menu);

export default Vue.extend({
  name: 'SidebarMenuItem',
  props: [
    'item',
  ],
});
</script>
