import featureheroimg from "./assets/images/feature-hero-img.svg";
import colorine from "./assets/images/color-line.svg";
import invisionIcon from "./assets/images/invisionIcon.svg";
import mediumIcon from "./assets/images/mediumIcon.svg";
import notionIcon from "./assets/images/notionIcon.svg";
import zoomIcon from "./assets/images/zoomIcon.svg";
import slackIcon from "./assets/images/slackIcon.svg";
import anyDeskIcon from "./assets/images/anyDeskIcon.svg";
import instantSeach from "./assets/images/instantSeach.svg";
import openStroke from "./assets/images/openStroke.svg";
import openStokeBig from "./assets/images/openStokeBig.svg";
import brokenStrokBig from "./assets/images/brokenStrokBig.svg";
import brokenStroke from "./assets/images/brokenStroke.svg";
import variants from "./assets/images/variants.svg";
import variantsBig from "./assets/images/variantsBig.svg";
import customStoke from "./assets/images/customStoke.svg";
import customStokeBig from "./assets/images/customStokeBig.svg";
import resize from "./assets/images/resize.svg";
import resizeBig from "./assets/images/resizeBig.svg";
import file from "./assets/images/file.svg";
import filesBig from "./assets/images/filesBig.svg";
import { HashScroll } from "react-hash-scroll";
import setonbrand from "./assets/images/setonbrand.svg";
import setonbrandBig from "./assets/images/setonbrandBig.svg";
import instantSearch from "./assets/images/instantSearch.png";
import { isAuthenticated } from "../../utils/helpers";
import "./css/landingpagestyle.css";
import "./css/responsive.css";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import LandingPageFooter from "./LandingPageFooter";
import Aos from "aos";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import { VerifyMail, Login, ForgotPassword } from "../../components/AUTH";
import { Helmet } from "react-helmet";

