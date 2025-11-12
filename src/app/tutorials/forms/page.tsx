"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";

export default function FormsTutorial() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "名前は必須です";
    }

    if (!email.trim()) {
      newErrors.email = "メールアドレスは必須です";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    if (!message.trim()) {
      newErrors.message = "メッセージは必須です";
    } else if (message.length < 10) {
      newErrors.message = "メッセージは10文字以上で入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setMessage("");
      }, 3000);
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
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
            上級
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-4 text-zinc-900 dark:text-zinc-50">
            フォームとバリデーション
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            フォーム処理とバリデーションの実装方法を学びます
          </p>
        </div>

        <section className="mb-12 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📚 学習内容
          </h2>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>✅ 制御されたコンポーネント</li>
            <li>✅ フォームのバリデーション</li>
            <li>✅ フォーム送信の処理</li>
            <li>✅ エラーメッセージの表示</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            1. 制御されたコンポーネント
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Reactでは、フォームの入力値をstateで管理する「制御されたコンポーネント」パターンを使用します。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
      />
    </form>
  );
}`}</code>
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>ポイント：</strong>
              valueとonChangeの両方を設定することで、Reactが入力値を完全に制御します。
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            2. フォームのバリデーション
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              ユーザーの入力を検証し、適切なフィードバックを提供しましょう。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`const validateForm = () => {
  const errors: Record<string, string> = {};
  
  // 必須チェック
  if (!name.trim()) {
    errors.name = "名前は必須です";
  }
  
  // メールアドレスの形式チェック
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!email.trim()) {
    errors.email = "メールアドレスは必須です";
  } else if (!emailRegex.test(email)) {
    errors.email = "有効なメールアドレスを入力してください";
  }
  
  // 文字数チェック
  if (message.length < 10) {
    errors.message = "メッセージは10文字以上で入力してください";
  }
  
  setErrors(errors);
  return Object.keys(errors).length === 0;
};`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            3. フォーム送信の処理
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              onSubmitイベントでフォームの送信を処理します。
              デフォルトの動作を防ぐため、preventDefault()を呼び出します。
            </p>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-zinc-100">
              <code>{`const handleSubmit = (e: FormEvent) => {
  e.preventDefault(); // ページのリロードを防ぐ
  
  if (validateForm()) {
    // バリデーション成功
    console.log({ name, email, message });
    
    // APIにデータを送信
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });
    
    // フォームをリセット
    setName("");
    setEmail("");
    setMessage("");
  }
};`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            4. 実践例：お問い合わせフォーム
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              実際に動作するフォームです。バリデーションを試してみてください。
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  ✓ フォームが送信されました！
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-50">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 ${
                    errors.name
                      ? "border-red-500 dark:border-red-500"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}
                  placeholder="山田 太郎"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-50">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 ${
                    errors.email
                      ? "border-red-500 dark:border-red-500"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-50">
                  メッセージ <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 ${
                    errors.message
                      ? "border-red-500 dark:border-red-500"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}
                  placeholder="お問い合わせ内容を入力してください（10文字以上）"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {message.length} / 10文字以上
                </p>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                送信する
              </button>
            </form>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            5. よくあるバリデーションパターン
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-50">必須チェック</h3>
              <code className="text-sm text-blue-600 dark:text-blue-400">
                if (!value.trim()) &#123; ... &#125;
              </code>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-50">メール形式</h3>
              <code className="text-sm text-blue-600 dark:text-blue-400">
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
              </code>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-50">文字数制限</h3>
              <code className="text-sm text-blue-600 dark:text-blue-400">
                value.length &gt;= minLength && value.length &lt;= maxLength
              </code>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-50">数値チェック</h3>
              <code className="text-sm text-blue-600 dark:text-blue-400">
                !isNaN(Number(value))
              </code>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            🏋️ 実践演習
          </h2>
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
              チャレンジ：ユーザー登録フォームを作成しよう
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
              <li>ユーザー名、メールアドレス、パスワード、パスワード確認の入力欄</li>
              <li>各フィールドのバリデーション（必須、形式、長さなど）</li>
              <li>パスワードと確認パスワードの一致チェック</li>
              <li>エラーメッセージの表示</li>
              <li>送信成功時のメッセージ表示</li>
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
            📝 まとめ
          </h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-sm">
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>✅ 制御されたコンポーネントでフォーム入力を管理</li>
              <li>✅ バリデーション関数で入力値を検証</li>
              <li>✅ onSubmitでフォーム送信を処理</li>
              <li>✅ エラーメッセージを適切に表示してUXを向上</li>
            </ul>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <Link
            href="/tutorials/api-routes"
            className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-zinc-50"
          >
            ← 前のレッスン
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
          >
            コース完了！ホームへ →
          </Link>
        </div>
      </main>
    </div>
  );
}
