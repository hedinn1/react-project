// VidburdurModal.js
import React, { useState } from 'react';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";


const VidburdurModal = ({ isOpen, onRequestClose }) => {

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [genre, setGenre] = useState("");
  const [verd, setVerd] = useState("");
  const [imageUpload, setImageUpload] = useState('')

  const [imageUrls, setImageUrls] = useState("");
  const imagesListRef = ref(storage, "images/");

  const uploadFile = () => {
    return new Promise((resolve, reject) => {
      if (imageUpload == null) {
        reject("No image to upload");
      } else {
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                resolve(url); // Resolve the promise with the public URL
              })
              .catch((error) => reject(error));
          })
          .catch((error) => reject(error));
      }
    });
  };


  // Skra nytt event
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadFile(); // Wait for image upload to complete

      const response = await fetch('http://localhost:3001/registerEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          date,
          location,
          description,
          imageUrls: [imageUrl], // Send the public URL in an array
          organizer,
          genre,
          verd,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save data. Server returned ${response.status}`);
      }

      const result = await response.json();
      console.warn(result);

      if (result) {
        alert("Data saved successfully");
        setName("");
        setDate("");
        setLocation("");
        setDescription("");
        setOrganizer("");
        setGenre("");
        setImageUrls([]); // Clear image URLs after saving
        setVerd("");
        onRequestClose();
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
      // Handle the error as needed (e.g., display an error message to the user)
    }
  };


  return (
    <div className='flex flex-column gap-large'>

      <h1 className='no-margin font-darkblue'>Nýr viðburður</h1>

      <input placeholder='Titill' className='border-radius-small text-input' type="text" onChange={(e) => setName(e.target.value)} />

      <textarea className='background-lightgray font-size-medium border-radius-small border-lightblue padding-small font-family' placeholder='Lýsing' onChange={(e) => setDescription(e.target.value)} />

      <select className='border-radius-small text-input max-width' value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">Staðsetning</option>
        <option value="Gaukurinn">Gaukurinn</option>
        <option value="Iðnó">Iðnó</option>
      </select>
      
      <select className='border-radius-small text-input max-width' value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Genre</option>
        <option value="Rokk">Rokk</option>
        <option value="Jazz">Jazz</option>
        <option value="Indie">Indie</option>
        <option value="Hip-hop">Hip-hop</option>
        <option value="Metal">Metal</option>
      </select>

      <div className='grid gap-small'>
        <h3 className='no-margin font-darkblue'>Dagsetning</h3>
        <input className='date-input font-size-medium border-radius-small border-darkblue' type="date" onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className='grid gap-small'>
        <h3 className='no-margin font-darkblue'>Mynd</h3>
        <input className='font-size-medium'
          type="file"
          onChange={(e) => {
            //setImageUrls(e.target.files[0]);
            setImageUpload(e.target.files[0]);
          }}
        />
      </div>

      <label className='font-size-medium font-darkblue'>
        <b>Miðaverð</b> {verd}kr
        <br />
        <input
          className='max-width'
          type="range"
          min="0"
          max="10000"
          step="500"
          value={verd}
          onChange={(e) => setVerd(parseInt(e.target.value))}
        />
      </label>
      <button className='border-radius-small border-darkblue' type="button" onClick={handleOnSubmit}>Búa til viðburð</button>
    </div>
  );
};

export default VidburdurModal;