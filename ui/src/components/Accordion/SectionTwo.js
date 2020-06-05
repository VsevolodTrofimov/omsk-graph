import React, { useState } from "react";
import {
  Collapse,
  Space,
  Button,
  Typography,
  InputNumber,
  notification,
} from "antd";
import { useRecoilValue, useRecoilState } from "recoil";

import { api } from "../../api";
import { selectedInfraState, selectedHousesState } from "../../store/selection";

const { Panel } = Collapse;
const { Text } = Typography;

export const SectionTwo = React.memo(() => {
  const [clusterCount, setClusterCount] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const selectedHouses = useRecoilValue(selectedHousesState);
  const [selectedInfra, setSelectedInfra] = useRecoilState(selectedInfraState);

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
      console.log(result);
    }
  };

  return (
    <Space direction="vertical" className="section" size="small">
      <Text> Планирование новых объектов </Text>
      <Collapse accordion>
        <Panel header="2.1 Построить дерево кратчайших путей" key="1"></Panel>
        <Panel header="2.2-2.4 Разбиение на кластеры" key="2">
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
        </Panel>
      </Collapse>
    </Space>
  );
});
