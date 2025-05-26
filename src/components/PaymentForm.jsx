import React from 'react';

export default function PaymentForm({ price, onPaymentSuccess }) {
  // For demo, just show a button and call onPaymentSuccess
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment</h2>
      <div className="text-xl font-semibold">Total: <span className="text-blue-700">${price}</span></div>
      <button
        onClick={() => onPaymentSuccess()}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-semibold text-lg"
      >
        Pay with Stripe
      </button>
    </div>
  );
} 