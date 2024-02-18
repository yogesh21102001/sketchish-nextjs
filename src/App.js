// import "./App.css";
/* global google */
import { loadGapiInsideDOM } from "gapi-script";
import jwt_decode from 'jwt-decode';
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import AuthContext from "./context/AuthProvider";
import { isAuthenticated, isEmpty, isTokenExpired } from "./utils/helpers";

import useRootAuth from "./hooks/common/useRootAuth";
import {
  AddProduct,
  AddProductIcon,
  AdminSettings,
  CategoryResult,
  ContactUs,
  CustomersList,
  FigmaSuccess,
  FreeLicence,
  IconDetails,
  IconSearchResult,
  Invoice,
  KeyWords,
  LandingPageFeatures,
  LandingPageFreebies,
  LandingPageRequest,
  LandingPageStory,
  LandingPageUseCase,
  LandingPageV2,
  LandingPageblog,
  NoPage,
  Pricing,
  PrivacyPolicy,
  ProductList,
  Profile,
  ReportDetail,
  ReportList,
  ReviewIcons,
  StyleSet,
  Terms,
  UserLogin,
  Bucket,
  ProfileNew
} from "./pages";

import "react-global-modal/dist/style.css";
import 'react-tooltip/dist/react-tooltip.css';
import './App.css';
import BlogList from "./pages/Admin/Blog/BlogList";
import AddBlog from "./pages/Admin/Blog/AddBlog";
import BlogDetail from "./pages/Admin/Blog/BlogDetail";

function App() {
  const [, setShowHeader] = useState(true);
  const { setSocialLogin, getUserLimit } = useRootAuth();

  const { auth, setAuth } = useContext(AuthContext);

  useEffect((_) => {
    const handleScroll = (_) => {
      if (window.pageYOffset > 0) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return (_) => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    (async () => {
      await loadGapiInsideDOM();
    })();
  });
  const onTapSignIn = response => {
    const decode = jwt_decode(response.credential)
    if (decode?.email) {
      setSocialLogin({
        userEmail: decode?.email,
        userFirstName: decode?.given_name,
        userLastName: decode?.family_name,
        userPhoto: decode?.picture,
      });
    }
  }
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (isTokenExpired()) {
      localStorage.clear()
      setAuth({})
    }
    if (isAuthenticated()){
      getUserLimit();
    }
    const newUrl = window.location.href;
    setUrl(newUrl);
  }, []);

  useEffect(() => {
    if (isEmpty(localStorage.getItem("user"))) {
      window.onload = function () {
        google?.accounts?.id?.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: onTapSignIn
        })
        google?.accounts.id.prompt(notification => {
          console.log('on prompt notification', notification);
        })
      };
    }
  }, []);
  
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta property="og:url" content={url} />
        <meta property="twitter:url" content={url} />
        <link rel="canonical" href={url} />
      </Helmet>
      <Tooltip id="stroke" />
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPageV2 />} />
          <Route path="/icons/dictionary" element={<KeyWords />} />
          <Route path="/icons/dictionary/:search" element={<IconSearchResult />} />
          {/* ------------------------------Redirect---------------------------------- */}
          <Route path="/accountvrfi/:hash" element={<LandingPageV2 />} />
          <Route path="/emailinvite/:hash" element={<LandingPageV2 />} />
          <Route path="/accountresetpass/:hash" element={<LandingPageV2 />} />
          <Route path="/emailupdate/:hash" element={<LandingPageV2 />} />
          <Route path="/pricing/failure" element={<Pricing />} />
          <Route path="/figma/success" element={<FigmaSuccess />} />

          {/* ------------------------------User---------------------------------- */}
          <Route path="/signin" element={<UserLogin />} />
          <Route path="/profile" element={<ProfileNew />} />
          <Route path="/icons" element={<IconSearchResult />} />
          <Route path="/bucket" element={<Bucket/>} />
          <Route path="/icons/:icon" element={<IconDetails />} />
          <Route path="/category/:search" element={<CategoryResult />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/free-licence" element={<FreeLicence />} />

          {/* ------------------------------Admin---------------------------------- */}
          <Route path="/admin" element={<UserLogin />} />
          <Route path="/admin/customers" element={<CustomersList />} />
          <Route path="/admin/icons" element={<ProductList />} />
          <Route path="/admin/reviewicons" element={<ReviewIcons />} />
          <Route path="/admin/report" element={<ReportList />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/blogs" element={<BlogList />} />
          <Route path="/admin/sketchish-blog" element={<AddBlog />} />
          <Route path="/admin/blog-edit/:blogId" element={<BlogDetail />} />
          <Route path="/admin/reportDetails" element={<ReportDetail />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/addProductIcon" element={<AddProductIcon />} />

          {/* ------------------------------Landing---------------------------------- */}
          <Route path="/style-set" element={<StyleSet />} />
          <Route path="/request-icons" element={<LandingPageRequest />} />
          <Route path="/use-cases" element={<LandingPageUseCase />} />
          <Route path="/story" element={<LandingPageStory />} />
          <Route path="/blog" element={<LandingPageblog />} />
          <Route path="/features" element={<LandingPageFeatures />} />
          <Route path="/freebies" element={<LandingPageFreebies />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandconditions" element={<Terms />} />
          <Route path="/404" element={<NoPage />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;