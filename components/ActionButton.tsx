
import React from 'react';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick, isLoading = false, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full flex items-center p-3 text-left bg-slate-800 hover:bg-slate-700 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      <div className="w-5 h-5 mr-3 text-slate-400 group-hover:text-cyan-400 transition-colors">
        {icon}
      </div>
      <span className="flex-1 text-slate-300 group-hover:text-white transition-colors">{label}</span>
      {isLoading && (
         <div className="w-5 h-5 border-2 border-slate-500 border-t-cyan-400 rounded-full animate-spin"></div>
      )}
    </button>
  );
};
