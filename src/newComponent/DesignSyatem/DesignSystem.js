import "./style.css";
import { Button } from "../../newComponent/Button/Button";
import {
  GridSVG,
  MailSVG,
  MediumSVG,
  InvisionappSVG,
  AnyDeskSVG,
  NotionSVG,
  ZoomSVG,
  SlackSVG,
} from "../../assets/ossvg";
import icons from "../../assets/dummyData/icon";

export function DesignSystem() {
  return (
    <div className="container-body">
      <div className="design-cotainer">
        <div className="design-body">
          <div className="des-con1">
            <div className="des-text-1">
              Discover the most
              <br /> consistent, clean
              <br /> organise icon sets.
            </div>
            <div>
              <ui className="list-item">
                <li className="list-item-1 item-data">Scalable</li>
                <li className="item-data">Responsive</li>
                <li className="item-data">Customise</li>
                <li className="item-data">Customise</li>
                <li className="item-data">Copy</li>
              </ui>
            </div>
            <div>
              <Button lable={"Explore now"} btnSize={"mlg"} />
            </div>
          </div>
          <div className="icon-sec">
            {icons.map((data) => (
              <div>
                <MailSVG />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="logo-body">
        <p className="logo-sec">You're in a good company</p>
        <div className="logo-con">
          <InvisionappSVG />
          <MediumSVG />
          <NotionSVG />
          <SlackSVG />
          <ZoomSVG />
          <AnyDeskSVG />
        </div>
      </div>
      <div className="design-cotainer">
        <div className="design-body">
          <div className="des-con1">
            <div>
              <ui className="list-item">
                <li className="list-item-1 item-data">24px base grid</li>
                <li className="item-data">Responsive</li>
              </ui>
            </div>
            <div className="des-text-1">
              Simple, minimal yet
              <br /> powerful. Drawn with
              <br /> care.
            </div>
            <div>
              <p className="des-text-2">
                Each icon designed by inspiring real life objects to deliver
                visual language. Inspired by everyday things we use and interact
                with.
              </p>
            </div>
          </div>
          <div className="icon-sec">
            <GridSVG className="icon-svg" />
            <MailSVG />
            <MailSVG />
            <MailSVG />
            <MailSVG />
            <MailSVG />
          </div>
        </div>
      </div>
      <div className="design-cotainer">
        <div className="design-body">
          <div className="icon-sec">
            {icons.map((data) => (
              <div>
                <MailSVG />
              </div>
            ))}
          </div>
          <div className="des-con1">
            <div>
              <ui className="list-item">
                <li className="list-item-1 item-data">Variants</li>
                <li className="item-data">Design System</li>
              </ui>
            </div>
            <div className="des-text-1">
              Explore variants, and <br />
              get align on brand
            </div>
            <div>
              <p className="des-text-2">
                Find the right powerful icon sets without exploring different
                icons and mix it. Icon that are functional and aesthetically
                pleasing, and that contribute to a cohesive and effective
                design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
