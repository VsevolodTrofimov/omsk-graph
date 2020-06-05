import React from "react";
import graph from "./graph.json";
import { Radio } from "antd";

import { pathTypeState, popupHouseState, startHouseState } from "./store";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

export default function PopupContent() {
  const [pathType, setPathType] = useRecoilState(pathTypeState);
  const [popupHouseId, setPopupHouseId] = useRecoilState(popupHouseState);
  const setStartHouse = useSetRecoilState(startHouseState);

  return (
    <div style={{ width: 300 }}>
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
  return (
    props.nodeTag === "apartments" ?
      <div>
        <Radio.Button value="to" on > Туда </Radio.Button>
        <Radio.Button value="round">Туда-обратно</Radio.Button>
      </div> :
      <div>
        <Radio.Button value="from" on> Обратно </Radio.Button>
      </div>

  )
}


