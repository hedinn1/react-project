import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
  const [events, setEvents] = useState([]);
 

  useEffect(() => {
    axios
      .get('http://localhost:3001/getEvents')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => console.log(err));
      
  }, []);

  return (
    <div className='page-container'>
      <div className='grid two-row-grid events-container gap-large ' >
        {events.map(event => (
          <Link className='border-radius-large border-darkblue' key={event._id} to={`/event/${event._id}`}>
            <div className='font-darkblue'>
              <img className='event-preview-img border-darkblue' src={event.imageUrls && event.imageUrls.length > 0 ? event.imageUrls[0] : ''} alt='https://picsum.photos/200'/>
              <div className='event-details'>
                <h2 className='weight-bold'>
                  {event.name}
                </h2>
                <h3 className='weight-light'>
                  {event.genre}
                </h3>
                <h4 className='weight-light'>
                  {new Date(event.date).toLocaleDateString()}
                </h4>
                <h4 className='weight-regular'>
                  {event.location}
                </h4>
                <h4 className='weight-bold'>
                  {event.verd} kr.
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
