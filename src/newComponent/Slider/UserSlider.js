import { ProfileSVG } from "../../assets/ossvg";
import "./style.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import customers from "../../assets/dummyData/customers";
export function UserSlider() {
  let userCarouselOne = [];
  let userCarouselTwo = [];
  for (let i = 0; i < customers.length; i++) {
    if (customers.length / 2 <= i) {
      userCarouselOne.push(customers[i]);
    } else {
      userCarouselTwo.push(customers[i]);
    }
  }
  return (
    <div>
      <div className="text-body">
        <div className="slider-con">
          <p className="text-con">Voice of customers</p>
          <p className="text-t1">
            Tons of love <br />
            around the world
          </p>
        </div>
        <div className="slider-view">
          <OwlCarousel
            className="owl-theme"
            loop={true}
            nav={false}
            dots={false}
            autoplay={true}
            autoplayTimeout={1500}
            autoplaySpeed={2500}
            autoplayHoverPause={true}
            responsive={{
              0: {
                items: 2,
              },
              600: {
                items: 4,
              },
              1000: {
                items: 4,
              },
            }}
          >
            {userCarouselOne.map((data) => (
              <div className="slider-body" style={{ margn: 10 }}>
                <div className="slider">
                  <ProfileSVG />
                  <div>
                    <p className="slider-t1">{data.name}</p>
                    <p className="slider-t2">{data.des}</p>
                  </div>
                </div>
                {data.details}
              </div>
            ))}
          </OwlCarousel>

          <OwlCarousel
            className="owl-theme"
            loop={false}
            nav={false}
            dots={false}
            autoplay={true}
            autoplayTimeout={1500}
            autoplaySpeed={2500}
            // reversed={true}
            // autoplayHoverPause={true}
            rewind={true}
            responsive={{
              0: {
                items: 2,
              },
              600: {
                items: 4,
              },
              1000: {
                items: 4,
              },
            }}
          >
            {userCarouselTwo.map((data) => (
              <div className="slider-body">
                <div className="slider">
                  <ProfileSVG />
                  <div>
                    <p className="slider-t1">{data.name}</p>
                    <p className="slider-t2">{data.des}</p>
                  </div>
                </div>
                {data.details}
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
}
