import { TreeNodeData } from "../definition";
import ExpandArrow from "./ui/ExpandArrow";
import TreeNodeBullet from "./TreeNodeBullet";
import TreeNodeText from "./TreeNodeText";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";

const TreeNode = ({
  nodeData,
  updateNodeRecord,
  insertNodeRecord,
  deleteNodeRecord,
  handleTabPress,
  handleShiftTabPress,
  draggingNode,
  rootNodes,
}: {
  nodeData: TreeNodeData;
  updateNodeRecord: (record: any) => Promise<void>;
  insertNodeRecord: (record: any) => Promise<void>;
  deleteNodeRecord: (recordId: any) => Promise<void>;
  handleTabPress: (node: TreeNodeData) => void; 
  handleShiftTabPress: (node: TreeNodeData) => void; 
  draggingNode: UniqueIdentifier;
  rootNodes: TreeNodeData[];
}) => {
  const { setNodeRef } = useDroppable({
    id: nodeData._id.toString(),
    data: {
      path: nodeData.path,
    },
  });

  const dragging = draggingNode === nodeData._id.toString();

  const style = dragging
    ? {
        background: "rgba(240,240,240)",
      }
    : {};

  return (
    <div className="tree-node" style={style}>
      <div className="node-header" ref={setNodeRef}>
        <div className="expand">
          <ExpandArrow />
        </div>
        <TreeNodeBullet nodeData={nodeData} />
        <TreeNodeText
          rootNodes={rootNodes}
          nodeData={nodeData}
          insertNodeRecord={insertNodeRecord}
          updateNodeRecord={updateNodeRecord}
          deleteNodeRecord={deleteNodeRecord}
          handleTabPress={handleTabPress}
          handleShiftTabPress={handleShiftTabPress}
        />
      </div>
      <div className="node-children">
        {nodeData.children.map((node) => {
          return (
            <TreeNode
              nodeData={node}
              key={node._id.toString()}
              updateNodeRecord={updateNodeRecord}
              insertNodeRecord={insertNodeRecord}
              deleteNodeRecord={deleteNodeRecord}
              handleTabPress={handleTabPress}
              handleShiftTabPress={handleShiftTabPress}
              draggingNode={draggingNode}
              rootNodes={rootNodes}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TreeNode;
