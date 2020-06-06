import React from "react";
import { Radio, Space } from "antd";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import graph from "../../graph.json";

import {
  pathTypeState,
  popupHouseState,
  startHouseState,
} from "../../store/paths";
import { activeTaskAtom } from "../../store/general";

const Task11a = () => {
  const [pathType, setPathType] = useRecoilState(pathTypeState);
  const [popupHouseId, setPopupHouseId] = useRecoilState(popupHouseState);
  const setStartHouse = useSetRecoilState(startHouseState);

  const isHouse = graph[popupHouseId].tag === "apartments";

  return (
    <Space direction="vertical" size="small">
      Путь до ближайшего {isHouse ? "объекта" : "дома"}
      <Radio.Group
        onChange={(e) => {
          setPathType(e.target.value);
          setStartHouse(popupHouseId);
          setPopupHouseId(null);
        }}
        value={pathType}
      >
        {isHouse ? (
          <React.Fragment>
            <Radio.Button value="to">Туда</Radio.Button>
            <Radio.Button value="round">Туда-обратно</Radio.Button>
          </React.Fragment>
        ) : (
          <Radio.Button value="from">Туда</Radio.Button>
        )}
      </Radio.Group>
    </Space>
  );
};

const Task11b = () => {
  const [pathType, setPathType] = useRecoilState(pathTypeState);
  const [popupHouseId, setPopupHouseId] = useRecoilState(popupHouseState);
  const setStartHouse = useSetRecoilState(startHouseState);

  return (
    <Radio.Group
      onChange={(e) => {
        setPathType(e.target.value);
        setStartHouse(popupHouseId);
        setPopupHouseId(null);
      }}
      value={pathType}
    >
      В радиусе
      {graph[popupHouseId].tag === "apartments" ? (
        <div>
          <Radio.Button value="to">Туда</Radio.Button>
          <Radio.Button value="round">Туда-обратно</Radio.Button>
        </div>
      ) : (
        <div>
          <Radio.Button value="from">Обратно</Radio.Button>
        </div>
      )}
    </Radio.Group>
  );
};

const Task22 = () => {
  return "TODO";
};

const task2Content = {
  "1.1a": Task11a,
  "1.1b": Task11b,
  "2.2": Task22,
};

export default function PopupContent() {
  const activeTask = useRecoilValue(activeTaskAtom);
  const Component = task2Content[activeTask];

  if (!Component) {
    return null;
  }

  return <Component />;
}
