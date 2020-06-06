import React from "react";
import { RecoilRoot } from "recoil";

import { CityMap } from "../CityMap/CityMap";
import Accordion from "../Accordion/Accordion";

import "./App.css";

export default function App() {
  return (
    <RecoilRoot>
      <div className="app">
        <div className="forms">
          <Accordion />
        </div>
        <div className="map">
          <CityMap />
        </div>
      </div>
    </RecoilRoot>
  );
}
