import React from 'react'
import Styles from "./style.module.css"

import { useNavigate } from 'react-router-dom';

import { IconCollection } from '../../assets/images';
import {
  Weather,
  Transportation,
  SportsFitness,
  Social,
  Shapes,
  Science,
  PrivacyUsersPeople,
  PhotosVideo,
  Numbers,
  Networking,
  MusicMediaPlayback,
  Mathematics,
  MapsLocation,
  InterfaceEssential,
  Household,
  Holidays,
  Health,
  Gaming,
  Furniture,
  FoodBeverage,
  Finance,
  Emojis,
  Education,
  Ecommerce,
  Lifestyle,
  Technology,
  Alphabet,
  Animals,
  Automotive,
  Buildings,
  BusinessOfficeMat,
  CampingNature,
  ChartsDiagrams,
  Childhood,
  Communication,
  Defence,
  Design,
  DevicesHardware
} from "../../assets/icons";

export const IconSection = ({ totalCategories }) => {
  const navigate = useNavigate();

  const DATA = [
    {
      name: "Alphabet",
      img: Alphabet,
      navigate: "/category/alphabet",
    },
    {
      name: "automotive",
      img: Automotive,
      navigate: "/category/automotive",
    },
    {
      name: "animals",
      img: Animals,
      navigate: "/category/animals",
    },
    {
      name: "Buildings",
      img: Buildings,
      navigate: "/category/buildings",
    },
    {
      name: "weather",
      img: Weather,
      navigate: "/category/buildings",
    },
    {
      name: "charts-diagrams",
      img: ChartsDiagrams,
      navigate: "/category/charts-diagrams",
    },
    {
      name: "childhood",
      img: Childhood,
      navigate: "/category/childhood",
    },
    {
      name: "defence",
      img: Defence,
      navigate: "/category/defence",
    },
    {
      name: "communication",
      img: Communication,
      navigate: "/category/communication",
    },
    {
      name: "design",
      img: Design,
      navigate: "/category/design",
    },
    {
      name: "devices-hardware",
      img: DevicesHardware,
      navigate: "/category/devices-hardware",
    },
    {
      name: "camping nature",
      img: CampingNature,
      navigate: "/category/camping%20nature",
    },
    {
      name: "business office mat...",
      img: BusinessOfficeMat,
      navigate: "/category/business",
    },
    {
      name: "transportation",
      img: Transportation,
      navigate: "/category/transportation",
    },
    {
      name: "technology",
      img: Technology,
      navigate: "/category/technology",
    },
    {
      name: "sports-fitness",
      img: SportsFitness,
      navigate: "/category/sports-fitness",
    },
    {
      name: "shapes",
      img: Shapes,
      navigate: "/category/shapes",
    },
    {
      name: "science",
      img: Science,
      navigate: "/category/science",
    },
    {
      name: "privacy users-people",
      img: PrivacyUsersPeople,
      navigate: "/category/privacy",
    },
    {
      name: "photos-video",
      img: PhotosVideo,
      navigate: "/category/photos-video",
    },
    {
      name: "numbers",
      img: Numbers,
      navigate: "/category/numbers",
    },
    {
      name: "networking",
      img: Networking,
      navigate: "/category/networking",
    },
    {
      name: "music-media-playback",
      img: MusicMediaPlayback,
      navigate: "/category/media-playback",
    },
    {
      name: "mathematics",
      img: Mathematics,
      navigate: "/category/mathematics",
    },
    {
      name: "maps location",
      img: MapsLocation,
      navigate: "/category/maps",
    },
    {
      name: "lifestyle",
      img: Lifestyle,
      navigate: "/category/lifestyle",
    },
    {
      name: "interface essential",
      img: InterfaceEssential,
      navigate: "/category/interface%20essential",
    },
    {
      name: "household",
      img: Household,
      navigate: "/category/household",
    },
    {
      name: "household",
      img: Holidays,
      navigate: "/category/household",
    },
    {
      name: "health",
      img: Health,
      navigate: "/category/health",
    },
    {
      name: "gaming",
      img: Gaming,
      navigate: "/category/gaming",
    },
    {
      name: "furniture",
      img: Furniture,
      navigate: "/category/furniture",
    },
    {
      name: "food-beverage",
      img: FoodBeverage,
      navigate: "/category/food-beverage",
    },
    {
      name: "finance",
      img: Finance,
      navigate: "/category/finance",
    },
    {
      name: "emojis",
      img: Emojis,
      navigate: "/category/emojis",
    },
    {
      name: "e-commerce",
      img: Ecommerce,
      navigate: "/category/e-commerce",
    },
    {
      name: "social",
      img: Social,
      navigate: "/category/social",
    },
    {
      name: "education",
      img: Education,
      navigate: "/category/education",
    },
  ];

  return (
    <div className={Styles.style_section_cont}>
      <div className={Styles.style_card}>
        <IconCollection />
        <div className={Styles.txt}>
          <h3>{totalCategories} categories</h3>
          <p>
            Explore our icon categories to find just the right icon for your
            project.
          </p>
        </div>
      </div>
      {DATA.map((item, index) => (
        <div
          key={index}
          className={Styles.icon_card}
          onClick={() => navigate(item.navigate)}
        >
          <item.img className={Styles.category_icon} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};