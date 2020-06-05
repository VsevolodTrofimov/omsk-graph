import React from "react";
import { Space } from "antd";

import "./Accordion.css";
import { Selection } from "./Selection";
import { SectionOne } from "./SectionOne";
import { SectionTwo } from "./SectionTwo";

export default function Accordion() {
  return (
    <Space direction="vertical" className="section" size="large">
      <Selection />
      <SectionOne />
      <SectionTwo />
    </Space>
  );
}
