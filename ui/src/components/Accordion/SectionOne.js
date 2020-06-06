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
import { activeTaskAtom } from "../../store/general";

const { Panel } = Collapse;
const { Text } = Typography;

export const SectionOne = () => {
  const [maxDistance, setMaxDistance] = useState(4000);
  const [maxTime, setMaxTime] = useState(15);
  const [isLoading, setIsLoading] = useState(false);

  const selectedHouses = useRecoilValue(selectedHousesState);
  const selectedInfra = useRecoilValue(selectedInfraState);
  const setPaths = useSetRecoilState(pathsAtom);
  const set11 = useSetRecoilState(task11Atom);
  const setTask = useSetRecoilState(activeTaskAtom);

  return (
    <Space direction="vertical" className="section" size="small">
      <Text>Оценка удобства размещения объектов инфраструктуры города</Text>
      <Collapse accordion>
        <Panel header="1.1 Ближайшие узлы и объекты" key="1" class="panel">
          <Space>
            В радиусе
            <InputNumber
              min={0}
              formatter={(value) =>
                `${value} м`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              value={maxDistance}
              onChange={setMaxDistance}
            />
            или
            <InputNumber
              min={0}
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

              if (result) {
                setPaths(result.paths);
                set11(result);
                setTask("1.1a");
              }
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
