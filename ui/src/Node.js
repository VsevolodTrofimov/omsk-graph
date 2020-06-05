import React from "react";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";

const passiveHouse = new Icon({
  iconUrl: "/passiveHouse.png",
  iconSize: [25, 25],
});

const passiveInfra = new Icon({
  iconUrl: "/passiveInfra.png",
  iconSize: [25, 25],
});

const house = new Icon({
  iconUrl: "/activeHouse.png",
  iconSize: [25, 25],
});

const infra = new Icon({
  iconUrl: "/activeInfra.png",
  iconSize: [25, 25],
});

export const Node = (props) => {
  if (props.nodeType === "passive") {
    return (
      <Marker
        position={[props.node.y, props.node.x]}
        icon={props.node.tag === "apartments" ? passiveHouse : passiveInfra}
      />
    );
  } else {
    return (
      <Marker
        position={[props.node.y, props.node.x]}
        icon={props.node.tag === "apartments" ? house : infra}
        onclick={props.onClick}
      />
    );
  }
};
