'use client'

import React from 'react';
import { useTheme } from './ThemeContext';

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, title, subtitle, onClick }) => {
  const { theme } = useTheme();

  return (
    <button 
      className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
        theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 mb-2' })}
      <span className="font-semibold">{title}</span>
      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</span>
    </button>
  );
};

export default ActionButton;
