"use client";

import { React, useEffect, useRef, useState } from "react";
import Styles from "./style.module.css";
import CommonStyles from "../../utils/commonStyles.module.css";
import { svg } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { Button } from "..";
import CalendlyEmbed from "../CalendlyEmbed/CalendlyEmbed";

const NavBar = () => {
  const currentRoute = usePathname();

  const [menuOpen, setMenu] = useState(false)

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className={`${Styles.nav_cont} ${CommonStyles.body_padding}`} ref={dropdownRef} >
      <div className={Styles.wraper}>
        <Link href={"/"} className={Styles.lft}>
          <Image alt='Brand Logo' src={svg.BrandLogo} width={164.545} height={25} />
        </Link>
        <div className={`${Styles.rgt} ${Styles.responsive_menu}`} style={{
          right: menuOpen ? "0" : "-100%",
          transition: "all .3s"
        }}>
          <ul className={Styles.links_cont}>
            <li>
              <Link
                href={"/about-us"}
                className={currentRoute == "/about-us/" ? Styles.linkActive : ""}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href={"/services"}
                className={currentRoute == "/services/" ? Styles.linkActive : ""}
              >
                services
              </Link>
            </li>
            <li>
              <Link
                href={"/case-studies"}
                className={
                  currentRoute.includes("/case-studies/") ? Styles.linkActive : ''
                }
              >
                Case Studies
              </Link>
            </li>
            <li>
              <Link
                href={"/blogs"}
                className={currentRoute == "/blogs/" ? Styles.linkActive : ''}
              >
                Blogs
              </Link>
            </li>
          </ul>

          <CalendlyEmbed animate={true} text="LET'S TALK" />

          <div onClick={() => setMenu(!menuOpen)} className={Styles.close_icon}>
            <Image alt='Close' src={svg.CloseIcon} />
          </div>
          
        </div>
        <div onClick={() => setMenu(!menuOpen)} className={Styles.menu_cont}>
          <Image alt='Menu' src={svg.MenuIcon} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
