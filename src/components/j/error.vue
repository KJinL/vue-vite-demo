<script setup lang="ts">
const props = defineProps({
  errorMsg: String,
})
</script>

<template>
  <div class="j-error" v-show="props.errorMsg">
    {{ props.errorMsg }}
  </div>
</template>

<style lang="scss" scoped>
.j-error {
  @apply rounded-md bg-pink-500 text-white text-xs px-2 py-1 mt-2;
}
</style>
