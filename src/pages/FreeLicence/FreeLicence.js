import React from 'react'

import { LandingPageHeader } from "../LandingPage/LandingPageHeader"
import LandingPageFooter from "../LandingPage/LandingPageFooter"
import InfoContainer from './InfoContainer/InfoContainer'
import Button from '../../ui/Button/Button'

import './styles.scss'
import Footer from '../../components/Footer-v2/Footer'
import NavBar from '../../components/NavBar/NavBar'

export const FreeLicence = () => {

  return (
    <>
      <NavBar />
      <div className='free-licence'>
        <div className='free-licence__title_container'>
          <span className='free-licence__title'>
            USE OUR ASSETS FOR FREE, <br />
            BUT LINK TO OPENSTROKE ICONS
          </span>
        </div>

        <div className='free-licence__block'>
          <InfoContainer
            title="The open-source assets"
            text="Our library includes Public license, Creative Commons 4.0 licenses. We hope this will help you to design beautiful products. We have mentioned if an icon is licensed under CC by 4.0 in the description."
            blocks={[
              {
                name: "royalty-free",
                title: "ROYALTY-FREE",
                text: "Limited downloads under basic plan. Attribution will be required.",
              },
              {
                name: "creative-common",
                title: "CREATIVE COMMON 4.0",
                text: "Use assets under this licence but link to openstroke.io",
              },
              {
                name: "public",
                title: "PUBLIC",
                text: "Use it anywhere, even no attribution. It will be kind to mentioned.",
              },
            ]}
          />

          <InfoContainer
            title="Back link license for free assets"
            text="This license allows you to use our free PNG or SVG icons commercial use, for yourself, or on behalf of a client."
            blocks={[
              {
                name: "low-res",
                title: "LOW-RES PNG",
                text: "All our icons and illustrations are free to download and use straight away as low-resolution PNG files.",
              },
              {
                name: "vector-for-free",
                title: "VECTOR FOR FREE",
                text: "We have assets in vector format available for free to download under public license.",
              },
              {
                name: "usage",
                title: "USAGE",
                text: "Use our assets for free in your projects, even in commercial works. We are just asking for a bank link to OpenStroke.io.",
              },
            ]}
            wide={true}
          />

          <InfoContainer
            title="How to Attribute?"
            text="Learn how to attribute to openstroke.io"
            blocks={[
              {
                name: "website-or-web-apps",
                title: "WEBSITE OR WEB APPS",
                text: "Add a link to OpenStroke.io on all pages using our content. If that's most pages, a link in your footer is fine.",
              },
              {
                name: "desktop-apps",
                title: "DESKTOP APPS",
                text: "macOS and Windows applications should have the link to OpenStroke.io in the about section.",
              },
              {
                name: "mobile-apps",
                title: "MOBILE APPS",
                text: "For smartphone apps, please add a link to OpenStroke.io in the about section or settings.",
              },
            ]}
          />

          <InfoContainer
            title=""
            text=""
            blocks={[
              {
                name: "social-media",
                title: "SOCIAL MEDIA",
                text: "Add the attribution link on the text description of the image.",
              },
              {
                name: "print-media",
                title: "PRINT MEDIA",
                text: "Add the link anywhere in the document.",
              },
            ]}
            wide={true}
          />

          <div className='free-licence__separator' />

          <div className='free-licence__prohibition'>
            <span className='free-licence__prohibition_title'>
              You can’t
            </span>

            <span className='free-licence__prohibition_text'>
              You cannot use our icons in an application as assets available for users. For example, you cannot use them in a webpage builder, or a 'Canva style' app that allows users to integrate our icons or illustrations in a design/document. You can’t use icons as logos, in templates, website builder etc.
            </span>
          </div>

          <div className='free-licence__question'>
            <span className='free-licence__question_text'>
              Your questions not listed above?
            </span>

            <Button
              style='unfilled-dark'
              text='Send a Message'
            />
          </div>
        </div>
        <Footer/>
      </div>
    </>
  )
}