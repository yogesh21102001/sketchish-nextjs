import { Button, SectionHeader } from "@/components";
import CommonStyles from "@/utils/commonStyles.module.css";
import Image from "next/image";
import Styles from "./style.module.css";

const WorkCard = ({name, description}) => {
  return (
    <div className={Styles.work_card}>
      <h3>{name}</h3>
      <p>
        {description}
      </p>
    </div>
  );
};

const ShowCaseCard = ({name, work, image}) => {
  return (
    <div className={Styles.showcase_card}>
      <div className={Styles.img_cont}>
        <Image alt='show case card' className={Styles.img} src={image}/>
      </div>
      <div>
        <p className={Styles.name}>{name}</p>
        <p className={Styles.work}>
          {work}
        </p>
      </div>
    </div>
  );
};

const ServicesPageSection = ({data, id}) => { 

  return (
    <section className={Styles.sec_cont} id={id}>
      <div
        className={`${Styles.header} ${Styles.section} ${CommonStyles.body_padding}`}
      >
        <div className={Styles.cont}>
          <div className={Styles.lft}>
            <SectionHeader
              color={"white"}
              heading={data?.serviceName}
              width={"100%"}
              textAlign="left"
              alignItems="flex-start"
            />
          </div>
          <p>{data?.description}</p>
        </div>
      </div>
      <div className={Styles.showcase}>
        <div className={Styles.slide}>
          {data?.showCase.map((item, index) => (
            <ShowCaseCard
              image={item.image}
              name={item.name}
              work={item.work}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className={`${Styles.section} ${CommonStyles.body_padding}`}>
        <div className={`${Styles.cont} ${Styles.tool_use}`}>
          <div className={Styles.lft}>
          <SectionHeader
            color={"white"}
            heading={"What we do"}
            width={"100%"}
            textAlign="left"
            alignItems="flex-start"
          />
          </div>
          <div className={Styles.rgt}>
            <div className={Styles.tech_card_cont}>
              {data?.techAndToolsUsed.map((item, index) => (
                <div key={index} className={Styles.tech_card}>
                  <div className={Styles.tech_logo}>
                    <Image alt={`${item.logo} logo`} className={Styles.img} src={item.logo} />
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`${CommonStyles.body_padding}`}>
        <div className={` ${Styles.work_card_cont}`}>
          {data?.workOnService.map((item, index) => (
            <WorkCard
              description={item.description}
              name={item.name}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className={`${Styles.section} ${CommonStyles.body_padding}`}>
        <div className={`${Styles.cont} ${Styles.bottom_sec}`}>
           <div className={Styles.lft}>
           <SectionHeader
            color={"white"}
            heading={"Talk to us to"}
            gradient={"get insights from our brain"}
            width={"100%"}
            textAlign="left"
            alignItems="flex-start"
          />
           </div>
          <div className={Styles.btn_cont}>
            <Button
              width={"40%"}
              margin={0}
              color={"#F7D56E"}
              border={"2px solid #F7D56E"}
            >
              get free quote
            </Button>
            <Button
              width={"50%"}
              margin={0}
              background={"#F7D56E"}
              border={"2px solid #F7D56E"}
              color={"#000000"}
            >
              {data?.btntxt}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPageSection;
