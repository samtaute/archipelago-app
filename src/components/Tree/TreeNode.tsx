import { UniqueIdentifier} from "@dnd-kit/core";
import { TreeNodeData } from "../../util/buildTree";
import { useEffect, useState } from "react";
import { TreeNodeHeader } from "./TreeNodeHeader";
import { TreeNodeChildren } from "./TreeNodeChildren";

const TreeNode = ({
  nodeData,
  handleKeyDown,
  handleBlur,
  draggingNode,
  focusId,
  slotConfig,
}: {
  nodeData: TreeNodeData;
  handleKeyDown: any;
  handleBlur: any;
  draggingNode: UniqueIdentifier;
  focusId: string | null;
  slotConfig: { slotId: string; pos: string } | undefined;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const collapsedList = localStorage.getItem("collapsedList");
    setIsCollapsed(Boolean(collapsedList?.includes(nodeData._id)));
  }, [nodeData]);

  useEffect(() => {
    const handleStorageChange = () => {
      const collapsedList = localStorage.getItem("collapsedList")
        ? localStorage.getItem("collapsedList")
        : "";
      // const collapsedArr = collapsedList?.split(",");
      setIsCollapsed(collapsedList!.includes(nodeData._id));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [nodeData._id]);

  const dragging = draggingNode === nodeData._id.toString();

  let slotActive = false;
  const slotStyle: {
    top?: number;
    bottom?: number;
    left?: number;
  } = {};

  if (slotConfig?.slotId === nodeData._id) {
    slotActive = true;
    if (slotConfig.pos === "bottom") {
      slotStyle.bottom = -4;
    } else if (slotConfig.pos === "nested") {
      slotStyle.bottom = -4;
      slotStyle.left = 40;
    } else if (slotConfig.pos === "top") {
      slotStyle.top = 0;
    }
  }

  const slotMarker = <div className="slot-marker" style={slotStyle}></div>;

 

  const style = dragging
    ? {
        background: "rgba(240,240,240)",
      }
    : {};

  return (
    <div className="relative block tree-node" style={style} id={nodeData._id}>
      <TreeNodeHeader nodeData={nodeData} handleBlur={handleBlur} handleKeyDown={handleKeyDown} focusId={focusId} />
      <TreeNodeChildren nodeData={nodeData} isCollapsed={isCollapsed}>
          {nodeData.children.map((node)=>{
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
            )
          })}
        </TreeNodeChildren>
      {slotActive && slotMarker}

    </div>
  );
};

export default TreeNode;


