import { TreeNodeData } from "../definition";
import ExpandArrow from "./ui/ExpandArrow";
import TreeNodeBullet from "./TreeNodeBullet";
import TreeNodeText from "./TreeNodeText";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { BSON } from "realm-web";

const TreeNode = ({
  nodeData,
  handleKeyDown,
  handleBlur,
  draggingNode,
  focusId
}: {
  nodeData: TreeNodeData;
  handleKeyDown: any,
  handleBlur: any,
  draggingNode: UniqueIdentifier;
  focusId: BSON.ObjectId|null; 
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
          nodeData={nodeData}
          handleBlur={handleBlur}
          handleKeyDown={handleKeyDown}
          focusId={focusId}
        />
      </div>
      <div className="node-children">
        {nodeData.children.map((node) => {
          return (
            <TreeNode
              nodeData={node}
              key={node._id.toString()}
              handleBlur={handleBlur}
              handleKeyDown={handleKeyDown}
              draggingNode={draggingNode}
              focusId={focusId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TreeNode;
