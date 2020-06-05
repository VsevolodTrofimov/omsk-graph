import React, { useState } from "react";
import { Collapse, Space, Typography, Button, InputNumber, Tag } from "antd";
import { useRecoilState } from "recoil";

import {
  selectedInfraState,
  selectedHousesState,
  getRandom,
} from "../../store/selection";

const { Panel } = Collapse;
const { Text } = Typography;

const TagList = (props) => (
  <div className="tagList">
    {props.tags.map((tag) => (
      <Tag key={tag}>{tag}</Tag>
    ))}
  </div>
);

export const Selection = () => {
  const [selectedHouses, setSelectedHouses] = useRecoilState(
    selectedHousesState
  );
  const [selectedInfra, setSelectedInfra] = useRecoilState(selectedInfraState);

  const [randomHousesCount, setRandomHousesCount] = useState(
    selectedHouses.length
  );
  const [randomInfraCount, setRandomInfraCount] = useState(
    selectedInfra.length
  );

  return (
    <Space direction="vertical" className="section" size="small">
      <Text>Выбор вершин</Text>
      <Collapse>
        <Panel header="Выбранные дома" key="1">
          <TagList tags={selectedHouses} />
        </Panel>
        <Panel header="Выбранные обЪекты инфраструктуры" key="2">
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
