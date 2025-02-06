import React, { useState } from 'react';


// "Todo" 型の定義をコンポーネント外で行います
type Todo = {
  content: string; // プロパティ content は文字列型
  readonly id: number;
};


// Todo コンポーネントの定義
const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Todoの配列を保持するステート
  const [text, setText] = useState(''); // フォーム入力のためのステート
  const [nextId, setNextId] = useState(1);


  // todos ステートを更新する関数
  const handleSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;


    // 新しい Todo を作成
    const newTodo: Todo = {
      content: text, // text ステートの値を content プロパティへ
      id: nextId,
    };


    /**
     * 更新前の todos ステートを元に
     * スプレッド構文で展開した要素へ
     * newTodo を加えた新しい配列でステートを更新
     **/
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setNextId(nextId + 1);


    // フォームへの入力をクリアする
    setText('');
  };

  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      /**
       * 引数として渡された todo の id が一致する
       * 更新前の todos ステート内の
       * value(プロパティ)を引数 value (= e.target.value) に書き換える
       */
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.content = value;
        }
        return todo;
      });
  
  
      // todos ステートを更新
      return newTodos;
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // フォームのデフォルト動作を防ぐ
          handleSubmit(); // handleSubmit 関数を呼び出す
        }}
      >
        <input
          type="text"
          value={text} // フォームの入力値をステートにバインド
          onChange={(e) => setText(e.target.value)} // 入力値が変わった時にステートを更新
        />
        <input type="submit" content="追加" /> {/* ボタンをクリックしてもonSubmitをトリガーしない */}
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input 
                type="text" 
                value={todo.content}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
            </li>
            );
        })}
      </ul>
    </div>
  );
};


export default Todo;