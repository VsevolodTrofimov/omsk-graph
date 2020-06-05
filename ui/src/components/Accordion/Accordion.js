import React from "react";
import { Collapse, Typography, Space } from "antd";

import "./Accordion.css";
import { Selection } from "./Selection";
import { SectionOne } from "./SectionOne";

const { Panel } = Collapse;
const { Text } = Typography;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default function Accordion() {
  return (
    <Space direction="vertical" className="section" size="large">
      <Selection />
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
  );
}
