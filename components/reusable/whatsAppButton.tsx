"use client";
import { useState } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';

function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-3 z-50">
      {/* Chat Popover */}
      {isOpen && (
        <div className="absolute bottom-10 md:bottom-13 right-0 mb-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 px-4 py-2.5 flex items-center justify-between">
            <span className="text-white text-sm font-medium">
              Powered by <span className="font-bold">Nur Nadiya</span>
            </span>
            <button 
              onClick={toggleChat}
              className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Chat Message */}
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
               <BsWhatsapp className='text-green-600' />
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-3 max-w-xs">
                <p className="text-gray-800 text-sm">
                  Hello 👋<br />
                  How can we help you?
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="p-4 pt-0">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <span>Open chat</span>
              <IoSend />
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={toggleChat}
        className="w-12 h-12 md:w-14 md:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <BsWhatsapp className='text-white text-2xl md:text-3xl' />
      </button>
    </div>
  )
}

export default WhatsAppButton
