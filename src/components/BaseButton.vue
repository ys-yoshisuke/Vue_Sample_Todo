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
