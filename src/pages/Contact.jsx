import React, { useState } from 'react';
import './Contact.css';
import { createEnquiry } from '../utils/enquires';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createEnquiry(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Failed to send enquiry. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <ul>
            <li>
              <strong>Address:</strong> 123 Main Street, Cumming, GA
            </li>
            <li>
              <strong>Phone:</strong> (555) 123-4567
            </li>
            <li>
              <strong>Email:</strong> info@padhusalterations.com
            </li>
            <li>
              <strong>Hours:</strong> Mon–Fri, 9am – 6pm
            </li>
          </ul>
        </div>

        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          {submitted ? (
            <p className="success-message">
              Thank you for your enquiry! We'll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
