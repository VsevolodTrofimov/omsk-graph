import React from "react";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";

const passiveHouse = new Icon({
  iconUrl: "/house_passive.png",
  iconSize: [25, 25],
});

const house = new Icon({
  iconUrl: "/house.png",
  iconSize: [25, 25],
});

const activeObjectIcons = {
  hospital: new Icon({
    iconUrl: "/hospital.png",
    iconSize: [25, 25],
  }),
  fire_station: new Icon({
    iconUrl: "/fire.png",
    iconSize: [25, 25],
  }),
  shop: new Icon({
    iconUrl: "/money.png",
    iconSize: [25, 25],
  }),
};

const passiveObjectIcons = {
  hospital: new Icon({
    iconUrl: "/hospital_passive.png",
    iconSize: [25, 25],
  }),
  fire_station: new Icon({
    iconUrl: "/fire_passive.png",
    iconSize: [25, 25],
  }),
  shop: new Icon({
    iconUrl: "/money_passive.png",
    iconSize: [25, 25],
  }),
};

export const Node = (props) => {
  if (props.nodeType === "passive") {
    return (
      <Marker
        position={[props.node.y, props.node.x]}
        icon={
          props.node.tag === "apartments"
            ? passiveHouse
            : passiveObjectIcons[props.node.tag]
        }
        onclick={props.onClick}
      />
    );
  } else {
    return (
      <Marker
        position={[props.node.y, props.node.x]}
        icon={
          props.node.tag === "apartments"
            ? house
            : activeObjectIcons[props.node.tag]
        }
        onclick={props.onClick}
      />
    );
  }
};
