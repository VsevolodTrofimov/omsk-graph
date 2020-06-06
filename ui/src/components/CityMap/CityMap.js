import React from "react";
import { Map, TileLayer, Popup, Polyline, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Icon } from "leaflet";

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
import { activeTaskAtom } from "../../store/general";
import {
  task22CentroidTree,
  task22ClusterTrees,
  task22CentroidPositions,
} from "../../store/task22";

const Task11a = () => {
  const path = useRecoilValue(task11PathToClosestObject);
  return path && <Polyline positions={path} />;
};

const Task11b = () => {
  const path = useRecoilValue(task11PathToClosestObject);
  return path && <Polyline positions={path} />;
};

const colors = [
  "#ff4d4f",
  "#9254de",
  "#ff7a45",
  "#36cfc9",
  "#bae637",
  "#f759ab",
];

const getColoredSvg = (color) => {
  let svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 48" width="24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${color}" />
    </svg>`;
  let myIconUrl = encodeURI("data:image/svg+xml," + svgString).replace(
    "#",
    "%23"
  );

  return new Icon({ iconUrl: myIconUrl, iconSize: 50 });
};

const Task22 = () => {
  const centroidTree = useRecoilValue(task22CentroidTree);
  const centroidPos = useRecoilValue(task22CentroidPositions);
  const clusterTrees = useRecoilValue(task22ClusterTrees);

  const centroidLine = centroidTree && (
    <Polyline weight={8} opacity={0.5} positions={centroidTree}></Polyline>
  );

  return (
    <React.Fragment>
      {clusterTrees.map((x, idx) => (
        <React.Fragment key={idx}>
          <Polyline color={colors[idx]} positions={x} />
          <Marker
            position={centroidPos[idx]}
            icon={getColoredSvg(colors[idx])}
          />
        </React.Fragment>
      ))}
      {centroidLine}
    </React.Fragment>
  );
};

const task2MapMarkers = {
  "1.1a": Task11a,
  "1.1b": Task11b,
  "2.2": Task22,
};

const MapTaskMarkers = () => {
  const activeTask = useRecoilValue(activeTaskAtom);
  const Component = task2MapMarkers[activeTask];

  if (!Component) {
    return null;
  }

  return <Component />;
};

export const CityMap = () => {
  const [popupHouse, setPopUpHouse] = useRecoilState(popupHouseState);
  const setStartHouse = useSetRecoilState(startHouseState);
  const setPathType = useSetRecoilState(pathTypeState);
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
      <MapTaskMarkers />
    </Map>
  );
};
