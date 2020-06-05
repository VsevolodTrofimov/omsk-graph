import React from "react";

import { Node } from "./Node";

export const Nodes = React.memo((props) => {
  return (
    <React.Fragment>
      {Object.keys(props.nodes).map((nodeId) => (
        <Node
          key={nodeId}
          node={props.nodes[nodeId]}
          nodeType={props.nodeType}
          onClick={() => props.onNodeClick(nodeId)}
        />
      ))}
    </React.Fragment>
  );
});
