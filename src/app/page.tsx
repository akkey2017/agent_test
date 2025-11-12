import Image from "next/image";
import Link from "next/link";

const tutorials = [
  {
    id: 1,
    title: "Next.jsの基礎",
    description: "App Routerの基本、ルーティング、レイアウトについて学びます",
    level: "初級",
    duration: "15分",
    path: "/tutorials/basics"
  },
  {
    id: 2,
    title: "コンポーネントとスタイリング",
    description: "Reactコンポーネントの作成とTailwind CSSでのスタイリングを学びます",
    level: "初級",
    duration: "20分",
    path: "/tutorials/components"
  },
  {
    id: 3,
    title: "状態管理とフック",
    description: "useStateやuseEffectなどのReact Hooksの使い方を実践的に学びます",
    level: "中級",
    duration: "25分",
    path: "/tutorials/state"
  },
  {
    id: 4,
    title: "データフェッチング",
    description: "Server ComponentsとClient Componentsでのデータ取得方法を学びます",
    level: "中級",
    duration: "30分",
    path: "/tutorials/data-fetching"
  },
  {
    id: 5,
    title: "APIルートの作成",
    description: "Next.jsでAPIエンドポイントを作成し、フルスタックアプリを構築します",
    level: "中級",
    duration: "25分",
    path: "/tutorials/api-routes"
  },
  {
    id: 6,
    title: "フォームとバリデーション",
    description: "Server Actionsを使用したフォーム処理とバリデーションを実装します",
    level: "上級",
    duration: "35分",
    path: "/tutorials/forms"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-black">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={120}
              height={24}
              priority
            />
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              ハンズオン学習
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              Next.jsを手を動かして学ぼう
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              実践的なチュートリアルで、Next.jsの基礎から応用まで段階的に学習できます。
              <br />
              各レッスンには実際のコード例と演習が含まれています。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {tutorials.map((tutorial) => (
              <Link
                key={tutorial.id}
                href={tutorial.path}
                className="block p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                    {tutorial.title}
                  </h3>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    {tutorial.level}
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {tutorial.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
                  <span className="flex items-center gap-1">
                    ⏱️ {tutorial.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    📚 レッスン {tutorial.id}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900">
            <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
              💡 学習のヒント
            </h3>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>• 各チュートリアルは順番に進めることをお勧めします</li>
              <li>• コード例は実際に試しながら学習してください</li>
              <li>• わからないことがあれば、公式ドキュメントも参照しましょう</li>
              <li>• 自分のペースで学習を進めてください</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-zinc-600 dark:text-zinc-400">
          <p>Next.js ハンズオン学習サイト - 実践で学ぶモダンWeb開発</p>
        </div>
      </footer>
    </div>
  );
}
