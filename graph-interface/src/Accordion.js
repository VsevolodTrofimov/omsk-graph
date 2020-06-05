import React from 'react'
import { Collapse } from 'antd';

export default function Accordion1() {
    const { Panel } = Collapse;

    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

    return (
        <div>
            <p className="sign"> Оценка удобства размещения объектов инфраструктуры города </p>
            <Collapse accordion>
                <Panel header="1.1 Ближайшие к узлам объекты" key="1" class="panel">
                    <p> Выберите узел на карте </p>
                </Panel>
                <Panel header="1.2 Минимальное расстояние до дальнего дома" key="2" />
                <Panel header="1.3 Сумма кратчайших расстояний" key="3" />
                <Panel header="1.4 Найти минимальное дерево кратчайших путей" key="4" />
            </Collapse>
            <p className="sign"> Планирование новых объектов </p>
            <Collapse accordion>
                <Panel header="2.1 Построить дерево кратчайших путей" key="5" >
                    <p>{text}</p>
                </Panel>
                <Panel header="2.2 Разбиение на кластеры" key="6">
                    <p>{text}</p>
                </Panel>
                <Panel header="2.3 Опции для кластеров" key="7">
                    <p>{text}</p>
                </Panel>
            </Collapse>
        </div>
    );
}
// export default function Accordion2() {
//     const { Panel } = Collapse;

//     const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;
//     return (

//         < Panel header="2.1 Построить дерево кратчайших путей" key="5" >
//             <p>{text}</p>
//         </Panel >
//         <Panel header="2.2 Разбиение на кластеры" key="6">
//             <p>{text}</p>
//         </Panel>
//         <Panel header="2.3 Опции для кластеров" key="7">
//             <p>{text}</p>
//         </Panel>
//         );
// }