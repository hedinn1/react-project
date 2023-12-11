import React from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';

const Leit = ({ filteredEvents })  => {
  const location = useLocation();

  console.log(location.state.events)

  return (
    <div className='page-container'>
      <div className='grid two-row-grid events-container gap-large ' >
        {location.state.events.map(event => (
          <Link className='border-radius-large border-darkblue' key={event._id} to={`/event/${event._id}`}>
            <div className='font-darkblue'>
              <img className='event-preview-img border-darkblue' src={event.imageUrls && event.imageUrls.length > 0 ? event.imageUrls[0] : ''} alt='https://picsum.photos/200'/>
              <div className='event-details'>
                <h2 className='weight-bold'>
                  {event.name}
                </h2>
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

export default Leit;
