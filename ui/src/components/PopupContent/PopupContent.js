import React from "react";
import { Radio, Space, Button, Typography, Divider } from "antd";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import graph from "../../graph.json";

import {
  pathTypeState,
  popupHouseState,
  startHouseState,
} from "../../store/paths";
import { activeTaskAtom } from "../../store/general";
import { selectedHousesState, selectedInfraState } from "../../store/selection";

const Task11a = () => {
  const [pathType, setPathType] = useRecoilState(pathTypeState);
  const [popupHouseId, setPopupHouseId] = useRecoilState(popupHouseState);
  const setStartHouse = useSetRecoilState(startHouseState);

  const isHouse = graph[popupHouseId].tag === "apartments";

  return (
    <Space direction="vertical" size="small">
      <Typography.Text>
        Путь до ближайшего {isHouse ? "объекта" : "дома"}
      </Typography.Text>
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
  const [popupHouse, setPopUpHouse] = useRecoilState(popupHouseState);
  const [selectedHouses, setSelectedHouses] = useRecoilState(
    selectedHousesState
  );
  const [selectedInfra, setSelectedInfra] = useRecoilState(selectedInfraState);
  const Component = task2Content[activeTask];

  const isSelected =
    selectedHouses.includes(popupHouse) || selectedInfra.includes(popupHouse);

  return (
    <div>
      {Component && <Component />}
      {Component && isSelected && popupHouse && (
        <Divider style={{ margin: "12px 0" }} />
      )}
      {isSelected && popupHouse ? (
        <div>
          <Button
            onClick={() => {
              setSelectedHouses(selectedHouses.filter((x) => x !== popupHouse));
              setSelectedInfra(selectedInfra.filter((x) => x !== popupHouse));
              setPopUpHouse(null);
            }}
          >
            Убрать из выбранных {popupHouse}
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => {
              if (graph[popupHouse].tag === "apartments") {
                setSelectedHouses([...selectedHouses, popupHouse]);
              } else {
                setSelectedInfra([...selectedInfra, popupHouse]);
              }
              setPopUpHouse(null);
            }}
          >
            Выбрать {popupHouse}
          </Button>
        </div>
      )}
    </div>
  );
}
