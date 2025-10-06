import React from 'react';
import './About.css';
import Footer from './Footer'
import image from '../assets/movies-image.png'

export default function About() {
  return (
    <div className="about-page">
      
      <section className="about-hero">
        <div className="about-container">
          
          <div className="about-content">
            <div className="about-image">
              <img 
                src={image} 
                alt="Cinema" 
              />
            </div>

            <div className="about-text">
              <h2>About Us</h2>
              
              <p className="main-text">
                <span className="brand">Visti Movies</span> — an interactive, easy-to-use, and modern movie platform. Our goal is to give every viewer a smooth, engaging, and enjoyable experience.
              </p>

              <p className="sub-text">
                Discover new releases, trailers, and your favorite genres all in one place. Visti Movies is where watching turns into feeling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-features">
        <div className="about-container">
          
          <h2 className="features-title">
            Why Choose <span className="highlight">Visti Movies?</span>
          </h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎬</div>
              <p>Thousands of Movies</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <p>For Free</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <p>One Click Start</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">▶️</div>
              <p>Easy to Use</p>
            </div>
          </div>
        </div>
      </section>

      <Footer/>  
    </div>

  );
}