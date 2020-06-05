import React from "react";
import { Radio } from "antd";
import { useRecoilState, useSetRecoilState } from "recoil";
import graph from "../../graph.json";

import {
  pathTypeState,
  popupHouseState,
  startHouseState,
} from "../../store/paths";

export default function PopupContent() {
  const [pathType, setPathType] = useRecoilState(pathTypeState);
  const [popupHouseId, setPopupHouseId] = useRecoilState(popupHouseState);
  const setStartHouse = useSetRecoilState(startHouseState);

  return (
    <div>
      <Radio.Group
        onChange={(e) => {
          setPathType(e.target.value);
          setStartHouse(popupHouseId);
          setPopupHouseId(null);
        }}
        value={pathType}
      >
        <RadioButtons nodeTag={graph[[popupHouseId]].tag} />
      </Radio.Group>
    </div>
  );
}

const RadioButtons = (props) => {
  return props.nodeTag === "apartments" ? (
    <div>
      <Radio.Button value="to">Туда</Radio.Button>
      <Radio.Button value="round">Туда-обратно</Radio.Button>
    </div>
  ) : (
    <div>
      <Radio.Button value="from">Обратно</Radio.Button>
    </div>
  );
};