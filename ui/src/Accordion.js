import React, { useState } from "react";
import {
  Collapse,
  Typography,
  Space,
  Button,
  InputNumber,
  Tag,
  Divider,
} from "antd";
import "./Accordion.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedHousesState,
  selectedInfraState,
  getRandom,
  pathsAtom,
  task11Atom,
} from "./store";
import { api } from "./api";

const { Panel } = Collapse;
const { Text } = Typography;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const TagList = (props) => (
  <div className="tagList">
    {props.tags.map((tag) => (
      <Tag key={tag}>{tag}</Tag>
    ))}
  </div>
);

const SectionOne = () => {
  const [maxDistance, setMaxDistance] = useState(4000);
  const [maxTime, setMaxTime] = useState(15);
  const [isLoading, setIsLoading] = useState(false);

  const selectedHouses = useRecoilValue(selectedHousesState);
  const selectedInfra = useRecoilValue(selectedInfraState);
  const setPaths = useSetRecoilState(pathsAtom);
  const set11 = useSetRecoilState(task11Atom);

  return (
    <Space direction="vertical" className="section" size="small">
      <Text>Оценка удобства размещения объектов инфраструктуры города</Text>
      <Collapse accordion>
        <Panel header="1.1 Ближайшие узлы и объекты" key="1" class="panel">
          <Space>
            В радиусе
            <InputNumber
              formatter={(value) =>
                `${value} м`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              value={maxDistance}
              onChange={setMaxDistance}
            />
            или
            <InputNumber
              formatter={(value) =>
                `${value} мин`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              value={maxTime}
              onChange={setMaxTime}
            />
            <Button loading={isLoading} type="primary" onClick={() => {}}>
              Найти
            </Button>
          </Space>
          <Divider>Или</Divider>
          <Button
            loading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              const result = await api("1.1", {
                houses: selectedHouses,
                infra: selectedInfra,
              });
              setIsLoading(false);
              setPaths(result.paths);
              set11(result);
            }}
          >
            Найти независимо от расстояния
          </Button>
        </Panel>
        <Panel header="1.2 Минимальное расстояние до дальнего дома" key="2" />
        <Panel header="1.3 Сумма кратчайших расстояний" key="3" />
        <Panel header="1.4 Найти минимальное дерево кратчайших путей" key="4" />
      </Collapse>
    </Space>
  );
};

export default function Accordion() {
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
    <React.Fragment>
      {/* Choice */}
      <Space direction="vertical" className="section" size="large">
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
                  value={randomHousesCount}
                  onChange={setRandomHousesCount}
                />
                <InputNumber
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

        <SectionOne />

        {/* 2 */}
        <Space direction="vertical" className="section" size="small">
          <Text> Планирование новых объектов </Text>
          <Collapse accordion>
            <Panel header="2.1 Построить дерево кратчайших путей" key="5">
              <p>{text}</p>
            </Panel>
            <Panel header="2.2 Разбиение на кластеры" key="6">
              <p>{text}</p>
            </Panel>
            <Panel header="2.3 Опции для кластеров" key="7">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Space>
      </Space>
    </React.Fragment>
  );
}
