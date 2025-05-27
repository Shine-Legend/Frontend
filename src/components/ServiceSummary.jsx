import React from 'react';

export default function ServiceSummary({ data, onProceed, estimateNote }) {
  if (!data) return null;
  const { serviceLabel, windowCount, rate, address } = data;
  const price = windowCount * rate;
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Summary</h2>
      <div className="text-lg"><span className="font-semibold">Service:</span> {serviceLabel}</div>
      <div className="text-lg"><span className="font-semibold">Estimated Windows:</span> {windowCount}</div>
      <div className="text-lg"><span className="font-semibold">Address:</span> {address}</div>
      <div className="text-xl font-bold text-blue-700">Estimated Price: ${price}</div>
      {estimateNote && (
        <div className="text-xs text-yellow-700 bg-yellow-100 rounded px-2 py-1 mb-2">
          The window count and quote are estimates. Final price will be given on arrival.
        </div>
      )}
      <button
        onClick={onProceed}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-semibold text-lg"
      >
        Proceed to Calendar
      </button>
    </div>
  );
} 