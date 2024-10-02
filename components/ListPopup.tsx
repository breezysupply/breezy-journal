import React, { useState } from 'react';
import { JournalEntry } from './types';
import { useTheme } from './ThemeContext';

interface ListPopupProps {
  onClose: () => void;
  onPost: (entry: JournalEntry) => void;
}

const ListPopup: React.FC<ListPopupProps> = ({ onClose, onPost }) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [listItems, setListItems] = useState<string[]>(['']);

  const handleAddItem = () => {
    setListItems([...listItems, '']);
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...listItems];
    newItems[index] = value;
    setListItems(newItems);
  };

  const handlePost = () => {
    if (title && listItems.some(item => item.trim() !== '')) {
      onPost({
        id: Date.now().toString(),
        type: 'list',
        title,
        listItems: listItems.filter(item => item.trim() !== '').map(item => ({ text: item, checked: false })),
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
        <h2 className="text-2xl font-bold mb-4">New List</h2>
        <input
          type="text"
          placeholder="List Title"
          className={`w-full p-2 mb-4 border rounded ${
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {listItems.map((item, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Item ${index + 1}`}
            className={`w-full p-2 mb-2 border rounded ${
              theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
            }`}
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
          />
        ))}
        <button onClick={handleAddItem} className={`w-full p-2 mb-4 bg-gray-200 rounded ${
          theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'
        }`}>Add Item</button>
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

export default ListPopup;
