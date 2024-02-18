import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import OutsideClickHandler from 'react-outside-click-handler'

import loupe from './pictures/loupe.svg'
import logo from './pictures/logo.svg'
import close from './pictures/close.svg'
import menu from './pictures/menu.svg'

import './styles.scss'

import { user as blankingUser, emptyUser, i18next } from '../../../blanking-plug'

const Header = () => {
  const [showDropDown, setShowDropDown] = useState(false)
  const user = blankingUser || emptyUser
  return (
    <div className='header extended-container'>
      <div className='header__section'>
        <Link to='' className='header__icons'>
          <img alt='loupe' src={loupe} className='header__loupe' />
          <span>
            ICONS
          </span>
        </Link>

        <Link to='' className='header__link'>
          STYLES
        </Link>
      </div>

      <img alt='logo' src={logo} />

      <div className='header__section header__left-section'>
        {!user.name && (
          <Link to='' className='header__link'>
            PRICING
          </Link>
        )}

        <Link to='' className='header__link'>
          LOGIN
        </Link>

        {user.name && (
          <>
            <Link to='' className='header__link'>
              {i18next.header.plan[user.plan]}
            </Link>

            <Link to='profile' className='header__user-name_container header__link'>
              {user.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')}
            </Link>
          </>
        )}

        <img
          alt={showDropDown ? 'close' : 'menu'}
          src={showDropDown ? close : menu}
          onClick={() => setShowDropDown(!showDropDown)}
          className='header__drop-down-menu_button'
        />

        {showDropDown && (
          <div className='header__drop-down-menu_block'>
            <OutsideClickHandler onOutsideClick={() => setTimeout(() => setShowDropDown(false), 100)}>
              <div className='header__drop-down-menu'>
                <div className='header__drop-down-menu_container'>
                  <Link to=''>
                    ICONS
                  </Link>
                  <Link to=''>
                    STYLES
                  </Link>
                  <Link to=''>
                    PRICING
                  </Link>
                  <Link to=''>
                    FIGMA PLUGIN
                  </Link>
                </div>

                <div className='header__drop-down-menu_separator' />

                <div className='header__drop-down-menu_container'>
                  <Link to=''>
                    FREE LICENCE
                  </Link>
                  <Link to=''>
                    PREMIUM LICENCE
                  </Link>
                  <Link to=''>
                    ICON REQUEST
                  </Link>
                  <Link to=''>
                    CONTACT US
                  </Link>
                </div>
              </div>
            </OutsideClickHandler>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header