import React, { useState } from 'react';
import { Twitter, Youtube, Mail, MessageCircle, DollarSign } from 'lucide-react';
import PayPalModal from './PayPalModal';

export default function Footer() {
  const [showPayPal, setShowPayPal] = useState(false);
  const paypalLink = "https://paypal.me/yourusername"; // Replace with your PayPal.me link

  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
            <div className="flex flex-col space-y-3">
              <a href="https://twitter.com/yourusername" className="flex items-center space-x-2 hover:text-gray-300 transition">
                <Twitter size={20} />
                <span>Twitter</span>
              </a>
              <a href="https://youtube.com/c/yourusername" className="flex items-center space-x-2 hover:text-gray-300 transition">
                <Youtube size={20} />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Payment Options */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
            <button 
              onClick={() => setShowPayPal(true)}
              className="flex items-center space-x-2 hover:text-gray-300 transition"
            >
              <DollarSign size={20} />
              <span>PayPal</span>
            </button>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="flex flex-col space-y-3">
              <a href="mailto:contact@example.com" className="flex items-center space-x-2 hover:text-gray-300 transition">
                <Mail size={20} />
                <span>contact@example.com</span>
              </a>
              <a href="#" className="flex items-center space-x-2 hover:text-gray-300 transition">
                <MessageCircle size={20} />
                <span>Discord: username#0000</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>© 2024 RobloxDev. All rights reserved.</p>
        </div>
      </div>

      {showPayPal && (
        <PayPalModal
          onClose={() => setShowPayPal(false)}
          paypalLink={paypalLink}
        />
      )}
    </footer>
  );
}