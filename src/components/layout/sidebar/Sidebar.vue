<template>
  <a-layout-sider id="sidebar" theme="light" class="h-screen overflow-auto fixed left-0 z-10" style="max-width: unset; width: auto;">
    <a-menu mode="inline" :default-selected-keys="['/']" class="select-none">

    <template v-for="item in menuItems">
      <a-menu-item v-if="!item.children" :key="item.href">
        <router-link :to="item.href" class="flex items-center" style="display: flex;">
            <ion-icon :name="item.icon" class="mr-1" v-if="item.icon" />
            <span class="ml-2 mr-4">{{ item.title }}</span>
          </router-link>
      </a-menu-item>

      <sub-menu v-else :key="item.key" :menu-info="item" />
    </template>

    </a-menu>
  </a-layout-sider>
</template>

<script>
import { Menu } from 'ant-design-vue';

const SubMenu = {
  template: `
    <a-sub-menu :key="menuInfo.href" v-bind="$props" v-on="$listeners">
      <span slot="title" class="flex items-center">
        <ion-icon :name="menuInfo.icon" class="mr-1" />
        <span class="ml-2 mr-4">{{ menuInfo.title }}</span>
      </span>

      <template v-for="item in menuInfo.children">
        <a-menu-item v-if="!item.children" :key="item.href + menuInfo.href">
          <router-link :to="menuInfo.href + item.href" class="flex items-center" style="display: flex;">
            <ion-icon :name="item.icon" class="mr-1" v-if="item.icon" />
            <span class="ml-2 mr-4">{{ item.title }}</span>
          </router-link>
        </a-menu-item>

        <sub-menu v-else :key="menuInfo.href + item.href" :menu-info="item" />
      </template>

    </a-sub-menu>
  `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};

export default {
  name: 'SideBar',
  components: {
    'sub-menu': SubMenu,
    // eslint-disable-next-line vue/no-unused-components
    // 'ion-icon': {},
  },
  computed: {
    menuItems() {
      // console.log(this.$store.state.menu.items);
      return this.$store.state.menu.items;
    },
  },
};
</script>

<style lang="scss">

</style>
