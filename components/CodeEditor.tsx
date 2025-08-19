import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, placeholder, readOnly = false }) => {
  const baseClasses = "w-full h-full p-4 font-mono text-sm bg-slate-800 border rounded-md resize-none focus:outline-none transition duration-200";
  const stateClasses = readOnly 
    ? "text-slate-300 border-slate-700" 
    : "text-cyan-300 border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`${baseClasses} ${stateClasses}`}
      spellCheck="false"
    />
  );
};
