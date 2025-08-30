import { Carousel } from "antd";
import React, { useState } from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
import { Section } from "../../HOC/Section";
import Theaters from "./components/Theaters";
import Schedule from "./components/Schedule";

export const HomePage = () => {
  return (
    <div>
      <CarouselMovie />
      <Section titleSection="Danh sách phim">
        <ListMovie />
      </Section>
      <Section>
        <div className="flex">
          <div className="w-1/6">
            <Theaters />
          </div>
          <div className="w-5/6 pl-4">
            <Schedule />
          </div>
        </div>
      </Section>
    </div>
  );
};
export default HomePage;
