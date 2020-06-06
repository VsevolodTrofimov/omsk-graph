import React from "react";
import { Radio, Space, Button, Typography, Divider, Descriptions } from "antd";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import graph from "../../graph.json";

import {
  pathTypeState,
  popupHouseState,
  startHouseState,
} from "../../store/paths";
import { activeTaskAtom } from "../../store/general";
import { selectedHousesState, selectedInfraState } from "../../store/selection";
import {
  maxDistanceState,
  maxTimeState,
  pathLimitState,
} from "../../store/task11";
import { task22Atom } from "../../store/task22";

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
  const popupHouseId = useRecoilValue(popupHouseState);
  const [pathLimit, setPathLimit] = useRecoilState(pathLimitState);
  const setStartHouse = useSetRecoilState(startHouseState);
  const maxDistance = useRecoilValue(maxDistanceState);
  const maxTime = useRecoilValue(maxTimeState);
  return (
    <div>
      <div> Направление </div>
      <Radio.Group
        onChange={(e) => {
          setPathType(e.target.value);
          setStartHouse(popupHouseId);
        }}
        value={pathType}
      >
        {graph[popupHouseId].tag === "apartments" && (
          <div>
            <Radio.Button value="to"> Туда </Radio.Button>
            <Radio.Button value="round">Туда-обратно </Radio.Button>
          </div>
        )}
      </Radio.Group>
      <div> В радиусе </div>
      <Radio.Group
        onChange={(e) => {
          setPathLimit(e.target.value);
        }}
        value={pathLimit}
      >
        {graph[popupHouseId].tag === "apartments" && (
          <div>
            <Radio.Button value="byDist"> {maxDistance}</Radio.Button>
            <Radio.Button value="byTime">{maxTime}</Radio.Button>
          </div>
        )}
      </Radio.Group>
    </div>
  );
};

const Task22 = () => {
  const task22 = useRecoilValue(task22Atom);
  const popupHouse = useRecoilValue(popupHouseState);
  const centroidIdx = task22.centroids.indexOf(parseInt(popupHouse, 10));

  if (centroidIdx === -1) {
    return null;
  }

  const treeLength = task22.clusterTrees[centroidIdx].weight;
  const clusterLength = task22.clusterLengths[centroidIdx];

  return (
    <Descriptions bordered layout="horizontal" column={1} size="small">
      <Descriptions.Item label="Длина дерева кластера">
        {treeLength.toFixed(0)} м
      </Descriptions.Item>
      <Descriptions.Item label="Длина путей в кластере">
        {clusterLength.toFixed(0)} м
      </Descriptions.Item>
    </Descriptions>
  );
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
    <React.Fragment>
      {Component && <Component />}
      {Component && popupHouse && <Divider style={{ margin: "12px 0" }} />}
      {popupHouse && (
        <Space direction="vertical" size="small">
          {(graph[popupHouse].name || graph[popupHouse].addr !== ", д. ") && (
            <Descriptions bordered layout="horizontal" column={1} size="small">
              {graph[popupHouse].name && (
                <Descriptions.Item label="Название">
                  {graph[popupHouse].name}
                </Descriptions.Item>
              )}
              {graph[popupHouse].addr !== ", д. " && (
                <Descriptions.Item label="Адрес">
                  {graph[popupHouse].addr}
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
          {isSelected ? (
            <Button
              onClick={() => {
                setSelectedHouses(
                  selectedHouses.filter((x) => x !== popupHouse)
                );
                setSelectedInfra(selectedInfra.filter((x) => x !== popupHouse));
                setPopUpHouse(null);
              }}
            >
              Убрать из выбранных {popupHouse}
            </Button>
          ) : (
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
          )}
        </Space>
      )}
    </React.Fragment>
  );
}
