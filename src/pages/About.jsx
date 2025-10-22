import React from 'react';
import './About.css';
import banner from '../assets/About.jpg';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-banner">
        <img src={banner} alt="Padhu's Alterations" className="banner-image" />
      </section>
      <section className="about-mission">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At <strong>Padhu’s Alterations</strong>, we believe that every piece
            of clothing deserves the perfect fit. With years of tailoring
            experience, we specialize in custom alterations that help you feel
            confident and comfortable in every outfit.
          </p>
        </div>
      </section>

      <section className="about-story">
        <h2>Our Story</h2>
        <p>
          Founded in 2024, Padhu’s Alterations began as a small local workshop
          in Cumming, GA. What started as a passion for precision tailoring has
          grown into a trusted brand known for quality craftsmanship, attention
          to detail, and personalized service.
        </p>
      </section>
    </div>
  );
}
