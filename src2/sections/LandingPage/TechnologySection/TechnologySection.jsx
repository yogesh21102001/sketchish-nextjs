import React from "react";
import Styles from "./style.module.css";
import { SectionHeader } from "@/components";
import { images } from "@/assets/images";
import Image from "next/image";
import ServicesBlog from "@/app/services/digital-product-design/ServicesBlog/ServicesBlog";
import { FooterSection } from "@/sections";

const TechnologySection = () => {
  const data = [
    {
      category: "Cloud",
      techs: [
        {
          logo: images.google_cloud,
          name: "Google Cloud",
        },
        {
          logo: images.AWS,
          name: "AWS",
        },
        {
          logo: images.azure,
          name: "Azure",
        },
        {
          logo: images.digitalocean,
          name: "DigitalOcean",
        },
        {
          logo: images.docker,
          name: "Docker",
        },
      ],
    },
    {
      category: "Databases",
      techs: [
        {
          logo: images.mysql,
          name: "MySQL",
        },
        {
          logo: images.microsoftSQL,
          name: "Microsoft SQL Server",
        },
        {
          logo: images.postgreSQL,
          name: "PostgreSQL",
        },
        {
          logo: images.oracle,
          name: "Oracle",
        },
        {
          logo: images.google_firebase,
          name: "Google Firebase",
        },
        {
          logo: images.mongoDB,
          name: "MongoDB",
        },
        {
          logo: images.redis,
          name: "Redis",
        },
        {
          logo: images.elasticSearch,
          name: "ElasticSearch",
        },
        {
          logo: images.cassandra,
          name: "Cassandra",
        },
        {
          logo: images.couchbase,
          name: "Couchbase",
        },
      ],
    },
    {
      category: "Backend",
      techs: [
        {
          logo: images.nodejs,
          name: "Node.js",
        },
        {
          logo: images.dot_net,
          name: ".Net Core",
        },
        {
          logo: images.python,
          name: "Python",
        },
        {
          logo: images.java,
          name: "Java",
        },
        {
          logo: images.asp_net,
          name: "Microsoft .net",
        },
        {
          logo: images.php,
          name: "PHP",
        },
      ],
    },
    {
      category: "Frontend",
      techs: [
        {
          logo: images.angular,
          name: "Angular.js",
        },
        {
          logo: images.react,
          name: "React.js",
        },
        {
          logo: images.react_native,
          name: "React Native",
        },
        {
          logo: images.typescript,
          name: "Typescript",
        },
        {
          logo: images.javascript,
          name: "Javascript",
        },
        {
          logo: images.swift,
          name: "Swift",
        },
        {
          logo: images.kotlin,
          name: "Kotlin",
        },
      ],
    },
    {
      category: "Design",
      techs: [
        {
          logo: images.figma,
          name: "Figma",
        },
        {
          logo: images.adobe_creative_cloud,
          name: "Adobe Creative Cloud",
        },
        {
          logo: images.sketch,
          name: "Sketch app",
        },
        {
          logo: images.balsamiq,
          name: "Balsamiq",
        },
        {
          logo: images.miro,
          name: "Miro",
        },
      ],
    },
  ];

  return (
   <>
    <section className={Styles.sec_cont}>
      <div className={Styles.wraper}>
        <SectionHeader
          heading={"We are tech team "}
          para={
            "Transformative solutions forging tomorrow, Led by our expert and dedicated tech team"
          }
          color={"black"}
        />
        <div className={Styles.tech_cont}>
          {data.map((item, index) => (
            <div className={Styles.tech_category} key={index}>
              <div className={Styles.divider}>
                <p>{item.category}</p>
                <div className={Styles.line}></div>
              </div>
              <div className={Styles.tech_card_cont}>
                {item.techs.map((tech, i) => (
                  <div className={Styles.tech_card} key={i}>
                    <div className={Styles.tech_logo}>
                        <Image alt={`${tech.logo} logo`} className={Styles.img} src={tech.logo}/>
                    </div>
                    <p>{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    {/* <ServicesBlog/> */}
    {/* <FooterSection background="#F7EDCF" /> */}
   </>
  );
};

export default TechnologySection;
