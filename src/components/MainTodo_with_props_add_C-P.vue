<script setup lang="ts">
  import { ref } from 'vue'; //v-model対応
  import { useTodoList } from '@/composables/useTodoList';
  import BaseButton from '@/components/BaseButton.vue';
  import { defineProps } from 'vue';  // propsで必要なdefinePropsを追加

  // propsを定義して受け取る
  const props = defineProps<{ title: string }>();

  //入力欄文字列
  const todo = ref<string | undefined>();
  //編集中フラグ
  const isEdit = ref(false); //false: 編集ボタン未押下時、true: 編集ボタン押下時
  //変更対象id
  let editId = -1;
  //分離ロジック参照
  const { todoList, add, del, edit, show, check, countFin, countFinMethod} = useTodoList();

  //チェックボックス
  const changeCheck = (id: number) => {
    check(id);
  }

  //追加処理:
  const addTodo = () => {
    if(!todo.value) return;
    add(todo.value);
    todo.value = '';
  }

  //削除処理:
  const deleteTodo = (id: number) => {
    isEdit.value = false;
    del(id);
  }

  //変更処理:
  //(変更ボタン押下時、todo編集欄内容を反映する)
  const editTodo = () => {
    if(!todo.value) return;
    edit(todo.value);
    isEdit.value = false;
    todo.value = '';
  }

  //編集対象todo表示処理:
  //　編集ボタン押下時、該当todoを編集欄に表示する
  //　(todoList中の該当todoを入力欄に表示する)
  const showTodo = (id: number) => {
    todo.value = show(id);
    isEdit.value = true;
    editId = id;
  }

</script>

<template>
  <!-- propsで受け取ったタイトルを表示 -->
  <H2>{{ props.title }}</H2>

  <!-- todo入力部 -->
  <div class="box_input">
    <input
      type="text"
      class="todo_input"
      v-model="todo"
      placeholder="+ TODOを入力" />
    <BaseButton class="yellow main-btn" @click="editTodo" v-if="isEdit">変更</BaseButton>
    <button class="green main-btn" @click="addTodo">追加</button>

  </div>
  <!-- todoリスト表示部 -->
  <div class="box_list">
    <div class="todo_list" v-for="t in todoList" :key="t.id">
      <div class="todo" :class="{fin: t.checked}">
        <input type="checkbox" class="check" @change="changeCheck(t.id)":checked="t.checked" />
        <label>{{t.task}}</label>
      </div>
      <div class="btns">
        <button class="pink main-btn" @click="showTodo(t.id)">編</button>
        <button class="red main-btn" @click="deleteTodo(t.id)">削</button>
      </div>
    </div>
  </div>
  <!--完了未完了統計表示部 -->
  <div class="finCount">
    <span>完了：{{ countFin }}、</span>
    <span>未完了：{{ countFinMethod() }}</span>
  </div>
</template>

<style scoped>
  .finCount {
    margin-top: 8px;
    font-size: 0.8em;
  }
  .fin {
    color: #777;
    text-decoration: line-through;
    background-color: #ddd;
  }
  .box_list{
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 20px;
  }
  .todo_list{
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .todo{
    width: 250px;
    padding: 6px 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .check{
    margin-right: 12px;
    transform: scale(1.6);
  }
  .btns{
    display: flex;
    gap: 4px;
  }
  .todo_input {
    width: 200%;
    padding: 6px 8px;
    margin: 8px 0;
    font-size: 18px;
    border: 1px solid #aaa;
    border-radius: 6px;
  }
  .main-btn {
    position: relative;
    padding: 6px 8px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    border: 1px solid #eee;
    background-color: rgb(107, 107, 180);
    border-radius: 6px;
  }
</style>
