<script setup lang="ts">
  import MainTodo from '@/components/MainTodo.vue';
  import TheFooter from '@/components/TheFooter.vue';
  import TheHeader from '@/components/TheHeader.vue';
  import SmplEventHandle from '@/components/SmplEventHandle.vue';
  import SmpleTemplate from '@/components/SmpleTemplate.vue';
  import BaseButton from '@/components/BaseButton.vue';

  //（A)(B)親→子） propsで渡すデータを定義）
  const appTitle = "My TODO App !!";

  //(C)子→親) 受け取ったデータを表示するための変数：
  import { ref } from 'vue';
  const message = ref("まだ通知なし");

  //(C)子→親) 子コンポーネントからのイベントを受け取る関数：
  const handleMesssage = (msg: string) => {
    message.value = msg;  //(C)子から送られてきたメッセージを更新
  }
</script>

<template>
  <div class="wrap">
    <TheHeader />
      <main class="main">
        <!--(A)(B)親→子） :title  、　(C)子→親）　@send-message-->
        <MainTodo :title="appTitle" @send-message="handleMesssage" />
      </main>
    <TheFooter />
    <h2>親コンポーネント</h2>
    <p>子からのメッセージ：{{ message }}</p>
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
