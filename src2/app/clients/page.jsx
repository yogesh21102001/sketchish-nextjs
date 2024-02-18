import Image from "next/image";

import { images } from "@/assets/images";
import {
  FooterSection,
  MainSection,
} from "@/sections";
import { clients } from "./data";

import Styles from './style.module.css'

export const metadata = {
  title: 'Clients',
  description: 'Clients',
}

const Clients = () => {

  return (
    <>
      <MainSection
        animation={false}
        color="black"
        heading={"Together, we shine"}
        para={"Proud to work with strong, ambitious and dynamic\nbusinesses and brands over the years."}
      />

      <div className={Styles.clients_container}>
        <div className={Styles.clients}>
          {clients.map((client, index) => (
            <div key={`${client}-${index}`} className={Styles.client_container}>
              <Image alt={`${client} logo`} src={images[client]} className={Styles.client} />
            </div>
          ))}
        </div>
      </div>
      <FooterSection background={"white"}/>
    </>
  );
};

export default Clients;
