import React, { useState, useRef } from 'react';
import { JournalEntry } from './types';
import { useTheme } from './ThemeContext';

interface PhotoUploadProps {
  onClose: () => void;
  onPost: (entry: JournalEntry) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onClose, onPost }) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 50 * 1024 * 1024) { // 50MB limit
      setSelectedFile(file);
    } else {
      alert('Please select an image file no larger than 50MB.');
    }
  };

  const handlePost = () => {
    if (title && selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onPost({
          id: Date.now().toString(),
          type: 'photo',
          title,
          imageUrl,
          timestamp: new Date(),
        });
        onClose();
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className={`p-6 rounded-lg w-full max-w-md ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <h2 className="text-2xl font-bold mb-4">Upload Photo</h2>
        <input
          type="text"
          placeholder="Photo Title"
          className={`w-full p-2 mb-4 border rounded ${
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Select Image
        </button>
        {selectedFile && (
          <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Selected: {selectedFile.name}
          </p>
        )}
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose} 
            className={`px-4 py-2 rounded ${
              theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            } transition-colors duration-200`}
          >
            Cancel
          </button>
          <button 
            onClick={handlePost} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
