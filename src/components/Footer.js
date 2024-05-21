import React from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'

import "./Footer.css"

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Follow the Degen Premier League on all socials
        </p>
        <p className="footer-subscription-text">
          Catch all of the latest results and transfer news
        </p>
        <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="footer-input"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About</h2>
            <Link to="/">What we do</Link>
            <Link to="/">Partners</Link>
            <Link to="/">Legal</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Media</Link>
          </div>
          <div className="footer-link-items">
            <h2>Social Media</h2>
            <Link to="/">TikTok</Link>
            <Link to="/">Youtube</Link>
            <Link to="/">Instagram</Link>
            <Link to="/">Twitter</Link>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              DPL <i className="fa-regular fa-futbol"></i>
            </Link>
          </div>
          <small className="website-rights">Degen Premier League © 2024</small>
          <div className="social-icons">
            <Link
              className="social-icon-link tiktok"
              to="/"
              target="blank"
              aria-label="TikTok"
            >
              <i className="fab fa-tiktok" />
            </Link>
            <Link
              className="social-icon-link youtube"
              to="/"
              target="blank"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube" />
            </Link>
            <Link
              className="social-icon-link instagram"
              to="/"
              target="blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="blank"
              aria-label="Twitter"
            >
              <i className="fab fa-x-twitter" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer