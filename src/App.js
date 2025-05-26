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

  if (showAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center px-4 py-8">
        <button onClick={() => setShowAdmin(false)} className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back to Booking</button>
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
          onClick={() => setShowAdmin(true)}
          className="text-sm text-blue-500 underline hover:text-blue-700 transition"
        >
          Admin Dashboard
        </button>
      </div>
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
            {step === 0 && <BookingForm onBookingComplete={handleBookingComplete} />}
            {step === 1 && <ServiceSummary data={bookingData} onProceed={handleProceedToCalendar} />}
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
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#0A66C2"/><path d="M8.839 11.667H11.06V20H8.839V11.667ZM9.95 8.667C10.67 8.667 11.25 9.247 11.25 9.967C11.25 10.687 10.67 11.267 9.95 11.267C9.23 11.267 8.65 10.687 8.65 9.967C8.65 9.247 9.23 8.667 9.95 8.667ZM12.839 11.667H15.06V12.667H15.09C15.39 12.127 16.09 11.567 17.09 11.567C19.09 11.567 19.5 12.847 19.5 14.447V20H17.28V15.047C17.28 13.947 17.26 12.547 15.78 12.547C14.28 12.547 14.06 13.747 14.06 15.007V20H11.839V11.667H12.839Z" fill="white"/></svg>
          <span className="sr-only">LinkedIn</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
