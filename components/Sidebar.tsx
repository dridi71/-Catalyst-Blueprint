
import React, { useState } from 'react';
import { AIAssistAction } from '../types';
import { AI_ACTIONS } from '../constants';
import { ActionButton } from './ActionButton';
import { BackendStatus } from './BackendStatus';
import { RoadmapIcon } from './icons/RoadmapIcon';
import { Roadmap } from './Roadmap';

interface SidebarProps {
  onAction: (action: AIAssistAction) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  activeAction: AIAssistAction | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAction, prompt, setPrompt, isLoading, activeAction }) => {
  const [isRoadmapVisible, setIsRoadmapVisible] = useState(false);

  return (
    <aside className="w-full md:w-72 bg-slate-950 p-4 flex flex-col border-b md:border-b-0 md:border-r border-slate-700 shadow-2xl md:flex-shrink-0">
      <div className="flex-1 md:overflow-y-auto pr-2 -mr-2">
        <h2 className="text-lg font-semibold mb-4 text-slate-200">AI Toolkit</h2>
        <div className="space-y-2">
          {Object.values(AIAssistAction).map((action) => {
            const config = AI_ACTIONS[action];
            return (
              <ActionButton
                key={action}
                icon={config.icon}
                label={config.label}
                onClick={() => onAction(action)}
                isLoading={isLoading && activeAction === action}
                disabled={isLoading && activeAction !== action}
              />
            );
          })}
        </div>
        <div className="mt-6">
          <label htmlFor="prompt-input" className="block text-md font-medium text-slate-300 mb-2">
            Code Generation Prompt
          </label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Create a Flask API with a /hello endpoint'"
            rows={4}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-slate-200 transition duration-200 disabled:opacity-50"
            disabled={isLoading}
          />
        </div>
        <div className="mt-6 pt-6 border-t border-slate-700">
            <BackendStatus />
        </div>
        <div className="mt-6 pt-6 border-t border-slate-700">
            <button
                onClick={() => setIsRoadmapVisible(!isRoadmapVisible)}
                className="w-full flex items-center justify-between p-2 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                aria-expanded={isRoadmapVisible}
                aria-controls="roadmap-content"
            >
                <div className="flex items-center">
                    <RoadmapIcon className="w-5 h-5 mr-2 text-slate-400" />
                    <h3 className="font-semibold text-slate-300">Senior Dev Roadmap</h3>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 text-slate-400 transition-transform transform ${isRoadmapVisible ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isRoadmapVisible && <Roadmap />}
        </div>
      </div>
       <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-500 text-center flex-shrink-0">
        <p>Powered by Google Gemini</p>
      </div>
    </aside>
  );
};
