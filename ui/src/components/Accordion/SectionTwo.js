import React, { useState } from "react";
import {
  Collapse,
  Space,
  Button,
  Typography,
  InputNumber,
  Divider,
  notification,
} from "antd";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";

import { api } from "../../api";
import { selectedInfraState, selectedHousesState } from "../../store/selection";
import { pathsAtom } from "../../store/paths";
import { task11Atom } from "../../store/task11";

const { Panel } = Collapse;
const { Text } = Typography;

export const SectionTwo = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const selectedHouses = useRecoilValue(selectedHousesState);
  const [selectedInfra, setSelectedInfra] = useRecoilState(selectedInfraState);

  const callForClusters = async (infra = selectedInfra) => {
    if (infra.length > 1) {
      notification.info({
        message: "Для 2.2 должен быть выбран 1 объект инфраструктуры",
        description: (
          <div>
            Сейчас выбрано {infra.length}.{" "}
            <Button
              onClick={() => {
                setSelectedInfra([infra[0]]);
                callForClusters([infra[0]]);
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
          <Button
            loading={isLoading}
            type="primary"
            onClick={() => callForClusters()}
          >
            Вычислить кластеры
          </Button>
        </Panel>
      </Collapse>
    </Space>
  );
});
