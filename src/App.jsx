import React, { useState, useEffect } from 'react';
import { Settings, Instagram, MessageCircle, MapPin, Clock, X } from 'lucide-react';

// --- Sample Data ---
// This is the default CSV data used when no saved data is found.
const SAMPLE_CSV = `Club Name,Event Name,Location,Time,Date,Source
Finance Club,Investment Banking Workshop,VC 3-215,6:00 PM,2025-11-02,instagram
Marketing Society,Guest Speaker: CMO of Vayner,NVC 1-107,5:30 PM,2025-11-02,whatsapp
Data Science Club,Intro to Python Pandas,Library 550,7:00 PM,2025-11-02,instagram
Accounting Club,Big 4 Networking Night,NVC Main Gym,6:30 PM,2025-11-02,whatsapp
Bearcat Coders,React Study-Jam,VC 6-210,5:00 PM,2025-11-02,instagram
Pre-Law Society,LSAT Prep Session,VC 12-150,6:00 PM,2025-11-02,whatsapp
BioMed Society,MCAT Study Group,NVC 8-250,5:30 PM,2025-11-02,instagram
Fashion Club,Thrift Flip Workshop,NVC 3-125,4:00 PM,2025-11-02,whatsapp
Chess Club,Blitz Tournament,NVC 2-115,5:00 PM,2025-11-02,instagram
Finance Club,Stock Pitch Competition,VC 3-215,6:00 PM,2025-11-03,instagram
Bearcat Coders,Project Showcase,NVC 1-107,5:30 PM,2025-11-03,whatsapp
Marketing Society,Case Competition Kick-off,VC 6-210,7:00 PM,2025-11-03,instagram`;

// --- CSV Parsing Helper ---
/**
 * Parses a raw CSV string into an array of event objects.
 * @param {string} data - The raw CSV string.
 * @returns {Array<Object>} An array of event objects.
 */
const parseCsv = (data) => {
  if (!data) return [];
  const lines = data.trim().split('\n');
  lines.shift(); // Remove header row
  
  return lines
    .filter(line => line.trim() !== '') // Filter out empty lines
    .map(line => {
      // Split by comma, handling potential commas inside fields if quoted (basic)
      // For this app, we assume simple comma-separated values without quotes.
      const [club, event, location, time, date, source] = line.split(',');
      
      return { 
        club: club?.trim() || 'N/A', 
        event: event?.trim() || 'N/A', 
        location: location?.trim() || 'N/A', 
        time: time?.trim() || 'N/A', 
        date: date?.trim() || 'N/A', 
        source: source?.trim() || 'N/A' 
      };
    });
};

// --- EventCard Component ---
/**
 * Displays a single event card.
 */
