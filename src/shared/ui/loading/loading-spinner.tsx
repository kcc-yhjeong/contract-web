import React from 'react';

function LoadingSpinner({ text }: { text?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-gray-600 mb-2"></div>
            {text && <span className="text-gray-500 text-sm mt-2">{text}</span>}
        </div>
    );
}

export { LoadingSpinner };
