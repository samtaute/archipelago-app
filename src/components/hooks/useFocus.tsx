import { useState } from "react";
import { TreeNodeData } from "../../util/buildTree";
import { FlatNode } from "../../util/flattenTree";

export const useFocus = (flatTree: FlatNode[]) => {
  const [focusId, setFocusId] = useState("");

  const focusUp = (nodeData: TreeNodeData) => {
    const nodeList = getVisibleNodes(); 

    let targetIdx = flatTree.findIndex((nd) => {
      return nd.id === nodeData._id;
    });
    console.log(targetIdx)
    
    while (targetIdx > 0) {
      targetIdx--;
      const currNodeId = flatTree[targetIdx].id;
      if (nodeList.includes(currNodeId)) {
        console.log("found")
        setFocusId(currNodeId);
        return;
      }
    }
  };

  const focusDown = (nodeData: TreeNodeData) => {
    const nodeList = getVisibleNodes(); 

    let targetIdx = flatTree.findIndex((nd) => {
      return nd.id === nodeData._id;
    });
    while (targetIdx < flatTree.length-1) {
      targetIdx++;
      const currNodeId = flatTree[targetIdx].id;
      if (nodeList.includes(currNodeId)) {
        setFocusId(currNodeId);
        return;
      }
    }
  };
  return {focusId, setFocusId, focusDown, focusUp}
};


function getVisibleNodes(){
    const visibleNodes = document.querySelectorAll("div.tree-node");

    const nodeList: string[] = [];
    visibleNodes.forEach((node) => nodeList.push(node.id));
    return nodeList; 
}