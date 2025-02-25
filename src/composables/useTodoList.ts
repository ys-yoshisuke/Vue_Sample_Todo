import { ref, computed } from 'vue';

//外部から使えるようにexportする
export const useTodoList = () => {
  //todoList定義
  const todoList = ref<{ id: number; task: string; checked: boolean }[]>([]);
  //todoList初期化
  const ls = localStorage.todoList; //永続データ取得
  todoList.value = ls ? JSON.parse(ls) : [];  //永続データ有ればparseし無ければ空配列

  //todoListデータ取得(キー:id)
  const findById = (id: number) => {
    return todoList.value.find(todo => todo.id === id);
  }
  //todoListからidをもとにそのインデックスを取得
  const findIndexById = (id: number) => {
    return todoList.value.findIndex(todo => todo.id === id);
  }

  // add関数
  const add = (task: string) => {
    const id = new Date().getTime();
    todoList.value.push({ id: id, task: task, checked: false });
    localStorage.todoList = JSON.stringify(todoList.value);
  }

  const editId = ref(-1);

  // show関数
  const show = (id: number) => {
    const todo = findById(id);
    editId.value = id;
    return todo?.task;  //取得できればtask、できなければundefinedを返す
  }

  // edit関数
  const edit = (task: string) => {
    const todo = findById(editId.value);
    const idx = findIndexById(editId.value);
    if (todo) {
      todo.task = task;
      todoList.value.splice(idx, 1, todo);
      localStorage.todoList = JSON.stringify(todoList.value);
      editId.value = -1;
    }
  }

  // del関数
  const del = (id: number) => {
    const todo = findById(id);
    if (todo) {
      const delMsg = '「' + todo.task + '」を削除しますか？';
      if (!confirm(delMsg)) return;
      const idx = findIndexById(id);
      todoList.value.splice(idx, 1);
      localStorage.todoList = JSON.stringify(todoList.value);
    }
  }

  // チェックボックス
  const check = (id: number) => {
    const todo = findById(id);
    const idx = findIndexById(id);
    if (todo) {
      todo.checked = !todo.checked;
      todoList.value.splice(idx, 1, todo);
      localStorage.todoList = JSON.stringify(todoList.value);
    }
  }

  //完了数（算出プロパティ版）※処理が軽い
  const countFin = computed(() => {
    const finArr = todoList.value.filter(t => t.checked);
    return finArr.length;
  })

  //未完了数（関数版）
  const countFinMethod = () => {
    const finArr = todoList.value.filter(t => !t.checked);
    return finArr.length;
  }

  //修正前）
  //const findTodo = todoList.value.find(todo => todo.id === id); // todoListからidに一致するtodoを取得する
  //const idx = todoList.value.findIndex(todo => todo.id === id); // todoListからidに一致するインデックスを取得する

  //return { findTodo, idx }; // returnすることでfindTodoとidxを外部から使うことができる
  return { todoList, add, del, edit, show, check, countFin, countFinMethod };

  // ↓　※取り出したtodoListを（上記でせっかく取得しているので）返すだけにしてみる
  //return { add, show, edit, del };

}
