import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'

import FeaturesComparison from './FeaturesComparison/FeaturesComparison.jsx'
import Partners from './Partners/Partners.jsx'
import Questions from './Questions/Questions.jsx'

// import { PricingSection, PluginSection, ReviewsSection } from '../landingPage-v2/OnPageComponents'
import PluginSection from '../landingPage-v2/OnPageComponents/PluginSection/PluginSection.jsx'
import PricingSection from '../landingPage-v2/OnPageComponents/PricingSection/PricingSection.jsx'

import Footer from '../../components/Footer-v2/Footer.jsx'
import './styles.scss'
import NavBar from '../../components/NavBar/NavBar.jsx'

export const Pricing = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  useEffect(()=>{
    scrollTop()
  },[])

  const windowWidth = useRef(window.innerWidth)

  return (
    <div className="main">
      <Helmet>
        <meta
          name="description"
          content={
            "Access pro plan worth of $15 for free. Access 90,000+ svg icons in 20+ styles and download. Join openstrokeicons now."
          }
        />
        <title>{`Pricing | Openstrokeicons.com`}</title>
        <meta
          property="og:title"
          content={"Pricing | Unlock pro plan for free"}
        />
        <meta property="og:image" content={`./assets/pricing-rich-image.png`} />
      </Helmet>
      <NavBar />
      <PricingSection
        heading={"Join one icon library to replace all"}
        message={
          "90,000+ icons, 20+ unique styles, animated svg, advance editor, and more."
        }
        headingFont={windowWidth.current <= 600 ? "" : "2.625rem"}
        headingMargin={windowWidth.current <= 600 ? "" : "0 0 4rem 0"}
        from={"pricing"}
      />
      <FeaturesComparison />
      <PluginSection />
      {/* <ReviewsSection /> */}
      <div id="faqs">
        <Questions />
      </div>
      <Partners />
      <Footer />
    </div>
  );
}