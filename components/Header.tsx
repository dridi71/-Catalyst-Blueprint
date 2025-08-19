
import React from 'react';
import { PythonIcon } from './icons/PythonIcon';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4 bg-slate-950 border-b border-slate-700 shadow-lg">
      <PythonIcon className="w-8 h-8 text-cyan-400 mr-3" />
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-100">Catalyst Blueprint</h1>
        <p className="text-sm text-slate-400">A Full-Stack Project Blueprint</p>
      </div>
    </header>
  );
};
