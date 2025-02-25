<script setup lang="ts">
  import MainTodo from '@/components/MainTodo.vue';
  import TheFooter from '@/components/TheFooter.vue';
  import TheHeader from '@/components/TheHeader.vue';
  import SmplEventHandle from '@/components/SmplEventHandle.vue';
  import SmpleTemplate from '@/components/SmpleTemplate.vue';
  import BaseButton from '@/components/BaseButton.vue';

  // propsで渡すデータを定義
  const appTitle = "My TODO App";
</script>

<template>
  <div class="wrap">
    <TheHeader />
      <main class="main">
        <MainTodo :title="appTitle" />
      </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  padding: 0;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
}

.main {
  flex: 1;
  padding: 16px;
}
</style>
