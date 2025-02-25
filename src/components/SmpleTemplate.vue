<script setup lang="ts">
  defineProps<{
    isEdit: boolean;
  }>();
</script>

<template v-if="isEdit"> <--- ここで isEdit.value は不要。propsはsetup内でリアクティブ
  <p>1</p>
  <p>2</p>
</template>

<style scoped>
</style>
