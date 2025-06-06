
import React from 'react';

const Modal = ({ isOpen, onClose, children, showCloseButton = true }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = null,
  itemCount = 0,
  isMultiple = false
}) => {
  const getModalContent = () => {
    if (isMultiple) {
      return {
        icon: "/Disregard.png",
        title: `Delete ${itemCount} items?`,
        description: "The selected product will be permanantly remove from your cart.",
        confirmText: "Delete Items",
        cancelText: "Cancel"
      };
    } else {
      return {
        icon: "/Disregard.png",
        title: "Delete item?",
        description: "The selected product will be permanantly remove from your cart.",
        confirmText: "Delete Item",
        cancelText: "Cancel"
      };
    }
  };
  
  const content = getModalContent();
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="mb-4">
          <img
            src={content.icon}
            alt="Delete"
            className="w-16 h-16 mx-auto"
            onError={(e) => {
              e.target.src = '/placeholder-delete.png';
            }}
          />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {content.title}
        </h3>
        
        <p className="text-gray-600 mb-1">
          {content.description}
        </p>
        
        <p className="text-sm text-gray-500 mb-6">
          {content.subDescription}
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full font-medium transition-colors"
            style={{ 
              backgroundColor: 'white', 
              color: '#ef4444', 
              border: '1px solid #ef4444' 
            }}
          >
            {content.cancelText}
          </button>
          
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-3 rounded-full font-medium transition-colors"
            style={{ 
              backgroundColor: '#ef4444', 
              color: 'white', 
              border: '1px solid #ef4444' 
            }}
          >
            {content.confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

