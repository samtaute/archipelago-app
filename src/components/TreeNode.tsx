import ExpandArrow from "./ui/ExpandArrow";
import TreeNodeBullet from "./TreeNodeBullet";
import TreeNodeText from "./TreeNodeText";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { TreeNodeData } from "../util/buildTree";
import { useEffect, useState } from "react";
import { CheckBubble } from "./ui/Checkbubble";

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
  const { setNodeRef } = useDroppable({
    id: nodeData._id.toString(),
    data: {
      path: nodeData.path,
    },
  });

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

  const handleNodeExpandedToggle = () => {
    const collapsedList = localStorage.getItem("collapsedList")
      ? localStorage.getItem("collapsedList")
      : "";

    if (collapsedList!.includes(nodeData._id) && nodeData.children.length > 0) {
      localStorage.setItem(
        "collapsedList",
        collapsedList!.replace(`${nodeData._id},`, "")
      );
      window.dispatchEvent(new Event("storage"));
    } else if (nodeData.children.length > 0) {
      localStorage.setItem(
        "collapsedList",
        collapsedList!.concat(`${nodeData._id},`)
      );
      window.dispatchEvent(new Event("storage"));
    }
  };

  const style = dragging
    ? {
        background: "rgba(240,240,240)",
      }
    : {};

  return (
    <div className="tree-node" style={style} id={nodeData._id}>
      {slotActive && slotMarker}
      <div className="node-header" ref={setNodeRef}>
        <div
          onClick={handleNodeExpandedToggle}
          className={`expand ${!isCollapsed ? "open" : ""}`}
        >
          <ExpandArrow />
        </div>
        <TreeNodeBullet nodeData={nodeData} />
        <div className="flex align-middle group">
          <TreeNodeText
            draggingNode={draggingNode.toString()}
            nodeData={nodeData}
            handleBlur={handleBlur}
            handleKeyDown={handleKeyDown}
            focusId={focusId}
          />
          <CheckBubble
            nodeData={nodeData}
            draggingNode={draggingNode.toString()}
          />
        </div>
      </div>
      <div className="node-children">
        {!isCollapsed &&
          nodeData.children.map((node) => {
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