export function LandingPageFeatures() {
  Aos.init({ duration: 1000 });
  const navigate = useNavigate()
  const [menuOpenState, setMenuOpenState] = useState(true);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const openModalVerifyMail = async () => {
    if (isAuthenticated()) {
      navigate('/icons')
    } else {
      setIsVerifyOpen(true);
    }
  }
  const [, setVerifyMailOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotPassword, setForgotPassword] = useState(false);
  const [, setExistingEmail] = useState("");
  const [mobileMenuOpenState, setMobileMenuOpenState] = useState(true);
  return (
    <div
      className="featurPage-root"
      onClick={(e) => {
        // eslint-disable-next-line no-var
        var container = document.getElementById("header");
        var container2 = document.getElementById("mobile-header");
        if (!container?.contains(e.target)) {
          setMenuOpenState(false);
        }
        if (!container2?.contains(e.target)) {
          setMobileMenuOpenState(false);
        }
      }}
    >
      <Helmet>
        <meta name="description" content="Customizable design assets such as Icons for tools and software such as Figma, Canva, Adobe XD & more!" />
        <title>Unsplash your ideas with our advance tools and assets</title>
      </Helmet>
      <div className="feature-header">
        <div className="landingPage-Container">
          <LandingPageHeader
            menuOpenState={menuOpenState}
            setMenuOpenState={setMenuOpenState}
            mobileMenuOpenState={mobileMenuOpenState}
            setMobileMenuOpenState={setMobileMenuOpenState}
          />
        </div>
      </div>
      <div className="colior-line">
        <img src={colorine} alt="Bluroverlay" />
      </div>
      <div
        className="feature-hero-section"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className="landingPage-Container">
          <div className="feature-hero-title">
            <h1>Reliable design tool</h1>
            <p>
              A reliable and robust design tool can be a game-changer when it
              comes to creating impactful and compelling visual design.
            </p>
            <a href="#" onClick={openModalVerifyMail}>
              Get started for free
            </a>
          </div>
          <div className="feature-hero-img">
            <img src={featureheroimg} alt={featureheroimg} />
          </div>
          {/* <div className="feature-good-company">
            <div className="feature-good-company-grid">
              <div className="fature-grid-inner">
                <img src={Atlassian} alt="Atlassian" />
              </div>
              <div className="fature-grid-inner">
                <img src={Intel} alt="Atlassian" />
              </div>
              <div className="fature-grid-inner">
                <img src={Redhat} alt="Atlassian" />
              </div>
              <div className="fature-grid-inner">
                <img src={Uber} alt="Atlassian" />
              </div>
              <div className="fature-grid-inner">
                <img src={groupon} alt="Atlassian" />
              </div>
              <div className="fature-grid-inner">
                <img src={Airbnb} alt="Atlassian" />
              </div>
              <div className="fature-grid-inner">
                <img src={Vonage} alt="Atlassian" />
              </div>
            </div>
          </div> */}
          <div className="company-overview-section">
            <div className="landingPage-Container">
              <div className="company-overview-inner">
                <p>Trusted by businesses and professionals</p>
                <div className="company-overview-grid">
                  <div className="brands-item-img">
                    <img src={invisionIcon} alt="brands-logo" />
                  </div>
                  <div className="brands-item-img">
                    <img src={mediumIcon} alt="brands-logo" />
                  </div>
                  <div className="brands-item-img">
                    <img src={notionIcon} alt="brands-logo" />
                  </div>
                  <div className="brands-item-img">
                    <img src={slackIcon} alt="brands-logo" />
                  </div>
                  <div className="brands-item-img">
                    <img src={zoomIcon} alt="brands-logo" />
                  </div>
                  <div className="brands-item-img">
                    <img src={anyDeskIcon} alt="brands-logo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HashScroll hash="#InstantSearch">
        <div
          className="instant-search-section"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <div className="instant-search-inner">
            <div className="instant-search-grid inner-container2">
              <div className="instant-grid-left">
                <img src={instantSearch} alt="instatntSeach" />
              </div>
              <div className="instant-grid-right">
                <div className="instant-grid-inner">
                  <img src={instantSeach} alt="instantSeach" />
                  <h2>Instant Search</h2>
                  <p>
                    Find what you're looking for as you type and discover
                    relevant results too without exploring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HashScroll>
      <HashScroll hash="#openStroke">
        <div
          id="section2"
          className="opemstorke-section"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <div className="openstroke-grid inner-container2">
            <div className="openstroke-left">
              <img src={openStroke} alt="openStroke" />
              <h2>OpenStroke</h2>
              <p>
                OpenStroke icons allow you to change the thickness of the stroke
                that makes up an icon. You have greater control over the
                appearance of your icons.
              </p>
            </div>
            <div className="openStroke-right">
              <img src={openStokeBig} alt="openStokeBig" />
            </div>
          </div>
        </div>
      </HashScroll>
      <HashScroll hash="#BrokenStroke">
        <div
          id="section3"
          className="brokenStroke-section"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <div className="brokenstroke-grid inner-container2">
            <div className="brokenstroke-left">
              <img src={brokenStrokBig} alt="brokenStrokBig" />
            </div>
            <div className="brokenstroke-right">
              <img src={brokenStroke} alt="brokern" />
              <h2>BrokenStroke</h2>
              <p>
                BrokenStroke is basically a converted stroke to outline icon
                feature. BrokenStroke feature makes it easy to create a
                consistent look and feel throughout your designs, and ensures
                that your icons will look great no matter where they're used.
              </p>
            </div>
          </div>
        </div>
      </HashScroll>
      <HashScroll hash="#VariantsOptions">
        <div
          className="variants-section"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <div className="variants-grid inner-container2">
            <div className="variants-grid-left">
              <img src={variants} alt="variants" />
              <h2>Variants & Options</h2>
              <p>
                We offer multiple styles of each icon, including OpenStroke,
                duel, mono and filled versions.
              </p>
            </div>
            <div className="variants-grid-right">
              <img src={variantsBig} alt="bariantsbigf" />
            </div>
          </div>
        </div>
      </HashScroll>
      <HashScroll hash="#SetonBrand">
        <div
          className="set-on-brand-section"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <div className="set-on-brand-grid inner-container2">
            <div className="set-on-brand-left">
              <img src={setonbrandBig} alt="setonbrand" />
            </div>
            <div className="set-on-brand-right">
              <img src={setonbrand} alt="setonbrand" />
              <h2>Set On Brand</h2>
              <p>
                Set color preference to match your branding to get your design
                aesthetic. When you're working with icons that are part of a
                larger design system, as it allows you to maintain visual
                consistency and one brand voice too.
              </p>
            </div>
          </div>
        </div>
      </HashScroll>
      <HashScroll hash="#CustomStroke">
        <div
          id="section6"
          className="custom-stroke-section"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <div className="custom-stroke-grid inner-container2">
            <div className="custom-stroke-left">
              <img src={customStoke} alt="customStoke" />
              <h2>Custom Stroke</h2>
              <p>
                By adjusting the stroke size of an icon, you can make it stand
                out more or blend in with other design elements on your website
                or application.
              </p>
            </div>
            <div className="custom-stroke-right">
              <img src={customStokeBig} alt="abc" />
            </div>
          </div>
        </div>
      </HashScroll>
      <HashScroll hash="#ResizeResponsive">
        <div
          id="section7"
          className="resize-responsive-section"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <div className="resize-responsive-grid inner-container2">
            <div className="resize-responsive-left">
              <img src={resizeBig} alt="resize" />
            </div>
            <div className="resize-responsive-right">
              <img src={resize} alt="resize" />
              <h2>Resize & Responsive</h2>
              <p>
                Our icons are designed to be resizable and responsive, allowing
                you to use them at any size without compromising their quality
                or functionality. With our resizable and responsive icons, you
                can be sure that your design will look great no matter where
                it's viewed. Whether you need to scale an icon up for a
                billboard or down for a mobile device, our icons will always
                look crisp and clear.
              </p>
            </div>
          </div>
        </div>
      </HashScroll>
      <HashScroll hash="#FileFormats">
        <div
          id="section8"
          className="files-section"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <div className="files-grid inner-container2">
            <div className="files-left">
              <img src={file} alt="file" />
              <h2>SVG, PNG, PDF files available</h2>
              <p>
                The key is to emphasize the flexibility and convenience of being
                able to export icons in the format that works best for your
                design tool of choice.
              </p>
            </div>
            <div className="files-right">
              <img src={filesBig} alt="fielsbiig" />
            </div>
          </div>
        </div>
      </HashScroll>
      <ResponsiveModal
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
        closeOnOverlayClick={false}
        component={
          <VerifyMail
            setOpen={setIsVerifyOpen}
            setVerifyMailOpen={setVerifyMailOpen}
            setLoginOpen={setIsLoginOpen}
            setExistingEmail={setExistingEmail}
          />
        }
      />
      <ResponsiveModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        closeOnOverlayClick={false}
        component={
          <Login
            setOpen={setIsLoginOpen}
            ForgotPassword={setForgotPassword}
            CreateAccount={setIsVerifyOpen}
          />
        }
      />
      <ResponsiveModal
        isOpen={isForgotPassword}
        onClose={() => setForgotPassword(false)}
        closeOnOverlayClick={false}
        component={
          <ForgotPassword
            setOpen={setForgotPassword}
            setVerifyMailOpen={setVerifyMailOpen}
            setIsLoginOpen={setIsLoginOpen}
          />
        }
      />
    </div>
  );
}
