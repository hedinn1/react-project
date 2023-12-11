// LeitModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const LeitModal = ({ onRequestClose }) => {

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [ticketPrice, setTicketPrice] = useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/getEvents')
      .then(events => { console.log(events.data); setEvents(events.data) })
      .catch(err => console.log(err))
  }, [])

  const handleSearch = () => {


    let filteredEvents = events;

    if (!searchQuery === '') {
      filteredEvents = filteredEvents.filter((event) => event.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (!selectedLocation === '') {
      filteredEvents = filteredEvents.filter((event) => event.location === selectedLocation);
    }
    if (!selectedGenre === '') {
      filteredEvents = filteredEvents.filter((event) => event.genre === selectedGenre);
    }
    if (!ticketPrice === '') {
      filteredEvents = filteredEvents.filter((event) => event.verd <= ticketPrice);
    }
    if (!fromDate === '' && !toDate === '') {
      filteredEvents = filteredEvents.filter((event) => parseInt(event.date.slice(0, 10).replace(/-/g, "")) >= parseInt(fromDate.replace(/-/g, "")) && (parseInt(event.date.slice(0, 10).replace(/-/g, "")) <= parseInt(toDate.replace(/-/g, ""))));
    } else if (fromDate === '' && !toDate === '') {
      filteredEvents = filteredEvents.filter((event) => parseInt(event.date.slice(0, 10).replace(/-/g, "")) <= parseInt(toDate.replace(/-/g, "")));
    } else if (!fromDate === '' && toDate === '') {
      filteredEvents = filteredEvents.filter((event) => parseInt(event.date.slice(0, 10).replace(/-/g, "")) >= parseInt(fromDate.replace(/-/g, "")));
    }


    setEvents(filteredEvents)
    console.log(events)
    navigate(`/leit/`, {state: {events: filteredEvents}});

    setTimeout(() => {
      onRequestClose();
    }, 0);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (

    <div className='flex flex-column gap-large'>
      <h1 className='font-darkblue no-margin'>Leita</h1>

      <input placeholder='Leitarorð' className='border-radius-small text-input' type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} />

      <select className='border-radius-small text-input' value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
        <option value="">Allar staðsetningar</option>
        <option value="Gaukurinn">Gaukurinn</option>
        <option value="Iðnó">Iðnó</option>
      </select>
      <select className='border-radius-small text-input' value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="">Allar tegundir</option>
        <option value="Rokk">Rokk</option>
        <option value="Jazz">Jazz</option>
        <option value="Indie">Indie</option>
        <option value="Hip-hop">Hip-hop</option>
        <option value="Metal">Metal</option>
      </select>
      <label className='font-size-medium font-darkblue'>
        <b>Miðaverð</b> {ticketPrice}kr
        <br />
        <input
          className='max-width'
          type="range"
          min="0"
          max="10000"
          step="500"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(parseInt(e.target.value))}
        />
      </label>
      <div className='grid gap-small two-row-grid'>
        <h3 className='no-margin font-darkblue'>Frá</h3>
        <h3 className='no-margin font-darkblue'>Til</h3>
        <input
          className='border-darkblue border-radius-small font-size-medium date-input'
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          className='border-darkblue border-radius-small font-size-medium date-input'
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <button className='border-radius-small border-darkblue' type="button" onClick={handleSearch}>Leita</button>
    </div>
  );
};

export default LeitModal;