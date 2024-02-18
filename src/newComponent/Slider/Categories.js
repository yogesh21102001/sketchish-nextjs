import { MountainSVG } from "../../assets/ossvg";
import "./style.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import customers from "../../assets/dummyData/customers";
export function Categories() {
  let userCategoryOne = [];
  let userCategoryTwo = [];
  for (let i = 0; i < customers.length; i++) {
    if (customers.length / 2 <= i) {
      userCategoryOne.push(customers[i]);
    } else {
      userCategoryTwo.push(customers[i]);
    }
  }
  return (
    <div className="cat-con">
      <div className="text-body">
        <div className="slider-con">
          <p className="cat-text-con">48+ Categories</p>
          <p className="cat-text-t1">
            We have categorized our icons so that you can use these icons
            effortlessly in your projects. Additionally, we are adding more
            every month.
          </p>
        </div>
        <div className="carousel">
          <OwlCarousel
            className="owl-theme"
            loop={true}
            nav={false}
            dots={false}
            autoplay={true}
            autoplayTimeout={2000}
            autoplaySpeed={3000}
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
            {userCategoryOne.map((data) => (
              <div className="cate-body">
                <div className="categories">
                  <MountainSVG />
                  <div>
                    <p className="slider-t1">Adventure</p>
                    <p className="slider-t2">count</p>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
        <OwlCarousel
          className="owl-theme"
          loop={false}
          nav={false}
          dots={false}
          autoplay={true}
          autoplayTimeout={3000}
          autoplaySpeed={3000}
          navSpeed={1000}
          autoplayHoverPause={true}
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
          {userCategoryTwo.map((data) => (
            <div className="cate-body">
              <div className="categories">
                <MountainSVG />
                <div>
                  <p className="slider-t1">Adventure</p>
                  <p className="slider-t2">count</p>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
}
