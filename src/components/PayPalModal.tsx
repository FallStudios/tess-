import React from 'react';
import { X } from 'lucide-react';

interface PayPalModalProps {
  onClose: () => void;
  paypalLink: string;
}

export default function PayPalModal({ onClose, paypalLink }: PayPalModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white/10 p-8 rounded-lg max-w-sm w-full mx-4 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">PayPal QR Code</h2>
        
        <img
          src="/images/paypal-qr.png"
          alt="PayPal QR Code"
          className="w-64 h-64 mx-auto mb-6"
        />

        <a 
          href={paypalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition block"
        >
          Open PayPal directly
        </a>
      </div>
    </div>
  );
}