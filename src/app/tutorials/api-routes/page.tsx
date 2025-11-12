import Link from "next/link";

export default function APIRoutesTutorial() {
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
            APIルートの作成
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Next.jsでAPIエンドポイントを作成し、フルスタックアプリを構築します
          </p>
        </div>

        <section className="mb-12 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📚 学習内容
          </h2>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>✅ Route Handlersの基本</li>
            <li>✅ GET/POST/PUT/DELETEリクエストの処理</li>
            <li>✅ リクエストとレスポンスの扱い方</li>
            <li>✅ APIルートのベストプラクティス</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            1. Route Handlersとは？
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Route Handlersを使用すると、Web Request/Response APIを使ってカスタムリクエストハンドラを作成できます。
              <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded">app/api</code>
              ディレクトリに配置します。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-auto max-h-96 mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// app/api/hello/route.ts
export async function GET() {
  return Response.json({ 
    message: 'Hello from Next.js!' 
  });
}

// アクセス: /api/hello`}</code>
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>ポイント：</strong>
              ファイル名は必ず<code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">route.ts</code>
              または<code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">route.js</code>
              にする必要があります。
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            2. HTTPメソッドの処理
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              各HTTPメソッドに対応する関数をエクスポートすることで、異なるリクエストタイプを処理できます。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-auto max-h-96 mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// app/api/users/route.ts
export async function GET(request: Request) {
  // ユーザー一覧を取得
  const users = [
    { id: 1, name: '太郎' },
    { id: 2, name: '花子' }
  ];
  return Response.json(users);
}

export async function POST(request: Request) {
  // 新しいユーザーを作成
  const body = await request.json();
  const newUser = {
    id: Date.now(),
    name: body.name
  };
  return Response.json(newUser, { status: 201 });
}

export async function PUT(request: Request) {
  // ユーザー情報を更新
  const body = await request.json();
  return Response.json({ 
    message: 'Updated',
    user: body 
  });
}

export async function DELETE(request: Request) {
  // ユーザーを削除
  return Response.json({ 
    message: 'Deleted' 
  });
}`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            3. リクエストの処理
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              クエリパラメータ、リクエストボディ、ヘッダーなど、様々なリクエストデータにアクセスできます。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-auto max-h-96 mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// app/api/search/route.ts
export async function GET(request: Request) {
  // URLからクエリパラメータを取得
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  // ヘッダーを取得
  const userAgent = request.headers.get('user-agent');
  
  return Response.json({
    query,
    userAgent,
    results: [\`\${query}の検索結果\`]
  });
}

// アクセス: /api/search?q=Next.js`}</code>
            </pre>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-auto max-h-96 mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// app/api/posts/route.ts
export async function POST(request: Request) {
  try {
    // JSONボディを取得
    const body = await request.json();
    const { title, content } = body;
    
    // バリデーション
    if (!title || !content) {
      return Response.json(
        { error: 'タイトルと内容は必須です' },
        { status: 400 }
      );
    }
    
    // データ処理...
    return Response.json({ 
      success: true,
      post: { title, content }
    });
  } catch (error) {
    return Response.json(
      { error: '無効なリクエスト' },
      { status: 400 }
    );
  }
}`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            4. 動的ルートパラメータ
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              ページと同様に、APIルートでも動的セグメントを使用できます。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-auto max-h-96 mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  
  // ユーザーIDに基づいてデータを取得
  const user = {
    id: userId,
    name: 'サンプルユーザー'
  };
  
  return Response.json(user);
}

// アクセス: /api/users/123`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            5. レスポンスのカスタマイズ
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              ステータスコード、ヘッダー、Cookieなどをカスタマイズできます。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-auto max-h-96 mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`export async function GET() {
  return Response.json(
    { message: 'Success' },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    }
  );
}

// CORSヘッダーを設定
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            6. エラーハンドリング
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              適切なエラーハンドリングで、より堅牢なAPIを構築しましょう。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-auto max-h-96 mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // データベース操作など...
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    
    return Response.json(
      { 
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    );
  }
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
              チャレンジ：シンプルなTodo APIを作成しよう
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
              <li><code className="px-1 py-0.5 bg-green-100 dark:bg-green-900 rounded">app/api/todos/route.ts</code>を作成</li>
              <li>GET: Todo一覧を返す（配列を使用）</li>
              <li>POST: 新しいTodoを追加</li>
              <li>適切なステータスコードとエラーハンドリングを実装</li>
              <li>フロントエンドから実際に呼び出して動作確認</li>
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📝 まとめ
          </h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-sm">
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>✅ Route Handlersで簡単にAPIを作成</li>
              <li>✅ GET/POST/PUT/DELETEなど各HTTPメソッドに対応</li>
              <li>✅ リクエストパラメータ、ボディ、ヘッダーにアクセス可能</li>
              <li>✅ 適切なエラーハンドリングとステータスコードを設定</li>
            </ul>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <Link
            href="/tutorials/data-fetching"
            className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-zinc-50"
          >
            ← 前のレッスン
          </Link>
          <Link
            href="/tutorials/forms"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            次のレッスン：フォーム →
          </Link>
        </div>
      </main>
    </div>
  );
}
