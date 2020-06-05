import React from "react";
import { RecoilRoot } from "recoil";

import MapContainer from "../CityMap/CityMap";
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
          <MapContainer />
        </div>
      </div>
    </RecoilRoot>
  );
}
