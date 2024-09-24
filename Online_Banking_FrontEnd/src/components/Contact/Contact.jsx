import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';
import './contact.css';

const Contact = ()=>{
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., sending data to an API)
        console.log('Form submitted:', formData);
      };
    return(
        <>
        <div id='contact' className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <FaPhone className="icon" />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <FaComments className="icon" />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div>
        </>
    )
}

export default Contact;