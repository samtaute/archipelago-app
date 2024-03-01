import { TreeNodeData } from "./buildTree";
import { FlatNode } from "./flattenTree";

export function findNode(path: number[], nodeTree: TreeNodeData[]) {
  console.log(path); 
  let target = nodeTree[path[0]];
  for (let i = 1; i < path.length; i++) {
    target = target.children[path[i]];
  }
  return target;
}

export function findSiblings(currNode: TreeNodeData|FlatNode, nodeTree: TreeNodeData[] ){
  const parent = findNode(currNode.path.slice(0, -1), nodeTree);
  const siblings = parent ? parent.children : nodeTree; 
  return siblings
}