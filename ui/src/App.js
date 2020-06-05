import React from "react";
import "./App.css";
import MapContainer from "./MapContainer";
import Accordion from "./Accordion";
import { RecoilRoot } from "recoil";

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
