'use client';

import React, { useState, useCallback } from 'react';
import { PenTool, Award, CheckSquare, Image as ImageIcon, PartyPopper, Sun, Moon } from 'lucide-react';
import ReactConfetti from 'react-confetti';
import JournalPopup from './JournalPopup';
import RecipePopup from './RecipePopup';
import ListPopup from './ListPopup';
import PhotoUpload from './PhotoUpload';
import JournalFeed from './JournalFeed';
import ActionButton from './ActionButton';
import { JournalEntry } from './types';
import { useTheme } from './ThemeContext';

const DailyJournal: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [shakeButton, setShakeButton] = useState<string | null>(null);
  const [showJournalPopup, setShowJournalPopup] = useState(false);
  const [showRecipePopup, setShowRecipePopup] = useState(false);
  const [showListPopup, setShowListPopup] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const actionButtons = [
    { icon: <PenTool className="w-6 h-6" />, title: 'New Entry', subtitle: 'Start a new entry for your journal' },
    { icon: <Award className="w-6 h-6" />, title: 'Recipes', subtitle: 'Document your recipes' },
    { icon: <CheckSquare className="w-6 h-6" />, title: 'Lists', subtitle: 'Create a checklist' },
    { icon: <ImageIcon className="w-6 h-6" />, title: 'Photos', subtitle: 'Add a photo or illustration' },
  ];

  const handleButtonClick = (buttonName: string) => {
    setShakeButton(buttonName);
    setTimeout(() => setShakeButton(null), 500);
    if (buttonName === 'New Entry') {
      setShowJournalPopup(true);
    } else if (buttonName === 'Recipes') {
      setShowRecipePopup(true);
    } else if (buttonName === 'Lists') {
      setShowListPopup(true);
    } else if (buttonName === 'Photos') {
      setShowPhotoUpload(true);
    }
  };

  const handlePostEntry = (entry: JournalEntry) => {
    setJournalEntries([entry, ...journalEntries]);
  };

  const handleDeleteEntry = (id: string) => {
    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
  };

  const handleToggleListItem = (entryId: string, itemIndex: number) => {
    setJournalEntries(journalEntries.map(entry => {
      if (entry.id === entryId && entry.type === 'list' && entry.listItems) {
        const newListItems = [...entry.listItems];
        newListItems[itemIndex] = { ...newListItems[itemIndex], checked: !newListItems[itemIndex].checked };
        return { ...entry, listItems: newListItems };
      }
      return entry;
    }));
  };

  const handleCelebrate = useCallback(() => {
    setIsCelebrating(true);
    setTimeout(() => setIsCelebrating(false), 5000);
  }, []);

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {isCelebrating && <ReactConfetti />}
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">Daily Journal</h1>
          <div className="flex space-x-4 items-center">
            <button
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-900'}`}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className={`px-4 py-2 rounded-md shadow-md transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600 ${shakeButton === 'New Entry' ? 'animate-shake' : ''}`}
              onClick={() => handleButtonClick('New Entry')}
            >
              New Entry
            </button>
          </div>
        </header>

        <main>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8">Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {actionButtons.map((button, index) => (
                <ActionButton key={index} {...button} onClick={() => handleButtonClick(button.title)} />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-8 text-center">Journal Feed</h2>
            <JournalFeed 
              entries={journalEntries} 
              onDelete={handleDeleteEntry} 
              onToggleListItem={handleToggleListItem}
            />
          </div>
        </main>

        <button
          className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-colors duration-200 ${
            isCelebrating ? 'bg-purple-500' : 'bg-yellow-400'
          } text-gray-900 hover:bg-purple-600 hover:text-white`}
          onClick={handleCelebrate}
        >
          <PartyPopper className="w-6 h-6" />
        </button>

        {showJournalPopup && (
          <JournalPopup
            onClose={() => setShowJournalPopup(false)}
            onPost={handlePostEntry}
          />
        )}

        {showRecipePopup && (
          <RecipePopup
            onClose={() => setShowRecipePopup(false)}
            onPost={handlePostEntry}
          />
        )}

        {showListPopup && (
          <ListPopup
            onClose={() => setShowListPopup(false)}
            onPost={handlePostEntry}
          />
        )}

        {showPhotoUpload && (
          <PhotoUpload
            onClose={() => setShowPhotoUpload(false)}
            onPost={handlePostEntry}
          />
        )}
      </div>
    </div>
  );
};

export default DailyJournal;