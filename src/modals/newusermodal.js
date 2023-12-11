import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

const NewUserModal = ({ isOpen, onRequestClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordII, setPasswordII] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [school, setSchool] = useState('');
  const [imageUpload, setImageUpload] = useState(null);

  const [imageUrls, setImageUrls] = useState("");
  const imagesListRef = ref(storage, "userImages/");

  const uploadFile = () => {
    return new Promise((resolve, reject) => {
      if (imageUpload == null) {
        reject("No image to upload");
      } else {
        const imageRef = ref(storage, `userImages/${imageUpload.name + v4()}`);
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== passwordII) {
        alert("Passwords do not match.");
        return;
      }
      const imageUrl = await uploadFile(); // Wait for image upload to complete

      const response = await fetch('http://localhost:3001/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          age,
          country,
          school,
          imageUrls: [imageUrl], // Send the public URL in an array
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save data. Server returned ${response.status}`);
      }

      const result = await response.json();
      console.warn(result);

      if (result) {
        alert("Data saved successfully");
        
        onRequestClose();
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
      // Handle the error as needed (e.g., display an error message to the user)
    }
  }

  return (
    <div className='flex flex-column gap-large'>
      <h1 className='no-margin font-darkblue'>Stofna aðgang</h1>

      <input placeholder='Notandanafn' className='border-radius-small text-input' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />

      <input placeholder='Lykilorð' className='border-radius-small text-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <input placeholder='Endurtaktu lykilorð' className='border-radius-small text-input' type="password" value={passwordII} onChange={(e) => setPasswordII(e.target.value)} />

      <select className='border-radius-small text-input max-width' value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">Veldu land</option>
        <option value="Iceland">Ísland</option>
        <option value="Norway">Noregur</option>
        <option value="Sweden">Svíþjóð</option>
        <option value="Ireland">Írland</option>
        <option value="France">Frakkland</option>
        <option value="Poland">Pólland</option>
        <option value="India">Indland</option>
        <option value="Germany">Þýskaland</option>
      </select>

      <select className='border-radius-small text-input max-width' value={school} onChange={(e) => setSchool(e.target.value)}>
        <option value="">Veldu skóla</option>
        <option value="MR">MR</option>
        <option value="Versló">Versló</option>
        <option value="Tækniskólinn">Tækniskólinn</option>
        <option value="Kvennó">Kvennó</option>
        <option value="Flens">Flens</option>
        <option value="MH">MH</option>
      </select>

      <input placeholder='Aldur' className='border-radius-small text-input'  type="text" value={age} onChange={(e) => setAge(e.target.value)} />

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


      <button className='border-radius-small border-darkblue' type="button" onClick={handleOnSubmit}>Stofna aðgang</button>
    </div >
  )
}

export default NewUserModal;