"use client";

import { useState, useEffect } from "react";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

interface CodePlaygroundProps {
  initialCode: string;
  title?: string;
  height?: string;
  language?: string;
}

export default function CodePlayground({
  initialCode,
  title = "コードプレイグラウンド",
  height = "400px",
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Reset output when code changes
  useEffect(() => {
    setOutput([]);
    setError(null);
  }, [code]);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    setError(null);

    // Create a sandbox for code execution
    const logs: string[] = [];
    const customConsole = {
      log: (...args: unknown[]) => {
        logs.push(args.map((arg) => String(arg)).join(" "));
      },
    };

    try {
      // Create a function that wraps the user code
      // This is a simple sandbox - for production use, consider iframe sandboxing
      const wrappedCode = `
        (function() {
          const console = arguments[0];
          ${code}
        })
      `;

      const func = eval(wrappedCode);
      func(customConsole);

      setOutput(logs);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
    setError(null);
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={resetCode}
            className="px-3 py-1 text-sm bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
          >
            リセット
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? "実行中..." : "実行 ▶"}
          </button>
        </div>
      </div>

      <div className="border-b border-zinc-200 dark:border-zinc-700" style={{ height, overflow: 'auto' }}>
        <CodeEditor
          value={code}
          onValueChange={setCode}
          highlight={(code) => highlight(code, languages.javascript, 'javascript')}
          padding={16}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            minHeight: height,
          }}
          textareaClassName="focus:outline-none"
        />
      </div>

      <div className="p-4 bg-zinc-900 dark:bg-black">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-zinc-400">出力:</span>
        </div>
        <div className="font-mono text-sm">
          {output.length === 0 && !error && (
            <div className="text-zinc-500">
              コードを実行すると、ここに結果が表示されます
            </div>
          )}
          {output.map((line, index) => (
            <div key={index} className="text-green-400">
              {line}
            </div>
          ))}
          {error && (
            <div className="text-red-400">
              エラー: {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
