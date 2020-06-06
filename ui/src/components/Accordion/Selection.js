import React, { useState } from "react";
import { Collapse, Space, Typography, Button, InputNumber, Tag } from "antd";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  selectedInfraState,
  selectedHousesState,
  getRandom,
} from "../../store/selection";
import { popupHouseState } from "../../store/paths";

const { Panel } = Collapse;
const { Text } = Typography;

const TagList = (props) => {
  const setPopUpHouse = useSetRecoilState(popupHouseState);

  return (
    <div className="tagList">
      {props.tags.length > 0 ? (
        props.tags.map((tag) => (
          <Tag key={tag} onClick={() => setPopUpHouse(tag)}>
            {tag}
          </Tag>
        ))
      ) : (
        <Typography.Text>Ничего не выбрано</Typography.Text>
      )}
    </div>
  );
};

export const Selection = () => {
  const [selectedHouses, setSelectedHouses] = useRecoilState(
    selectedHousesState
  );
  const [selectedInfra, setSelectedInfra] = useRecoilState(selectedInfraState);

  const [randomHousesCount, setRandomHousesCount] = useState(10);
  const [randomInfraCount, setRandomInfraCount] = useState(5);

  return (
    <Space direction="vertical" className="section" size="small">
      <Text>Выбор вершин</Text>
      <Collapse>
        <Panel header="Выбранные дома" key="1">
          <TagList tags={selectedHouses} />
        </Panel>
        <Panel header="Выбранные объекты инфраструктуры" key="2">
          <TagList tags={selectedInfra} />
        </Panel>
        <Panel header="Выбрать случайные дома и объекты" key="3">
          <Space>
            <InputNumber
              min={0}
              formatter={(value) => `🏠 ${value}`}
              parser={(value) => value.substr(2).replace(/\s/g, "")}
              value={randomHousesCount}
              onChange={setRandomHousesCount}
            />
            <InputNumber
              min={0}
              formatter={(value) => `🏭 ${value}`}
              parser={(value) => value.substr(2).replace(/\s/g, "")}
              value={randomInfraCount}
              onChange={setRandomInfraCount}
            />
            <Button
              type="primary"
              onClick={() => {
                const [houses, infra] = getRandom(
                  randomHousesCount,
                  randomInfraCount
                );
                setSelectedHouses(houses);
                setSelectedInfra(infra);
              }}
            >
              Выбрать случайные
            </Button>
          </Space>
        </Panel>
      </Collapse>
    </Space>
  );
};
