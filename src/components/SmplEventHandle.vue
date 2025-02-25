<script setup lang="ts">
import { ref } from 'vue'; //v-model対応

//v-model対応変数
const todo = ref(''); //v-model対応
//クリックイベント
const addTodo = () => { //@click対応
  alert("Clicked!");
  console.log(todo.value);
}
const inputText = ref('');
const eventMessage = ref('No event yet');
//各種イベントハンドラー
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  eventMessage.value = `Changed: ${target.value}`;
  console.log("Change event:", target.value);
};

const handleBlur = () => {
  eventMessage.value = "Input lost focus";
  console.log("Blur event");
};

const handleFocus = () => {
  eventMessage.value = "Input focused";
  console.log("Focus event");
};

const handleKeydown = (event: KeyboardEvent) => {
  eventMessage.value = `Key down: ${event.key}`;
  console.log("Keydown event:", event.key);
};

const handleKeyup = (event: KeyboardEvent) => {
  eventMessage.value = `Key up: ${event.key}`;
  console.log("Keyup event:", event.key);
};

const handleMouseover = () => {
  eventMessage.value = "Mouse is over the element";
  console.log("Mouseover event");
};
</script>

<template>
  <div class="box_input">
    <input
      type="text"
      class="todo_input"
      v-model="todo"
      placeholder="+ TODOを入力" />
    <button class="btn" @click="addTodo">追加</button>
  </div>

  <!-- イベントテスト用 -->
  <div class="event-box">
    <label>Change Event:</label>
    <input type="text" v-model="inputText" @change="handleChange" />

    <label>Blur Event:</label>
    <input type="text" @blur="handleBlur" />

    <label>Focus Event:</label>
    <input type="text" @focus="handleFocus" />

    <label>Keydown Event:</label>
    <input type="text" @keydown="handleKeydown" />

    <label>Keyup Event:</label>
    <input type="text" @keyup="handleKeyup" />

    <label>Mouseover Event:</label>
    <div class="hover-box" @mouseover="handleMouseover">Hover over me</div>

    <!-- イベントの結果表示 -->
    <p>Event Result: {{ eventMessage }}</p>
  </div>

</template>

<style scoped>
.todo_input {
  width: 200%;
  padding: 6px 8px;
  margin: 8px 0;
  font-size: 18px;
  border: 1px solid #aaa;
  border-radius: 6px;
}
.btn {
  position: relative;
  padding: 6px 8px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  background-color: #03a9f4;
  border: 1px solid #eee;
  border-radius: 6px;
}
.btn:active {
  top: 1px;
}
</style>
