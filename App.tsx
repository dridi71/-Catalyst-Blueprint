import React, { useState, useCallback, useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Sidebar } from './components/Sidebar';
import { CodeEditor } from './components/CodeEditor';
import { Header } from './components/Header';
import { getAIAssistanceStream } from './services/geminiService';
import { AIAssistAction } from './types';
import { DEFAULT_PYTHON_CODE, AI_ACTIONS } from './constants';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CopyButton } from './components/CopyButton';

const App: React.FC = () => {
  const [pythonCode, setPythonCode] = useState<string>(DEFAULT_PYTHON_CODE);
  const [aiOutput, setAiOutput] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<AIAssistAction | null>(null);

  const handleAction = useCallback(async (action: AIAssistAction) => {
    const actionConfig = AI_ACTIONS[action];
    if (actionConfig.requiresCode && !pythonCode.trim()) {
      setError('Please enter some code in the editor to perform this action.');
      return;
    }
    if (actionConfig.requiresPrompt && !prompt.trim()) {
      setError('Please enter a prompt to generate code.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAiOutput('');
    setActiveAction(action);

    try {
      // Simulate calling the backend proxy which returns a stream
      const stream = getAIAssistanceStream(action, pythonCode, prompt);

      for await (const chunk of stream) {
        setAiOutput((prev) => prev + chunk);
      }

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get AI assistance. ${errorMessage}`);
      setAiOutput(`## Error\n\n\`\`\`\n${errorMessage}\n\`\`\``);
    } finally {
      setIsLoading(false);
      setActiveAction(null);
    }
  }, [pythonCode, prompt]);
  
  const sanitizedHtml = useMemo(() => {
    const rawHtml = marked.parse(aiOutput, { breaks: true, gfm: true });
    return DOMPurify.sanitize(rawHtml);
  }, [aiOutput]);


  return (
    <div className="flex flex-col h-screen font-sans bg-slate-900 text-slate-300">
      <Header />
      <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
        <Sidebar onAction={handleAction} prompt={prompt} setPrompt={setPrompt} isLoading={isLoading} activeAction={activeAction} />
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col min-h-[50vh] md:min-h-0 relative">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-cyan-400">Active File Editor</h2>
                <span className="text-sm font-mono bg-slate-700 px-2 py-1 rounded text-slate-300">README.md</span>
            </div>
            <div className="relative flex-1">
              <CodeEditor
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
                placeholder="Enter your code here..."
              />
              <CopyButton textToCopy={pythonCode} />
            </div>
          </div>
          <div className="flex flex-col min-h-[50vh] md:min-h-0 relative">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-purple-400">AI Assistant Output</h2>
            </div>
            <div className="relative w-full h-full flex-1 p-4 font-mono text-sm bg-slate-800 border border-slate-700 rounded-md overflow-y-auto prose prose-invert prose-sm max-w-none prose-pre:bg-slate-900 prose-pre:p-3 prose-pre:rounded-md">
              {isLoading && !aiOutput && (
                <div className="absolute inset-0 bg-slate-800 bg-opacity-75 flex flex-col items-center justify-center z-10 rounded-md">
                   <LoadingSpinner />
                   <p className="mt-4 text-lg">AI is thinking...</p>
                   {activeAction && <p className="text-sm text-slate-400">{AI_ACTIONS[activeAction].label}</p>}
                </div>
              )}
              {aiOutput ? (
                <>
                  <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                  {!isLoading && <CopyButton textToCopy={aiOutput} />}
                </>
              ) : (
                !isLoading && <span className="text-slate-500">AI output will appear here...</span>
              )}
               {error && !isLoading && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
