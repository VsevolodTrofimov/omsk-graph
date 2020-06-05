import React, { useState } from "react";
import {
  Collapse,
  Space,
  Button,
  Typography,
  InputNumber,
  Divider,
} from "antd";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { api } from "../../api";
import { selectedInfraState, selectedHousesState } from "../../store/selection";
import { pathsAtom } from "../../store/paths";
import { task11Atom } from "../../store/task11";

const { Panel } = Collapse;
const { Text } = Typography;

export const SectionTwo = () => {
  const [maxDistance, setMaxDistance] = useState(4000);
  const [maxTime, setMaxTime] = useState(15);
  const [isLoading, setIsLoading] = useState(false);

  const selectedHouses = useRecoilValue(selectedHousesState);
  const selectedInfra = useRecoilValue(selectedInfraState);
  const setPaths = useSetRecoilState(pathsAtom);
  const set11 = useSetRecoilState(task11Atom);

  return (
    <Space direction="vertical" className="section" size="small">
      <Text> Планирование новых объектов </Text>
      <Collapse accordion>
        <Panel header="2.1 Построить дерево кратчайших путей" key="1"></Panel>
        <Panel header="2.2-2.4 Разбиение на кластеры" key="2">
          <Button
            loading={isLoading}
            type="primary"
            onClick={async () => {
              setIsLoading(true);
              const result = await api("2.2-2.4", {
                houses: selectedHouses,
                infra: selectedInfra,
              });
              setIsLoading(false);
              console.log(result);
            }}
          >
            Вычислить кластеры
          </Button>
        </Panel>
      </Collapse>
    </Space>
  );
};
