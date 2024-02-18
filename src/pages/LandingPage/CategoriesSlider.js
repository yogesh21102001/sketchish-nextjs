import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoriesSlider({ sliderData, scroll }) {
  const settings = {
    // dots: false,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 7,
    // slidesToScroll: scroll,
    // accessibility: true,
    // focusOnSelect: true,
    // draggable: true,
    // swipeToSlide: true,
    // autoplay: true,
    // arrows: false,
    // autoplaySpeed: 1500,
    arrows: false,
    slidesToShow: 7,
    slidesToScroll: scroll,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    pauseOnHover: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="categories-slider-root">
      <div className="categories-slider-inner">
        <div className="categories-grid">
          <Slider {...settings}>
            {sliderData?.map((obj) => (
              <div className="categories-item">
                <div className="catergories-item-shadow">
                  <div className="categories-img-content">
                    <img src={obj.img} alt="category1" />
                    <p className="img-label">{obj.name}</p>
                  </div>
                  <p className="count">{obj?.count}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
