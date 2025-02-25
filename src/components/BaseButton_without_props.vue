//本当はpropsを使ってBaseButton.vueにcolorを渡したかった！
//例：color="green"の様にpropsで渡したかった！
//
//でも、ここでは、
//BaseButton.vue でクラスを指定せず、
//MainTodo.vue 側で class="green main-btn" などと直接指定した。
//例：<BaseButton class="yellow main-btn" @click="editTodo" v-if="isEdit">変更</BaseButton>

<script setup lang="ts">
  const aaa = () => {};
</script>

<template>
  <button><slot /></button>
</template>

<style>
  .btn {
    padding: 8px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    background-color: #03a9f4;
    border-radius: 6px;
  }
  .yellow {
    background-color: #f1ee14 !important;
  }
  .red {
    background-color: #f81634 !important;
  }
  .pink {
    background-color: #d31289 !important;
  }
  .green {
    background-color: #3bf516 !important;
  }

</style>
