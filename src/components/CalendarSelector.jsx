import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';

// Mock fully booked slots (for demo)
const fullyBooked = [
  { date: dayjs().add(1, 'day').format('YYYY-MM-DD'), time: '10:00' },
  { date: dayjs().add(2, 'day').format('YYYY-MM-DD'), time: '13:30' },
];

function isSlotBooked(dateStr, timeStr) {
  return fullyBooked.some(slot => slot.date === dateStr && slot.time === timeStr);
}

export default function CalendarSelector({ onSlotSelect }) {
  const calendarRef = useRef();

  const handleDateSelect = (selectInfo) => {
    const start = dayjs(selectInfo.start);
    const end = dayjs(selectInfo.end);
    // Only allow 90-min slots
    if (end.diff(start, 'minute') !== 90) return;
    const dateStr = start.format('YYYY-MM-DD');
    const timeStr = start.format('HH:mm');
    if (isSlotBooked(dateStr, timeStr)) return;
    onSlotSelect({ date: dateStr, time: timeStr });
  };

  // Generate available slots for the next 7 days
  const events = [];
  for (let d = 0; d < 7; d++) {
    const date = dayjs().add(d, 'day').format('YYYY-MM-DD');
    for (let h = 8; h <= 18.5; h += 1.5) {
      const hour = Math.floor(h);
      const min = h % 1 === 0 ? '00' : '30';
      const time = `${hour.toString().padStart(2, '0')}:${min}`;
      if (!isSlotBooked(date, time)) {
        events.push({
          title: 'Available',
          start: `${date}T${time}`,
          end: dayjs(`${date}T${time}`).add(90, 'minute').toISOString(),
          display: 'background',
        });
      }
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Time Slot</h2>
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        selectMirror={true}
        allDaySlot={false}
        slotDuration="01:30:00"
        slotLabelInterval="01:30:00"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        events={events}
        select={handleDateSelect}
        height="auto"
        headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
      />
    </div>
  );
} 