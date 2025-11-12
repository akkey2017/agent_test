"use client";

import Link from "next/link";
import { useState } from "react";
import ReactPlayground from "@/components/ReactPlayground";

export default function ComponentsTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);

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
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            初級
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-4 text-zinc-900 dark:text-zinc-50">
            コンポーネントとスタイリング
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Reactコンポーネントの作成とTailwind CSSでのスタイリングを学びます
          </p>
        </div>

        <section className="mb-12 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📚 学習内容
          </h2>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>✅ Server ComponentsとClient Components</li>
            <li>✅ 再利用可能なコンポーネントの作成</li>
            <li>✅ Tailwind CSSの基本</li>
            <li>✅ インタラクティブなUIの実装</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            1. Server ComponentsとClient Components
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Next.js 13以降では、デフォルトでServer Componentsが使用されます。
              インタラクティブな機能が必要な場合は、Client Componentsを使用します。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">
                Server Components
              </h3>
              <ul className="text-sm space-y-1 text-zinc-600 dark:text-zinc-400">
                <li>✓ サーバー上で実行</li>
                <li>✓ JavaScriptバンドルサイズが小さい</li>
                <li>✓ データベースに直接アクセス可能</li>
                <li>✓ デフォルトの動作</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Client Components
              </h3>
              <ul className="text-sm space-y-1 text-zinc-600 dark:text-zinc-400">
                <li>✓ ブラウザで実行</li>
                <li>✓ useState, useEffectが使える</li>
                <li>✓ イベントハンドラが使える</li>
                <li>✓ &quot;use client&quot;が必要</li>
              </ul>
            </div>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// Client Component（インタラクティブ）
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      カウント: {count}
    </button>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            2. 再利用可能なコンポーネント
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              コンポーネントを小さく分割することで、再利用性と保守性が向上します。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// components/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variantStyles = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300';
  
  return (
    <button className={\`\${baseStyles} \${variantStyles}\`} onClick={onClick}>
      {children}
    </button>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            3. Tailwind CSSの基本
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Tailwind CSSは、ユーティリティファーストのCSSフレームワークです。
              クラス名を組み合わせてスタイルを適用します。
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-50">レイアウト</h3>
              <code className="text-sm text-blue-600 dark:text-blue-400">
                flex, grid, container, mx-auto, px-4
              </code>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-50">スペーシング</h3>
              <code className="text-sm text-blue-600 dark:text-blue-400">
                p-4, m-2, gap-6, space-y-4
              </code>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-50">カラー</h3>
              <code className="text-sm text-blue-600 dark:text-blue-400">
                bg-blue-600, text-white, border-zinc-200
              </code>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            4. インタラクティブな例
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              実際に動くコンポーネントの例です。ボタンをクリックして動作を確認してください。
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 mb-4">
            <h3 className="font-semibold mb-4 text-zinc-900 dark:text-zinc-50">カウンター</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCount(count - 1)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                -
              </button>
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {count}
              </span>
              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                +
              </button>
              <button
                onClick={() => setCount(0)}
                className="px-4 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-700 transition-colors"
              >
                リセット
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold mb-4 text-zinc-900 dark:text-zinc-50">トグル</h3>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
            >
              {isOpen ? "閉じる" : "開く"}
            </button>
            {isOpen && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg">
                <p className="text-zinc-700 dark:text-zinc-300">
                  これは条件付きレンダリングの例です。
                  ボタンをクリックすると、このメッセージが表示/非表示になります。
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <ReactPlayground
              title="試してみよう：自分だけのコンポーネントを作ろう"
              height="350px"
              initialCode={`export default function MyComponent() {
  const [message, setMessage] = useState("こんにちは！");
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="p-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        {isVisible ? "非表示" : "表示"}
      </button>
      
      {isVisible && (
        <div className="p-4 bg-blue-50 rounded">
          <p className="mb-2">{message}</p>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      )}
    </div>
  );
}`}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            🏋️ 実践演習
          </h2>
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
              チャレンジ：カードコンポーネントを作成しよう
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
              <li>タイトル、説明、画像を表示するCardコンポーネントを作成</li>
              <li>Tailwind CSSでスタイリング</li>
              <li>ホバー時にシャドウが変わるようにする</li>
              <li>複数のカードを並べて表示</li>
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📝 まとめ
          </h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-sm">
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>✅ Server Componentsはデフォルト、Client Componentsはインタラクティブ</li>
              <li>✅ 小さく再利用可能なコンポーネントを作成する</li>
              <li>✅ Tailwind CSSでユーティリティクラスを組み合わせる</li>
              <li>✅ useStateでローカル状態を管理する</li>
            </ul>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <Link
            href="/tutorials/basics"
            className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-zinc-50"
          >
            ← 前のレッスン
          </Link>
          <Link
            href="/tutorials/state"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            次のレッスン：状態管理 →
          </Link>
        </div>
      </main>
    </div>
  );
}
