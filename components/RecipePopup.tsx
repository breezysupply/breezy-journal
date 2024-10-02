import React, { useState } from 'react';
import { JournalEntry } from './types';
import { useTheme } from './ThemeContext';

interface RecipePopupProps {
  onClose: () => void;
  onPost: (entry: JournalEntry) => void;
}

const RecipePopup: React.FC<RecipePopupProps> = ({ onClose, onPost }) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handlePost = () => {
    if (title && ingredients && steps) {
      onPost({
        id: Date.now().toString(),
        type: 'recipe',
        title,
        ingredients,
        steps,
        timestamp: new Date(),
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className={`p-6 rounded-lg w-full max-w-md ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <h2 className="text-2xl font-bold mb-4">New Recipe</h2>
        <input
          type="text"
          placeholder="Recipe Title"
          className={`w-full p-2 mb-4 border rounded ${
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Ingredients (one per line)"
          className={`w-full p-2 mb-4 border rounded h-32 ${
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
          }`}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          placeholder="Steps"
          className={`w-full p-2 mb-4 border rounded h-32 ${
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
          }`}
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className={`px-4 py-2 rounded ${
            theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'
          }`}>Cancel</button>
          <button onClick={handlePost} className="px-4 py-2 bg-blue-500 text-white rounded">Post</button>
        </div>
      </div>
    </div>
  );
};

export default RecipePopup;