const EventCard = ({ event }) => {
  const { club, event: eventName, location, time, source } = event;

  return (
    <div className="relative bg-white rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl border-t-4 border-blue-500">
      {/* Source Icon */}
      <div className="absolute top-4 right-4">
        {source === 'instagram' && <Instagram size={20} className="text-pink-600" />}
        {source === 'whatsapp' && <MessageCircle size={20} className="text-green-600" />}
      </div>
      
      {/* Card Content */}
      <div className="pr-8">
        <h3 className="text-xl font-bold text-gray-800">{club}</h3>
        <h4 className="text-lg font-semibold text-blue-800 mt-2">{eventName}</h4>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
        <div className="flex items-center text-gray-700">
          <MapPin size={20} className="text-gray-500 mr-2 flex-shrink-0" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Clock size={20} className="text-gray-500 mr-2 flex-shrink-0" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

// --- SettingsModal Component ---
/**
 * A modal for editing and managing the CSV event data.
 */
const SettingsModal = ({ 
  show, 
  onClose, 
  tempCsv, 
  setTempCsv, 
  handleSave, 
  handleLoadSample, 
  handleClearAll 
}) => {
  if (!show) return null;

  // Calculate row count for display
  const rowCount = tempCsv.split('\n').filter(line => line.trim() !== '').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto text-gray-900"
        onClick={e => e.stopPropagation()} // Prevent modal close on content click
      >
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-3xl font-bold">Settings</h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-gray-600 hover:bg-gray-200 transition"
            aria-label="Close settings"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Paste your raw CSV data below to update the events wall.
        </p>

        {/* CSV Textarea */}
        <textarea
          value={tempCsv}
          onChange={(e) => setTempCsv(e.target.value)}
          className="w-full h-64 font-mono border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste CSV data here..."
        />
        
        {/* Format Guide & Row Counter */}
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
           <p>
            Format: <code className="bg-gray-100 p-1 rounded text-xs">Club Name,Event Name,Location,Time,Date,Source</code>
          </p>
          <p className="font-medium">{rowCount} rows detected</p>
        </div>

        {/* Data Actions */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button 
            onClick={handleLoadSample} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Load Sample Data
          </button>
          <button 
            onClick={handleClearAll}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Clear All Data
          </button>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 mt-6 border-t pt-4">
          <button 
            onClick={onClose} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-200">
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Save & Load Events
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
/**
 * The main application component for the Baruch Events Wall.
 */
export default function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2025-11-02');
  const [csvData, setCsvData] = useState(''); // The *saved* CSV from localStorage
  const [tempCsvData, setTempCsvData] = useState(''); // Buffer for modal textarea
  const [showSettings, setShowSettings] = useState(false);

  // Load data from localStorage or sample on initial mount
  useEffect(() => {
    try {
      const savedCsv = localStorage.getItem('baruch_events_csv');
      if (savedCsv) {
        setEvents(parseCsv(savedCsv));
        setCsvData(savedCsv);
      } else {
        // No saved data, load sample
        setEvents(parseCsv(SAMPLE_CSV));
        setCsvData(''); // No saved data, so set to empty string (triggers yellow badge)
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      // Fallback to sample data on error
      setEvents(parseCsv(SAMPLE_CSV));
      setCsvData('');
    }
  }, []);

  // --- Modal Handlers ---

  const openSettings = () => {
    // Load current saved data (or sample) into the modal textarea
    setTempCsvData(localStorage.getItem('baruch_events_csv') || SAMPLE_CSV);
    setShowSettings(true);
  };

  const handleCloseModal = () => {
    setShowSettings(false);
    setTempCsvData(''); // Clear buffer on close
  };

  const handleSave = () => {
    try {
      localStorage.setItem('baruch_events_csv', tempCsvData);
      const newEvents = parseCsv(tempCsvData);
      setEvents(newEvents);
      setCsvData(tempCsvData); // Update the 'saved' state
      handleCloseModal();
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

  const handleLoadSample = () => {
    setTempCsvData(SAMPLE_CSV);
  };

  const handleClearAll = () => {
    try {
      localStorage.removeItem('baruch_events_csv');
      const sampleEvents = parseCsv(SAMPLE_CSV);
      setEvents(sampleEvents);
      setCsvData(''); // Set to empty to trigger yellow badge
      handleCloseModal();
    } catch (error) {
      console.error("Error clearing data from localStorage:", error);
    }
  };

  // --- Render Logic ---
  
  // Filter events for the selected date and limit to 9
  const filteredEvents = events.filter(event => event.date === selectedDate).slice(0, 9);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white p-8">
      <div className="relative max-w-7xl mx-auto">
        
        {/* Settings Button */}
        <button 
          onClick={openSettings} 
          className="absolute top-0 right-0 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition duration-200"
          aria-label="Open settings"
        >
          <Settings size={28} />
        </button>

        {/* Header */}
        <header className="text-center pt-8 md:pt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">Baruch Events Wall</h1>
          <h2 className="text-xl sm:text-2xl text-blue-200 mt-2 mb-4">Daily Campus Event Dashboard</h2>
        </header>

        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          {csvData ? (
            <span className="bg-green-500 text-green-900 text-sm font-semibold px-3 py-1 rounded-full shadow-md">
              Using saved data - {events.length} events loaded
            </span>
          ) : (
            <span className="bg-yellow-500 text-yellow-900 text-sm font-semibold px-3 py-1 rounded-full shadow-md">
              Using sample data
            </span>
          )}
        </div>

        {/* Date Selector */}
        <div className="flex justify-center mb-8">
          <input 
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 rounded-lg bg-white/90 text-gray-900 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
            aria-label="Select date"
          />
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center text-blue-100 text-2xl mt-16">
            No events scheduled for this date.
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal 
        show={showSettings}
        onClose={handleCloseModal}
        tempCsv={tempCsvData}
        setTempCsv={setTempCsvData}
        handleSave={handleSave}
        handleLoadSample={handleLoadSample}
        handleClearAll={handleClearAll}
      />
    </div>
  );
}
