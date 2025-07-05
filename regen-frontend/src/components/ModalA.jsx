import React from 'react';

const ModalA = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader = false,
  showActionButton = false,
  actionBtnIcon = null,
  actionBtnText = '',
  onActionClick = () => {},
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="relative bg-white shadow-lg rounded-lg p-4 overflow-hidden"
        style={{
          maxHeight: '95vh',       // Slightly less than full screen height
          overflowY: 'auto',
          width: 'fit-content',
        }}
      >
        {/* Header */}
        {!hideHeader && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            {showActionButton && (
              <button
                onClick={onActionClick}
                className="btn-small-light mr-12"
              >
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-900 absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalA;
