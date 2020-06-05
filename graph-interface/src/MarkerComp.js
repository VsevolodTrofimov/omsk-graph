import React from 'react'
import { Marker } from 'react-leaflet';
import { Icon } from "leaflet";

const passiveHouse = new Icon({
    iconUrl: '/passiveHouse.png',
    iconSize: [25, 25]
});

const passiveInfra = new Icon({
    iconUrl: '/passiveInfra.png',
    iconSize: [25, 25]
});

export default function MarkerComp(props) {
    if (props.nodeType === "passive") {
        return (
            <Marker
                key={props.nodeId}
                position={props.nodePosition}
                icon={props.nodeTag === 'apartments' ? passiveHouse : passiveInfra}
            />
        );
    }
    else {

    }
}