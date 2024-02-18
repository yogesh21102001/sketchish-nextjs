import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TestinomialSlider({ sliderData }) {
  const settings = {
    // dots: false,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 6,
    // slidesToScroll: 1,
    // accessibility: true,
    // focusOnSelect: true,
    // draggable: true,
    // swipeToSlide: true,
    // autoplay: true,
    // arrows: false,
    // autoplaySpeed: 1500,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 7000,
    pauseOnHover: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 2562,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2400,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2100,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderComment = (comments) => {
    var ans = [];
    for (let comment of comments) {
      ans.push(
        <div className="tesinomial-slider-item">
          <div className="tesinomial-slider-item-root">
            <div className="profile-data">
              <img src={comment?.img} alt="profileImg" />
              <div>
                <h5>{comment?.name}</h5>
                <p>{comment?.post}</p>
              </div>
            </div>
            <p className="comments">{comment?.commonet}</p>
          </div>
        </div>
      );
    }
    return ans;
  };

  const renderTestinomial = (testimonials) => {
    var ans = [];
    for (let key in testimonials) {
      ans.push(
        <div className="tesinomial-slider-grid-item">
          <div className="tesinomial-slider-grid-item-flex">
            {renderComment(testimonials[key])}
          </div>
        </div>
      );
    }
    return ans;
  };

  return (
    <div className="testinomial-slider-root">
      <div className="testinomial-slider-inner">
        <div className="tesinomial-slider-grid">
          <Slider {...settings}>{renderTestinomial(sliderData)}</Slider>
          {/* <div class="marquee--inner">{renderTestinomial(sliderData)}</div> */}
        </div>
      </div>
    </div>
  );
}
