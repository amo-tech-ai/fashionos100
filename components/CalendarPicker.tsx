
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface CalendarPickerProps {
  onClose: () => void;
  onApply: (start: Date | null, end: Date | null) => void;
  initialStart: Date | null;
  initialEnd: Date | null;
  minDate?: Date;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({ onClose, onApply, initialStart, initialEnd, minDate }) => {
  const [currentDate, setCurrentDate] = useState(initialStart || new Date()); 
  const [startDate, setStartDate] = useState<Date | null>(initialStart);
  const [endDate, setEndDate] = useState<Date | null>(initialEnd);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const isDateDisabled = (date: Date) => {
    if (!minDate) return false;
    const today = new Date(minDate);
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (isDateDisabled(clickedDate)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else {
      if (clickedDate < startDate) {
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    }
  };

  const isDateSelected = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return (startDate && date.getTime() === startDate.getTime()) || 
           (endDate && date.getTime() === endDate.getTime());
  };

  const isDateInRange = (day: number) => {
    if (!startDate) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const end = endDate || hoverDate;
    return end && date > startDate && date < end;
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const disabled = isDateDisabled(date);
      const isSelected = isDateSelected(i);
      const inRange = isDateInRange(i) && !disabled;
      const isStart = startDate && date.getTime() === startDate.getTime();
      const isEnd = endDate && date.getTime() === endDate.getTime();
      
      let roundedClass = "rounded-full";
      if (inRange) roundedClass = "rounded-none";
      if (isStart && endDate) roundedClass = "rounded-l-full rounded-r-none";
      if (isEnd && startDate) roundedClass = "rounded-r-full rounded-l-none";
      if (isStart && !endDate && hoverDate && hoverDate > startDate) roundedClass = "rounded-l-full rounded-r-none";

      days.push(
        <button
          key={i}
          onClick={() => handleDateClick(i)}
          onMouseEnter={() => !disabled && setHoverDate(date)}
          onMouseLeave={() => setHoverDate(null)}
          disabled={disabled}
          className={`h-9 w-9 flex items-center justify-center text-xs font-medium transition-all relative
            ${disabled ? 'text-gray-300 cursor-not-allowed' : isSelected ? 'bg-black text-white z-10' : 'hover:bg-gray-100 text-gray-700'}
            ${inRange ? 'bg-gray-100' : ''}
            ${roundedClass}
          `}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[320px] animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-50 rounded-full transition-colors"><ChevronLeft size={16} /></button>
        <span className="font-serif font-bold text-lg">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-50 rounded-full transition-colors"><ChevronRight size={16} /></button>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <div key={idx} className="h-8 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 mb-6">{renderDays()}</div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <button onClick={() => { setStartDate(null); setEndDate(null); }} className="text-xs font-medium text-gray-400 hover:text-black transition-colors">Reset</button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onClose} className="px-4">Cancel</Button>
          <Button variant="primary" size="sm" onClick={() => onApply(startDate, endDate)} className="px-4 rounded-full">Apply</Button>
        </div>
      </div>
    </div>
  );
};
