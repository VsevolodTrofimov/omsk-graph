import React from "react";
import { Space, Typography } from "antd";

import "./Accordion.css";
import { Selection } from "./Selection";
import { SectionOne } from "./SectionOne";
import { SectionTwo } from "./SectionTwo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { activeTaskAtom } from "../../store/general";
import { selectedHousesState, selectedInfraState } from "../../store/selection";

const ActiveTask = () => {
  const activeTask = useRecoilValue(activeTaskAtom);
  return (
    activeTask && (
      <Typography.Text>Активное задание {activeTask}</Typography.Text>
    )
  );
};

export default function Accordion() {
  const setActiveTask = useSetRecoilState(activeTaskAtom);
  const selectedHouses = useRecoilValue(selectedHousesState);
  const selectedInfra = useRecoilValue(selectedInfraState);

  React.useEffect(() => {
    setActiveTask(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[...selectedHouses, ...selectedInfra].join(",")]);

  return (
    <Space direction="vertical" className="section" size="large">
      <ActiveTask />
      <Selection />
      <SectionOne />
      <SectionTwo />
    </Space>
  );
}
