"use client";

import { useState, useEffect } from "react";
import * as React from "react";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-tomorrow.css";
import * as Babel from "@babel/standalone";

interface ReactPlaygroundProps {
  initialCode: string;
  title?: string;
  height?: string;
}

export default function ReactPlayground({
  initialCode,
  title = "Reactプレイグラウンド",
  height = "300px",
}: ReactPlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [PreviewComponent, setPreviewComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setError(null);

    try {
      // Extract the component name
      const componentMatch = code.match(/export default function (\w+)/);
      if (!componentMatch) {
        throw new Error("export default function コンポーネントが見つかりません");
      }
      const componentName = componentMatch[1];

      // Remove export statement for transformation
      const codeToTransform = code.replace(/export default function/, "function");

      // Transform JSX to JavaScript using Babel
      const transformed = Babel.transform(codeToTransform, {
        presets: ["react"],
        filename: "component.jsx",
      });

      if (!transformed.code) {
        throw new Error("コードの変換に失敗しました");
      }

      // Create the component function with React in scope
      const wrappedCode = `
        "use strict";
        ${transformed.code}
        return ${componentName};
      `;

      // Create component constructor with React and hooks in scope
      const ComponentConstructor = new Function("React", "useState", "useEffect", wrappedCode);
      const Component = ComponentConstructor(React, useState, useEffect);

      setPreviewComponent(() => Component);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setPreviewComponent(null);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setPreviewComponent(null);
    setError(null);
  };

  // Auto-run on mount
  useEffect(() => {
    runCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? "実行中..." : "実行 ▶"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-0 divide-x divide-zinc-200 dark:divide-zinc-700">
        <div>
          <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              コード
            </span>
          </div>
          <div style={{ height, overflow: 'auto' }}>
            <CodeEditor
              value={code}
              onValueChange={setCode}
              highlight={(code) => highlight(code, languages.jsx, 'jsx')}
              padding={16}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 13,
                backgroundColor: '#1e1e1e',
                color: '#d4d4d4',
                minHeight: height,
              }}
              textareaClassName="focus:outline-none"
            />
          </div>
        </div>

        <div>
          <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              プレビュー
            </span>
          </div>
          <div className="p-4 bg-white dark:bg-zinc-800" style={{ minHeight: height }}>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded text-sm text-red-900 dark:text-red-100">
                <strong>エラー:</strong> {error}
              </div>
            )}
            {PreviewComponent && !error && (
              <div className="text-zinc-900 dark:text-zinc-50">
                <PreviewComponent />
              </div>
            )}
            {!PreviewComponent && !error && (
              <div className="text-zinc-500 text-sm">
                コードを実行すると、ここにプレビューが表示されます
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
