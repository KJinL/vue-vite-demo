<script setup lang="ts">
import Menu from '@/composables/menu'
const menuService =  Menu.getInstance()
</script>

<template>
  <div class="hidden md:block p-3 border-t border-b bg-gray-50 shadow-sm" v-show="menuService.history.value.length">
    <div class="grid grid-flow-col gap-3 justify-start">
      <div
          v-for="item of menuService.history.value"
          class="border hover:bg-violet-600 hover:text-white duration-300 bg-white rounded-sm shadow-sm py-2 px-3 text-sm text-gray-600 flex justify-between items-center cursor-pointer"
          :class="{ 'text-active': $route.name == item.route }">
        <router-link :to="{ name: item.route }">{{ item.title }}</router-link>
        <icon-close-one
            theme="outline"
            size="18"
            class="ml-2"
            :class="{ 'text-white': $route.name == item.route }"
            @click="menuService.removeHistoryMenu(item)"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-active {
  @apply bg-violet-600 text-white;
}
</style>
