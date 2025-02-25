<script setup lang="ts">
  import { ref } from 'vue'; //v-model対応
  import { useTodoList } from '@/composables/useTodoList';

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
    /*
    const id = new Date().getTime();
    todoList.value.push({ id, task: todo.value });  //v-model変数から取得したvalueをtodoListにpushする
    // ローカルストレージに保存
    localStorage.todoList = JSON.stringify(todoList.value);
    todo.value = '';  //v-model変数初期化
    //editId = id;  //変更ボタン対応（変更対象のtodoのid）
    */
  }

  //削除処理:
  const deleteTodo = (id: number) => {  //削除ボタン押下時の処理
    isEdit.value = false;
    del(id);
    //const findTodo = todoList.value.find(todo => todo.id === id);
    //const idx = todoList.value.findIndex(todo => todo.id === id);yu
    //const { findTodo, idx } = useTodoList(id);
    /*
    if(findTodo){
      const delMsg = '「' + findTodo.task + '」を削除しますか？';
      if(!confirm(delMsg)) return;

      //splice関数でインデックスを元に対象オブジェクトを削除する
      //(splice(idx,1)…1:削除する要素の数を表す
      // この場合1なのでidxの位置から１つの要素が削除されます)
      todoList.value.splice(idx, 1);
      //上記todoList.valueを永続化する
      localStorage.todoList = JSON.stringify(todoList.value)
    */
  }

  //変更処理:
  //(変更ボタン押下時、todo編集欄内容を反映する)
  const editTodo = () => {  //変更ボタン押下時の処理
    if(!todo.value) return;
    edit(todo.value);
    isEdit.value = false;
    todo.value = '';
    // todoListからidに一致するtodoを取得する
    //const findTodo = todoList.value.find(todo => todo.id === editId);
    // todoListからidに一致するインデックスを取得する
    //const idx = todoList.value.findIndex(todo => todo.id === editId);
    //const { findTodo, idx } = useTodoList(editId);
    /*
    // taskを編集後のtodoで置き換える
    if(findTodo){
      //v-model変数の値todo.valueをfindTodoのtaskに設定する
      findTodo.task = todo.value;
      //splice関数でインデックスを元に対象オブジェクトを置き換える
      todoList.value.splice(idx, 1, findTodo);
      //todoList.valueの永続化
      localStorage.todoList = JSON.stringify(todoList.value);
      // 各種初期化
      // 修正前）todo.value = '';
      isEdit.value = false;
      editId = -1;
    */
  }

    //編集対象todo表示処理:
    //　編集ボタン押下時、該当todoを編集欄に表示する
    //　(todoList中の該当todoを入力欄に表示する)
    const showTodo = (id: number) => {
      todo.value = show(id);
      isEdit.value = true;
      editId = id;
      /*
    //TODOリストからIDに一致するtodoを取得する
    const findTodo = todoList.value.find((todo) => todo.id === id);
    //findTodoに該当todoが存在する場合のみ、
    //todo.valueに該当todoのtaskを表示し、かつ isEdit を true にする
    //（もしfindTodoが存在しない場合は''を設定する）
    findTodo ? (todo.value = findTodo.task, isEdit.value = true) : todo.value = '';
    editId = id;  //変更ボタン対応（変更対象のtodoのid）
    */
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
    <div class="todo_list" v-for="t in todoList" :key="t.id">
      <div class="todo" :class="{fin: t.checked}">
        <input type="checkbox" class="check" @change="changeCheck(t.id)":checked="t.checked" />
        <label>{{t.task}}</label>
      </div>
      <div class="btns">
        <button class="btn green" @click="showTodo(t.id)">編</button>
        <button class="btn pink" @click="deleteTodo(t.id)">削</button>
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
