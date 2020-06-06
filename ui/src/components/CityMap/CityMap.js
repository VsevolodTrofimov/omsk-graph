import React, { useState } from "react";
import { Map, TileLayer, Popup, Polyline, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Icon } from "leaflet";

import graph from "../../graph.json";

import { Nodes } from "../Nodes/Nodes";
import PopupContent from "../PopupContent/PopupContent";

import {
  startHouseState,
  pathTypeState,
  popupHouseState,
  pathsAtom,
  getPathBetween,
} from "../../store/paths";
import {
  task11PathToClosestObject,
  task11ObjectsInRadius,
} from "../../store/task11";
import { splitNodes } from "../../store/selection";

import { task12MinPathMaxObject } from "../../store/task12";

import "./CityMap.css";
import { activeTaskAtom } from "../../store/general";
import {
  task22CentroidTree,
  task22ClusterTrees,
  task22CentroidPositions,
  task22Atom,
} from "../../store/task22";
import { task21Tree } from "../../store/task21";
import { task14Tree } from "../../store/task14";
import { task13ShortestDistances } from "../../store/task13";

const colors = [
  "#ff4d4f",
  "#9254de",
  "#ff7a45",
  "#36cfc9",
  "#bae637",
  "#f759ab",
];

const Task11a = () => {
  const path = useRecoilValue(task11PathToClosestObject);
  return path && <Polyline positions={path} />;
};

const Task11b = () => {
  const startHouse = useRecoilValue(startHouseState);
  const path = useRecoilValue(task11ObjectsInRadius);
  const paths = useRecoilValue(pathsAtom);
  const pathType = useRecoilValue(pathTypeState);
  return path
    ? path.map((node) => {
      const currentPath = getPathBetween(startHouse, node, pathType, paths);
      return <Polyline positions={currentPath} />;
    })
    : null;
};

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

const Task12 = () => {
  const path = useRecoilValue(task12MinPathMaxObject);
  return path && <Polyline positions={path} />;
};

const Task13 = () => {
  const path = useRecoilValue(task13ShortestDistances);
  console.log(path, 13);
  return path
    ? path.map((currentPath) => {
      return <Polyline positions={currentPath} />;
    })
    : null;
};

const Task14 = () => {
  const path = useRecoilValue(task14Tree);
  return path && <Polyline positions={path} />;
};

const Task21 = () => {
  const path = useRecoilValue(task21Tree);
  return path && <Polyline positions={path} />;
};

const Task22 = () => {
  const task22 = useRecoilValue(task22Atom);
  const centroidTree = useRecoilValue(task22CentroidTree);
  const centroidPos = useRecoilValue(task22CentroidPositions);
  const clusterTrees = useRecoilValue(task22ClusterTrees);
  const setPopUpHouse = useSetRecoilState(popupHouseState);

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
            onclick={() => {
              setPopUpHouse(String(task22.centroids[idx]));
            }}
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
  "1.2": Task12,
  "1.3": Task13,
  "1.4": Task14,
  "2.1": Task21,
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

const noRoads = {};

export const CityMap = () => {
  const [popupHouse, setPopUpHouse] = useRecoilState(popupHouseState);
  const setStartHouse = useSetRecoilState(startHouseState);
  const setPathType = useSetRecoilState(pathTypeState);
  const { passiveNodes, selectedNodes, roadNodes } = useRecoilValue(splitNodes);
  const [roads, setRoads] = useState(noRoads);

  const setActiveHouse = React.useCallback(
    (nodeId) => {
      setPopUpHouse(nodeId);
      setStartHouse(null);
      setPathType(null);
    },
    [setPathType, setStartHouse, setPopUpHouse]
  );

  const onZoomChange = React.useCallback(
    (event) => {
      const zoom = event.target.getZoom();
      const bounds = event.target.getBounds();
      const top = bounds.getNorth();
      const left = bounds.getWest();
      const right = bounds.getEast();
      const bottom = bounds.getSouth();

      if (zoom < 17) {
        setRoads(noRoads);
      } else {
        const nextRoads = {};
        for (const road in roadNodes) {
          if (
            roadNodes[road].y <= top &&
            roadNodes[road].y >= bottom &&
            roadNodes[road].x >= left &&
            roadNodes[road].x <= right
          ) {
            nextRoads[road] = roadNodes[road];
          }
        }
        setRoads(nextRoads);
      }
    },
    [setRoads, roadNodes]
  );

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
      onzoomlevelschange={onZoomChange}
      onmove={onZoomChange}
      animate={true}
      easeLinearity={0.35}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
      <MarkerClusterGroup>
        <Nodes
          nodes={passiveNodes}
          nodeType="passive"
          onNodeClick={setPopUpHouse}
        />
      </MarkerClusterGroup>
      <Nodes nodes={roads} nodeType="passive" />
      <Nodes
        nodes={selectedNodes}
        nodeType="active"
        onNodeClick={setActiveHouse}
      />
      {popupHouse && (
        <Popup
          key={popupHouse}
          position={[graph[popupHouse].y, graph[popupHouse].x]}
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
