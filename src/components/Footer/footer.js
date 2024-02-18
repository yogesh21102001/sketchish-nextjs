import React from "react";
import "./style.css";
import { OSWhite } from "../../assets/svg";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <nav className="nav-section">
          <div>
            <OSWhite className="os-white-svg" />
          </div>
          <div>
            <div className="nav-link-con">
              <Link className="nav-link" to="/privacypolicy">
                Privacy Policy
              </Link>
              <Link className="nav-link" to="/termsandconditions">
                Terms of Use
              </Link>
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
              <HashLink className="nav-link" to="/pricing#faqs">
                FAQs
              </HashLink>
              <Link className="nav-link" to="/contactus">
                Contact Us
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
}
