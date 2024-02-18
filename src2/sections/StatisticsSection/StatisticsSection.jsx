import { Button, SectionHeader, Statistic } from "@/components";
import CalendlyEmbed from "@/components/CalendlyEmbed/CalendlyEmbed";
import CommonStyles from "@/utils/commonStyles.module.css";
import Styles from "./style.module.css";

const StatisticsSection = () => {
  return (
    <section className={`${Styles.section_cont} ${CommonStyles.body_padding}`}>
      <div className={Styles.header_cont}>
        <SectionHeader
          textAlign={"left"}
          alignItems="flex-start"
          heading={"Numbers speaks it all"}
          para={
            <>
              Our past work speaks a lot, we excel in elevating excellence, <br />
              user engagement, and boosting revenue. Let&rsquo;s connect and outpace <br />
              your competitors – seize the advantage today!
            </>
          }
        />
        <div className={Styles.btn_wraper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="41"
            viewBox="0 0 51 41"
            fill="none"
          >
            <path
              d="M2 38.7123C20.1833 37.0593 39.1078 27.0078 42.3019 7.84277"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
              className={Styles.path}
            />
            <path
              d="M28.0391 15.2593C37.5337 10.5 44.0337 2.5 44.0337 2.5C44.0337 2.5 46.0337 15.2593 48.4366 21.6234"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={Styles.path}
            />
          </svg>

          <CalendlyEmbed background={"linear-gradient(45deg, #000 72.14%, #E668E1 100%)"}
            animate={true} text="LET'S TALK" />
        </div>
      </div>
      <div className={Styles.statistics_cont}>
        <Statistic endValue={15} lable={"Years of Experience"} backtxt={"+"} skipTo={1} />
        <Statistic endValue={300} lable={"Clients across the globe"} backtxt={"+"} skipTo={30} />
        <Statistic endValue={4000} lable={"Projects delivered"} backtxt={"+"} skipTo={300} />
        <Statistic endValue={1} lable={"users we worked on"} backtxt={"M+"} skipTo={1} />
        <Statistic endValue={9} lable={"from start up to public"} backtxt={"+"} skipTo={1} />
        <Statistic endValue={92} lable={"repeated clients"} backtxt={"%"} skipTo={5} />
      </div>
    </section>
  );
};

export default StatisticsSection;
