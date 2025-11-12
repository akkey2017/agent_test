"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function StateTutorial() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addTodo = () => {
    if (text.trim()) {
      setTodos([...todos, text]);
      setText("");
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
            ← ホームに戻る
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            中級
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-4 text-zinc-900 dark:text-zinc-50">
            状態管理とフック
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            React Hooksを使った状態管理とライフサイクル処理を学びます
          </p>
        </div>

        <section className="mb-12 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📚 学習内容
          </h2>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>✅ useStateフック</li>
            <li>✅ useEffectフック</li>
            <li>✅ 配列とオブジェクトの状態管理</li>
            <li>✅ 副作用とクリーンアップ</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            1. useStateフック
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded">useState</code>
              は、コンポーネントに状態を追加するためのフックです。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`import { useState } from "react";

function Counter() {
  // [現在の値, 更新関数] = useState(初期値)
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        増やす
      </button>
    </div>
  );
}`}</code>
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>重要：</strong>
              状態を直接変更せず、必ずセッター関数を使用してください。
              これによりReactが変更を検知し、再レンダリングを実行します。
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            2. useEffectフック
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded">useEffect</code>
              は、副作用（データフェッチ、購読、タイマーなど）を処理します。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    // 副作用の処理
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    // クリーンアップ関数
    return () => {
      clearInterval(timer);
    };
  }, []); // 依存配列が空 = マウント時のみ実行
  
  return <p>{time.toLocaleTimeString()}</p>;
}`}</code>
            </pre>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
              ライブ時計（useEffectの例）
            </h3>
            <div className="text-4xl font-mono text-center p-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-zinc-900 dark:text-zinc-50">
              {time.toLocaleTimeString("ja-JP")}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            3. 配列の状態管理
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              配列を状態として管理する場合は、イミュータブル（不変）な操作を行います。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// ❌ 間違い：配列を直接変更
todos.push(newTodo);
setTodos(todos);

// ✅ 正しい：新しい配列を作成
setTodos([...todos, newTodo]);

// アイテムの削除
setTodos(todos.filter((_, i) => i !== indexToRemove));

// アイテムの更新
setTodos(todos.map((todo, i) => 
  i === indexToUpdate ? updatedTodo : todo
));`}</code>
            </pre>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
              Todoリスト（配列の状態管理の例）
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                placeholder="新しいTodoを入力..."
                className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
              />
              <button
                onClick={addTodo}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                追加
              </button>
            </div>
            <ul className="space-y-2">
              {todos.length === 0 ? (
                <li className="text-zinc-500 dark:text-zinc-400 text-center py-4">
                  Todoがありません
                </li>
              ) : (
                todos.map((todo, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
                  >
                    <span className="text-zinc-900 dark:text-zinc-50">{todo}</span>
                    <button
                      onClick={() => removeTodo(index)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      削除
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            4. useEffectの依存配列
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              依存配列によって、useEffectの実行タイミングを制御できます。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <code className="text-sm text-blue-600 dark:text-blue-400">[]</code>
              <p className="text-sm mt-2 text-zinc-600 dark:text-zinc-400">
                マウント時のみ実行
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <code className="text-sm text-blue-600 dark:text-blue-400">[value]</code>
              <p className="text-sm mt-2 text-zinc-600 dark:text-zinc-400">
                valueが変更されたら実行
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <code className="text-sm text-blue-600 dark:text-blue-400">なし</code>
              <p className="text-sm mt-2 text-zinc-600 dark:text-zinc-400">
                毎レンダリング時に実行
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            🏋️ 実践演習
          </h2>
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
              チャレンジ：タイマーアプリを作成しよう
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
              <li>秒数をカウントダウンするタイマーを実装</li>
              <li>開始、停止、リセットボタンを追加</li>
              <li>useStateで秒数と実行状態を管理</li>
              <li>useEffectでカウントダウンロジックを実装</li>
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📝 まとめ
          </h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-sm">
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>✅ useStateでコンポーネントの状態を管理</li>
              <li>✅ useEffectで副作用とライフサイクルを処理</li>
              <li>✅ 配列やオブジェクトはイミュータブルに更新</li>
              <li>✅ 依存配列でuseEffectの実行タイミングを制御</li>
            </ul>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <Link
            href="/tutorials/components"
            className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-zinc-50"
          >
            ← 前のレッスン
          </Link>
          <Link
            href="/tutorials/data-fetching"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            次のレッスン：データフェッチング →
          </Link>
        </div>
      </main>
    </div>
  );
}
