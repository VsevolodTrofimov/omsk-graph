import React from "react";

import { Radio } from "antd";
import { pathTypeState, popupHouseState, startHouseState } from "./store";
import { useRecoilState, useSetRecoilState } from "recoil";

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
        <Radio.Button value="to" on>
          Туда
        </Radio.Button>
        <Radio.Button value="round">Туда-обратно</Radio.Button>
      </Radio.Group>
    </div>
  );
}
