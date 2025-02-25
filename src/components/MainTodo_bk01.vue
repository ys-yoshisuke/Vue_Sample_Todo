<script setup lang="ts">
  import { ref } from 'vue'; //v-model対応

  const todo = ref(''); //入力欄の入力文字列を格納する
  const isEdit = ref(false); //編集ボタン押下時（該当todoがある時）→true
  let editId = -1;  //変更ボタン対応（変更対象のtodoのid）

  const todoList = ref<{ id: number; task: string }[]>([]); //ローカルストレージに保存するtodoリスト
  const ls = localStorage.todoList; //初期値：ローカルストレージ

  todoList.value = ls ? JSON.parse(ls) : [];  //ls有ればparseし無ければ空配列

  //追加処理:
  const addTodo = () => { //ローカルストレージ対応
      const id = new Date().getTime();
      todoList.value.push({ id, task: todo.value });
      localStorage.todoList = JSON.stringify(todoList.value);
      todo.value = '';
      editId = id;  //変更ボタン対応（変更対象のtodoのid）
  }

  //変更処理:
  //(変更ボタン押下時、todo編集欄内容を反映する)
  const editTodo = () => {  //変更ボタン押下時の処理
    // todoListからidに一致するtodoを取得する
    const findTodo = todoList.value.find(todo => todo.id === editId);
    // todoListからidに一致するインデックスを取得する
    const idx = todoList.value.findIndex(todo => todo.id === editId);
    // taskを編集後のtodoで置き換える
    if(findTodo){
      findTodo.task = todo.value;
      // splice関数でインデックスを元に対象オブジェクトを置き換える
      todoList.value.splice(idx, 1, findTodo);
      // ローカルストレージに保存
      localStorage.todoList = JSON.stringify(todoList.value);
      // 各種初期化
      // 修正前）todo.value = '';
      isEdit.value = false;
      editId = -1;
    }
  };

  //削除処理:
  const deleteTodo = (id: number) => {  //削除ボタン押下時の処理
    isEdit.value = false;
    editId = -1;
    todo.value = '';

    const findTodo = todoList.value.find(todo => todo.id === id);
    const idx = todoList.value.findIndex(todo => todo.id === id);
    if(findTodo){
      const delMsg = '「' + findTodo.task + '」を削除しますか？';
      if(!confirm(delMsg)) return;

      todoList.value.splice(idx, 1);
      localStorage.todoList = JSON.stringify(todoList.value)
    }
  }

  //編集対象todo表示処理:
  //(編集ボタン押下時、該当todoを編集欄に表示する)
  const showTodo = (id: number) => {  //todoList中の該当todoを入力欄に表示する
    // TODOリストからIDに一致するtodoを取得する
    const findTodo = todoList.value.find(todo => todo.id === id);
    // 取得した要素からtaskを取り出し入力欄に表示する
    // 修正前）todo.value = findTodo?.task ?? '';
    // ↓
    // 修正後）findTodoに該当todoが存在する場合のみ、
    // todo.valueに該当todoのtaskを表示し、かつ isEdit を true にする
    // （もしfindTodoが存在しない場合は''を設定する）
    findTodo ? (todo.value = findTodo.task, isEdit.value = true) : todo.value = '';
    editId = id;  //変更ボタン対応（変更対象のtodoのid）
  }

</script>

<template>
  <div class="box_input">
    <input
      type="text"
      class="todo_input"
      v-model="todo"
      placeholder="+ TODOを入力" />
    <button class="btn" @click="editTodo" v-if="isEdit">変更</button>
    <button class="btn" @click="addTodo">追加</button>
  </div>
  <!-- todoリスト表示部 -->
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoList" :key="todo.id">
      <div class="todo">
        <input type="checkbox" class="check" />
        <label>{{todo.task}}</label>
      </div>
      <div class="btns">
        <button class="btn green" @click="showTodo(todo.id)">編</button>
        <button class="btn pink" @click="deleteTodo(todo.id)">削</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  .green{
    background-color: #00c853;
  }
  .pink{
    background-color: #ff4081;
  }
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
