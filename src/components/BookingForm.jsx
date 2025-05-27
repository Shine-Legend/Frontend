import React, { useState } from 'react';

const SERVICE_OPTIONS = [
  { label: 'Standard', value: 'standard', rate: 10 },
  { label: 'Premium', value: 'premium', rate: 15 },
  { label: 'Deluxe', value: 'deluxe', rate: 20 },
];

export default function BookingForm({ onBookingComplete, estimateNote }) {
  const [serviceType, setServiceType] = useState(SERVICE_OPTIONS[0].value);
  const [windowCount, setWindowCount] = useState(1);
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (windowCount < 1 || windowCount > 60) {
      setError('Window count must be between 1 and 60.');
      return;
    }
    setError('');
    const selectedService = SERVICE_OPTIONS.find(s => s.value === serviceType);
    onBookingComplete({
      serviceType,
      windowCount,
      address,
      rate: selectedService.rate,
      serviceLabel: selectedService.label
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Window Cleaning</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
        <select
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={serviceType}
          onChange={e => setServiceType(e.target.value)}
        >
          {SERVICE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Number of Windows</label>
        <input
          type="number"
          min="1"
          max="60"
          value={windowCount}
          onChange={e => setWindowCount(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <span className="text-xs text-gray-400">Max 60 windows</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter your address"
          required
        />
      </div>
      {estimateNote && (
        <div className="text-xs text-yellow-700 bg-yellow-100 rounded px-2 py-1 mb-2">
          The window count and quote are estimates. Final price will be given on arrival.
        </div>
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold text-lg"
      >
        Next
      </button>
    </form>
  );
}
