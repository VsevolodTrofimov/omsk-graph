import React, { useState } from "react";
import {
  Collapse,
  Space,
  Button,
  Typography,
  InputNumber,
  notification,
  Descriptions,
} from "antd";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

import { api } from "../../api";
import { selectedInfraState, selectedHousesState } from "../../store/selection";
import { task22Atom } from "../../store/task22";
import { activeTaskAtom } from "../../store/general";
import { task21Atom } from "../../store/task21";

const { Panel } = Collapse;
const { Text } = Typography;

export const SectionTwo = () => {
  const [clusterCount, setClusterCount] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const selectedHouses = useRecoilValue(selectedHousesState);
  const [selectedInfra, setSelectedInfra] = useRecoilState(selectedInfraState);
  const [task22, setTask22] = useRecoilState(task22Atom);
  const [task21, setTask21] = useRecoilState(task21Atom);
  const setTask = useSetRecoilState(activeTaskAtom);

  const callForTree = async (infra = selectedInfra) => {
    if (infra.length > 1) {
      notification.info({
        key: "2.1 warn",
        message: "Для 2.1 должен быть выбран 1 объект инфраструктуры",
        description: (
          <div>
            Сейчас выбрано {infra.length}.{" "}
            <Button
              onClick={() => {
                setSelectedInfra([infra[0]]);
                callForTree([infra[0]]);
                notification.close("2.1 warn");
              }}
            >
              Оставить только первый
            </Button>
          </div>
        ),
      });
    } else {
      setIsLoading(true);
      const result = await api("2.1", {
        houses: selectedHouses,
        infra: infra,
        clusterCount: clusterCount,
      });
      setIsLoading(false);
      if (result) {
        setTask21(result);
        setTask("2.1");
      }
    }
  };

  const callForClusters = async (infra = selectedInfra) => {
    if (infra.length > 1) {
      notification.info({
        key: "2.2 warn",
        message: "Для 2.2 должен быть выбран 1 объект инфраструктуры",
        description: (
          <div>
            Сейчас выбрано {infra.length}.{" "}
            <Button
              onClick={() => {
                setSelectedInfra([infra[0]]);
                callForClusters([infra[0]]);
                notification.close("2.2 warn");
              }}
            >
              Оставить только первый
            </Button>
          </div>
        ),
      });
    } else {
      setIsLoading(true);
      const result = await api("2.2-2.4", {
        houses: selectedHouses,
        infra: infra,
        clusterCount: clusterCount,
      });
      setIsLoading(false);
      if (result) {
        setTask22(result);
        setTask("2.2");
      }
    }
  };

  return (
    <Space direction="vertical" className="section" size="small">
      <Text> Планирование новых объектов </Text>
      <Collapse accordion>
        <Panel header="2.1 Построить дерево кратчайших путей" key="1">
          <Space direction="vertical">
            <Button
              loading={isLoading}
              type="primary"
              onClick={() => callForTree()}
            >
              Построить дерево путей
            </Button>
            {task21 && (
              <Descriptions
                title="Результаты"
                layout="horizontal"
                column={1}
                bordered
              >
                <Descriptions.Item label="Длина дерева">
                  {task21.treeLength.toFixed(0)} м
                </Descriptions.Item>
                <Descriptions.Item label="Суммарная длина путей">
                  {task21.pathsLengthSum.toFixed(0)} м
                </Descriptions.Item>
              </Descriptions>
            )}
          </Space>
        </Panel>
        <Panel header="2.2-2.4 Разбиение на кластеры" key="2">
          <Space direction="vertical">
            <Space>
              Кластеры:
              <InputNumber
                min={1}
                max={Math.max(selectedHouses.length, 1)}
                value={clusterCount}
                onChange={setClusterCount}
              />
              <Button
                loading={isLoading}
                type="primary"
                onClick={() => callForClusters()}
              >
                Вычислить кластеры
              </Button>
            </Space>
            {task22 && (
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Длина дерева" layout="horizontal">
                  {task22.centroidLength.toFixed(0)} м
                </Descriptions.Item>
              </Descriptions>
            )}
          </Space>
        </Panel>
      </Collapse>
    </Space>
  );
};
