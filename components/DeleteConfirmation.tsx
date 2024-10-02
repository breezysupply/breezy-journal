import React from 'react';

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
      <p className="mb-4">Are you sure you want to delete this entry?</p>
      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmation;
