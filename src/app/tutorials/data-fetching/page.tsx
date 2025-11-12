"use client";

import Link from "next/link";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function DataFetchingTutorial() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("データの取得に失敗しました");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
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
            データフェッチング
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Server ComponentsとClient Componentsでのデータ取得方法を学びます
          </p>
        </div>

        <section className="mb-12 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📚 学習内容
          </h2>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>✅ Server Componentsでのデータフェッチ</li>
            <li>✅ Client Componentsでのデータフェッチ</li>
            <li>✅ ローディング状態とエラー処理</li>
            <li>✅ fetch APIの使い方</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            1. Server Componentsでのデータフェッチ
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Server Componentsでは、コンポーネント内で直接async/awaitを使用できます。
              これにより、サーバー側でデータを取得し、完全にレンダリングされたHTMLをクライアントに送信できます。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// app/posts/page.tsx (Server Component)
async function getPosts() {
  const res = await fetch(&apos;https://api.example.com/posts&apos;, {
    cache: &apos;no-store&apos;, // 常に最新データを取得
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}`}</code>
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>メリット：</strong>
              JavaScriptバンドルサイズが小さく、SEOに有利です。
              また、データベースやAPIキーに直接アクセスできます。
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            2. Client Componentsでのデータフェッチ
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Client Componentsでは、useEffectとfetchを組み合わせてデータを取得します。
              ユーザーの操作に応じた動的なデータ取得に適しています。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`"use client";

import { useState, useEffect } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);
  
  if (loading) return <p>読み込み中...</p>;
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            3. 実践例：ユーザー一覧の取得
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              ボタンをクリックして、実際にAPIからデータを取得してみましょう。
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors mb-4"
            >
              {loading ? "読み込み中..." : "ユーザーを取得"}
            </button>

            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg">
                <p className="text-red-800 dark:text-red-200">エラー: {error}</p>
              </div>
            )}

            {users.length > 0 && (
              <div className="space-y-3">
                {users.slice(0, 5).map((user) => (
                  <div
                    key={user.id}
                    className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
                  >
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {user.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {user.email}
                    </p>
                  </div>
                ))}
                {users.length > 5 && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                    ...他 {users.length - 5} 件
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            4. キャッシュとリバリデーション
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Next.jsのfetchは拡張されており、キャッシュ制御が可能です。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
                cache: &apos;force-cache&apos;
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                デフォルト。データをキャッシュし、再利用します。
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
                cache: &apos;no-store&apos;
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                毎回新しいデータを取得します（動的レンダリング）。
              </p>
            </div>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// 60秒ごとに再検証
fetch(&apos;https://api.example.com/data&apos;, {
  next: { revalidate: 60 }
});

// キャッシュしない
fetch(&apos;https://api.example.com/data&apos;, {
  cache: &apos;no-store&apos;
});`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            5. エラーハンドリングとローディング
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              ユーザー体験を向上させるため、適切なローディング状態とエラー処理を実装しましょう。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error('データの取得に失敗しました');
    }
    const result = await response.json();
    setData(result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            🏋️ 実践演習
          </h2>
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
              チャレンジ：投稿一覧ページを作成しよう
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
              <li>JSONPlaceholderのpostsエンドポイントからデータを取得</li>
              <li>投稿のタイトルと本文を表示</li>
              <li>ローディングスピナーを追加</li>
              <li>エラーメッセージを適切に表示</li>
            </ol>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              API: https://jsonplaceholder.typicode.com/posts
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📝 まとめ
          </h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-sm">
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>✅ Server Componentsは async/await でデータ取得</li>
              <li>✅ Client Componentsは useEffect + fetch でデータ取得</li>
              <li>✅ loading/error 状態を適切に管理</li>
              <li>✅ Next.jsのfetchはキャッシュ制御が可能</li>
            </ul>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <Link
            href="/tutorials/state"
            className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-zinc-50"
          >
            ← 前のレッスン
          </Link>
          <Link
            href="/tutorials/api-routes"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            次のレッスン：APIルート →
          </Link>
        </div>
      </main>
    </div>
  );
}
