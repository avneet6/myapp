import React, { useState, useEffect } from 'react';
import { addDoc, updateDoc, doc,collection } from 'firebase/firestore';
import { db } from '../firebase';

function StudentModal({ isOpen, onClose, student }) {
    const initialFormData = {
        name: '',
        age: '',
        email: '',
        section: '',
        rollNumber: '',
        class: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        
      };
  const [formData, setFormData] = useState({  name: '', class: '', section: '', rollNumber: '' });

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({ initialFormData });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (student) {
        await updateDoc(doc(db, 'students', student.id), formData);
    } else {
      await addDoc(collection(db, 'students'), formData);
    }
      onClose();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="content">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content">
            <label>Age: </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          
          <div className="content">
            <label>Class: </label>
            <input
              type="number"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content">
            <label>Section: </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content">
            <label>Roll Number: </label>
            <input
              type="number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content">
            <label>Mobile Number: </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content">
            <label>Address: </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content">
            <label>City: </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content">
            <label>State: </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content">
            <label>Country: </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content">
            <label>Pin Code: </label>
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
          

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default StudentModal;
