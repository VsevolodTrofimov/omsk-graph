import React from "react";
import { Map, TileLayer, Popup, Polyline } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { Nodes } from "../Nodes/Nodes";
import PopupContent from "../PopupContent/PopupContent";

import {
  startHouseState,
  pathTypeState,
  popupHouseState,
} from "../../store/paths";
import { task11PathToClosestObject } from "../../store/task11";
import { splitNodes } from "../../store/selection";

import "./CityMap.css";

export default function MapContainer() {
  const [popupHouse, setPopUpHouse] = useRecoilState(popupHouseState);
  const setStartHouse = useSetRecoilState(startHouseState);
  const setPathType = useSetRecoilState(pathTypeState);
  const path = useRecoilValue(task11PathToClosestObject);
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
        <Nodes nodes={passiveNodes} nodeType="passive" />
      </MarkerClusterGroup>
      <Nodes
        nodes={selectedNodes}
        nodeType="active"
        onNodeClick={(nodeId) => {
          setPopUpHouse(nodeId);
          setStartHouse(null);
          setPathType(null);
        }}
      />
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
