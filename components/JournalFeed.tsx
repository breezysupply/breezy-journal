'use client'

import React, { useState } from 'react';
import { JournalEntry } from './types';
import DeleteConfirmation from './DeleteConfirmation';
import { Trash2 } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface JournalFeedProps {
  entries: JournalEntry[];
  onDelete: (id: string) => void;
  onToggleListItem: (entryId: string, itemIndex: number) => void;
}

const JournalFeed: React.FC<JournalFeedProps> = ({ entries, onDelete, onToggleListItem }) => {
  const { theme } = useTheme();
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className={`p-4 rounded-lg shadow group relative ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <h3 className="font-bold text-lg">{entry.title}</h3>
          <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {entry.timestamp.toLocaleString()}
          </p>
          {entry.type === 'journal' && <p>{entry.content}</p>}
          {entry.type === 'recipe' && (
            <>
              <h4 className="font-semibold mt-2">Ingredients:</h4>
              <p className="whitespace-pre-line">{entry.ingredients}</p>
              <h4 className="font-semibold mt-2">Steps:</h4>
              <p className="whitespace-pre-line">{entry.steps}</p>
            </>
          )}
          {entry.type === 'list' && (
            <ul className="list-none">
              {entry.listItems?.map((item, index) => (
                <li key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => onToggleListItem(entry.id, index)}
                    className="mr-2"
                  />
                  <span className={item.checked ? 'line-through text-gray-500' : ''}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {entry.type === 'photo' && entry.imageUrl && (
            <img src={entry.imageUrl} alt={entry.title} className="w-full h-auto rounded-lg mt-2" />
          )}
          <button
            onClick={() => setDeleteConfirmation(entry.id)}
            className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      {deleteConfirmation && (
        <DeleteConfirmation
          onConfirm={() => {
            onDelete(deleteConfirmation);
            setDeleteConfirmation(null);
          }}
          onCancel={() => setDeleteConfirmation(null)}
        />
      )}
    </div>
  );
};

export default JournalFeed;
