<script setup lang="ts">
  //追加）vue-router対応
  import { useRouter } from 'vue-router';

  //追加）プログラムからのページ遷移に対応
  import TheFooter from '@/components/TheFooter.vue';
  import TheHeader from '@/components/TheHeader.vue';
  import SmplEventHandle from '@/components/SmplEventHandle.vue';
  import SmpleTemplate from '@/components/SmpleTemplate.vue';
  import BaseButton from '@/components/BaseButton.vue';

  //追加）プログラムからのページ遷移に対応
  const router = useRouter();
  const goBlog = () => {
    router.push('/blog');
  }

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
      <nav>
        <router-link to="/mainTodo">MainTodo</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/blog">Blog</router-link> |
        <span @click="goBlog">Blog</span> |
        <router-link to="/blog/1">Blog1</router-link> |
        <router-link to="/blog/2">Blog2</router-link>
      </nav>
      <main class="main">
        <!--(A)(B)親→子） :title  、　(C)子→親）　@send-message-->
        <!--
        <MainTodo :title="appTitle" @send-message="handleMesssage" />
        -->
        //View-Router対応
        <router-view />
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
