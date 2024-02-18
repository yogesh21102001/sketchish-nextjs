import React from "react";
import "./style.css";
import { OSSVG } from "../../assets/svg";
import { HeartSVG, LogosBrandSVG, StripeSVG } from "../../assets/ossvg";

export function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <nav className="nav-section">
          <div className="nav-section-body">
            <div>
              <OSSVG />
              <p className="footer-list">Designing icons since 2009</p>
            </div>
            <div>
              <p className="footer-text">Secure payment with</p>
              <StripeSVG />
            </div>
          </div>
          <div className="footer-features">
            <h5 className="footer-heading">Features</h5>
            <ui className="footer-list">
              <li>Instant Search</li>
              <li>OpenStroke</li>
              <li>BrokenStroke</li>
              <li>Variants & Options</li>
              <li>Set on Brand</li>
              <li>Custom Stroke</li>
              <li>Resize & Responsive</li>
              <li>File formats</li>
            </ui>
          </div>
          <div className="footer-features">
            <h5 className="footer-heading">Top Categories</h5>
            <ui className="footer-list">
              <li>General</li>
              <li>Technology</li>
              <li>Finance</li>
              <li>Photography</li>
              <li>Interface</li>
              <li>eCommerce</li>
              <li>Business</li>
              <li>Brand Logos</li>
            </ui>
          </div>
          <div className="footer-features">
            <h5 className="footer-heading">Support</h5>
            <ui className="footer-list">
              <li>Instant Search</li>
              <li>OpenStroke</li>
              <li>BrokenStroke</li>
              <li>Variants & Options</li>
              <li>Set on Brand</li>
              <li>Custom Stroke</li>
              <li>Resize & Responsive</li>
              <li>File formats</li>
            </ui>
          </div>
        </nav>
        <div className="line-footer"></div>
        <div className="footer-end">
          <p className="footer-text">© 2023 Sketchish Designer Llp</p>
          <p className="footer-list ">
            Made with <HeartSVG /> in India.
          </p>
          <p className="svg-icon">
            <LogosBrandSVG />
            Dribbble
          </p>
        </div>
      </div>
    </footer>
  );
}
