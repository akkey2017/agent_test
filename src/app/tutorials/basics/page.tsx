import Link from "next/link";

export default function BasicsTutorial() {
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
            Next.jsの基礎
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Next.jsの基本概念とApp Routerについて学びます
          </p>
        </div>

        <section className="mb-12 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📚 学習内容
          </h2>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>✅ Next.jsとは何か</li>
            <li>✅ App Routerの基本</li>
            <li>✅ ファイルベースルーティング</li>
            <li>✅ レイアウトとページ</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            1. Next.jsとは？
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Next.jsは、Reactベースのフルスタックフレームワークです。以下の特徴があります：
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
              <li>サーバーサイドレンダリング（SSR）のサポート</li>
              <li>静的サイト生成（SSG）</li>
              <li>ファイルベースのルーティング</li>
              <li>APIルートの作成が簡単</li>
              <li>優れた開発体験とパフォーマンス</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            2. App Routerの基本
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Next.js 13以降では、App Routerという新しいルーティングシステムが導入されました。
              <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded">app</code>
              ディレクトリ内にファイルを配置することでルートを定義します。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-auto max-h-96 mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// app/page.tsx - ルートページ (/)
export default function Home() {
  return <h1>ホームページ</h1>;
}

// app/about/page.tsx - Aboutページ (/about)
export default function About() {
  return <h1>私たちについて</h1>;
}`}</code>
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>ポイント：</strong>
              各ディレクトリの<code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">page.tsx</code>
              ファイルがそのルートのページになります。
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            3. レイアウトの作成
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded">layout.tsx</code>
              ファイルを使用すると、複数のページで共有されるUIを定義できます。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-auto max-h-96 mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <nav>ナビゲーションバー</nav>
        <main>{children}</main>
        <footer>フッター</footer>
      </body>
    </html>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            🏋️ 実践演習
          </h2>
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
              チャレンジ：新しいページを作成してみよう
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
              <li><code className="px-1 py-0.5 bg-green-100 dark:bg-green-900 rounded">app/contact</code>ディレクトリを作成</li>
              <li>その中に<code className="px-1 py-0.5 bg-green-100 dark:bg-green-900 rounded">page.tsx</code>を作成</li>
              <li>簡単な問い合わせフォームのUIを実装</li>
              <li><code className="px-1 py-0.5 bg-green-100 dark:bg-green-900 rounded">http://localhost:3000/contact</code>で確認</li>
            </ol>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              ヒント：<code className="px-1 py-0.5 bg-green-100 dark:bg-green-900 rounded">export default function Contact()</code>
              の形式でコンポーネントを作成します。
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📝 まとめ
          </h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-sm">
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>✅ Next.jsはReactベースのフルスタックフレームワーク</li>
              <li>✅ App Routerではファイル構造がルーティングを定義</li>
              <li>✅ <code className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded">page.tsx</code>がページコンポーネント</li>
              <li>✅ <code className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded">layout.tsx</code>で共通レイアウトを定義</li>
            </ul>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-zinc-50"
          >
            ← ホームに戻る
          </Link>
          <Link
            href="/tutorials/components"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            次のレッスン：コンポーネント →
          </Link>
        </div>
      </main>
    </div>
  );
}
