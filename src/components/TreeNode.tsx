import ExpandArrow from "./ui/ExpandArrow";
import TreeNodeBullet from "./TreeNodeBullet";
import TreeNodeText from "./TreeNodeText";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { TreeNodeData } from "../util/buildTree";

const TreeNode = ({
  nodeData,
  handleKeyDown,
  handleBlur,
  draggingNode,
  focusId,
  slotConfig
}: {
  nodeData: TreeNodeData;
  handleKeyDown: any,
  handleBlur: any,
  draggingNode: UniqueIdentifier;
  focusId: string|null; 
  slotConfig: {slotId: string, pos: string}|undefined
}) => {
  const { setNodeRef } = useDroppable({
    id: nodeData._id.toString(),
    data: {
      path: nodeData.path,
    },
  });

  const dragging = draggingNode === nodeData._id.toString();

  let slotActive = false; 
  const slotStyle: {
    top?: number,
    bottom?:number,
    left?: number,
  } = {};  

  if(slotConfig?.slotId === nodeData._id){
    slotActive = true; 
    if(slotConfig.pos === "bottom"){
      slotStyle.bottom = 0; 
    }else if (slotConfig.pos === "nested"){
      slotStyle.bottom = 0; 
      slotStyle.left = 50; 
    }else if (slotConfig.pos === "top"){
      slotStyle.top = 0; 
    }
  }

  const slotMarker = (
    <div className="slot-marker" style={slotStyle}></div>
  )

  const style = dragging
    ? {
        background: "rgba(240,240,240)",
      }
    : {};

  return (
    <div className="tree-node" style={style}>
      {slotActive && slotMarker}
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
              slotConfig={slotConfig}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TreeNode;
