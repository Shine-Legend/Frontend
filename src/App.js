import './App.css';
import React, { useState } from 'react';
import BookingForm from './components/BookingForm.jsx';
import ServiceSummary from './components/ServiceSummary.jsx';
import CalendarSelector from './components/CalendarSelector.jsx';
import PaymentForm from './components/PaymentForm.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

function App() {
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState(null);
  const [slot, setSlot] = useState(null);
  const [paid, setPaid] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPrompt, setAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleBookingComplete = (data) => {
    setBookingData(data);
    setStep(1);
  };
  const handleProceedToCalendar = () => setStep(2);
  const handleSlotSelect = (slotData) => {
    setSlot(slotData);
    setStep(3);
  };
  const handlePaymentSuccess = () => setPaid(true);

  const handleAdminClick = () => {
    setAdminPrompt(true);
    setAdminPassword('');
    setAdminError('');
  };
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'shineadmin') {
      setAdminAuth(true);
      setShowAdmin(true);
      setAdminPrompt(false);
    } else {
      setAdminError('Incorrect password');
    }
  };
  const handleAdminLogout = () => {
    setShowAdmin(false);
    setAdminAuth(false);
  };

  if (showAdmin) {
    if (!adminAuth) return null;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center px-4 py-8">
        <button onClick={handleAdminLogout} className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back to Booking</button>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col">
      {/* Top bar */}
      <div className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Shine Legend Logo" className="w-14 h-14 drop-shadow-lg" />
          <span className="text-2xl font-extrabold text-blue-800 tracking-tight">Shine Legend</span>
        </div>
        <button
          onClick={handleAdminClick}
          className="text-sm text-blue-500 underline hover:text-blue-700 transition"
        >
          Admin Dashboard
        </button>
      </div>
      {/* Admin Password Prompt */}
      {adminPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleAdminLogin} className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4 min-w-[300px]">
            <h2 className="text-xl font-bold text-blue-800">Admin Login</h2>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              autoFocus
            />
            {adminError && <div className="text-red-500 text-sm">{adminError}</div>}
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
              <button type="button" onClick={() => setAdminPrompt(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </form>
        </div>
      )}
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-4 text-center drop-shadow-lg">
          Book Local Window Cleaning
        </h1>
        <p className="text-xl md:text-2xl text-blue-700 mb-2 text-center font-semibold italic">
          Radiating Excellence, One Window at a Time
        </p>
        <p className="text-md md:text-lg text-blue-500 mb-4 text-center font-medium">
          Located in Kingston, Ontario, Canada
        </p>
        <p className="text-lg md:text-2xl text-blue-700 mb-8 text-center max-w-2xl">
          Fast, easy, and reliable window cleaning appointments. Choose your service, select a time, and enjoy sparkling results!
        </p>
        {/* Booking Card */}
        <div className="w-full max-w-xl">
          <div className="bg-white/90 rounded-3xl shadow-2xl ring-1 ring-blue-100 p-8 md:p-10 transition-all">
            {step === 0 && <BookingForm onBookingComplete={handleBookingComplete} estimateNote />}
            {step === 1 && <ServiceSummary data={bookingData} onProceed={handleProceedToCalendar} estimateNote />}
            {step === 2 && <CalendarSelector onSlotSelect={handleSlotSelect} />}
            {step === 3 && (
              <PaymentForm price={bookingData.windowCount * bookingData.rate} onPaymentSuccess={handlePaymentSuccess} />
            )}
            {paid && (
              <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-6 text-center">
                <h2 className="text-2xl font-bold text-green-700 mb-2">Booking Confirmed!</h2>
                <p className="text-lg text-gray-700 mb-4">Thank you for booking with Shine Legend.</p>
                <div className="text-sm text-gray-500">We look forward to serving you.</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="text-center text-gray-400 py-6 flex flex-col items-center gap-2">
        <div>&copy; 2025 Shine Legend.</div>
        <a
          href="https://www.linkedin.com/company/shine-legend/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 transition"
        >
          <img src="/logo-linkedin.png" alt="LinkedIn" width="32" height="32" className="inline-block align-middle rounded-full" />
          <span className="sr-only">LinkedIn</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
