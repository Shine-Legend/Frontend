import React, { useState } from 'react';

const MOCK_BOOKINGS = [
  { id: 1, name: 'Alice', service: 'Standard', date: '2024-06-01', status: 'Scheduled' },
  { id: 2, name: 'Bob', service: 'Premium', date: '2024-06-02', status: 'Completed' },
  { id: 3, name: 'Charlie', service: 'Deluxe', date: '2024-06-03', status: 'Scheduled' },
];

export default function AdminDashboard() {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

  const updateStatus = (id, status) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const exportCSV = () => {
    const csv = [
      ['Name', 'Service', 'Date', 'Status'],
      ...bookings.map(b => [b.name, b.service, b.date, b.status])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={exportCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >Export CSV</button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map(b => (
            <tr key={b.id}>
              <td className="px-6 py-4 whitespace-nowrap">{b.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{b.service}</td>
              <td className="px-6 py-4 whitespace-nowrap">{b.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{b.status}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button
                  onClick={() => updateStatus(b.id, 'Rescheduled')}
                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >Reschedule</button>
                <button
                  onClick={() => updateStatus(b.id, 'Cancelled')}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >Cancel</button>
                <button
                  onClick={() => updateStatus(b.id, 'Completed')}
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >Mark Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 