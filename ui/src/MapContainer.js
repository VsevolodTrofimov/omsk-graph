import React from "react";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import graph from "./graph.json";
import PopupContent from "./PopupContent";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  pathClosestObject,
  splitNodes,
  popupHouseState,
  startHouseState,
  pathTypeState,
} from "./store";
import MarkerComp from "./MarkerComp";

let houses = {};
for (let [key, value] of Object.entries(graph)) {
  if (value.tag === "apartments") {
    houses[key] = value;
  }
}

const house = new Icon({
  iconUrl: "/activeHouse.png",
  iconSize: [25, 25],
});

const infra = new Icon({
  iconUrl: "/activeInfra.png",
  iconSize: [25, 25],
});

export default function MapContainer() {
  const [popupHouse, setPopUpHouse] = useRecoilState(popupHouseState);
  const [startHouse, setStartHouse] = useRecoilState(startHouseState);
  const [pathType, setPathType] = useRecoilState(pathTypeState);
  const path = useRecoilValue(pathClosestObject);
  const { passiveNodes, selectedNodes } = useRecoilValue(splitNodes);

  return (
    <Map
      center={[54.9924, 73.3686]}
      zoom={12}
      maxZoom={20}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      easeLinearity={0.35}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
      <MarkerClusterGroup>
        {Object.keys(passiveNodes).map((nodeId) => (
          <MarkerComp
            nodeId={nodeId}
            nodeType="passive"
            nodeTag={passiveNodes[nodeId].tag}
            nodePosition={[passiveNodes[nodeId].y, passiveNodes[nodeId].x]}
          />
        ))}
      </MarkerClusterGroup>
      {Object.keys(selectedNodes).map((key) => (
        <Marker
          key={key}
          position={[selectedNodes[key].y, selectedNodes[key].x]}
          icon={selectedNodes[key].tag === "apartments" ? house : infra}
          onclick={() => {
            setPopUpHouse(key);
            setStartHouse(null);
            setPathType(null);
          }}
        />
      ))}
      {popupHouse && (
        <Popup
          key={popupHouse}
          position={[selectedNodes[popupHouse].y, selectedNodes[popupHouse].x]}
          onClose={() => {
            setPopUpHouse(null);
          }}
        >
          <PopupContent />
        </Popup>
      )}
      {path && <Polyline positions={path} />} */}
    </Map>
  );
}
