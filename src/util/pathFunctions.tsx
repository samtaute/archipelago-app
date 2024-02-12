import { TreeNodeData } from "./buildTree";

//Returns all siblings of a node identified by its tree path. 
export function siblingsAtPath(slotPath: number[], treeNodes: TreeNodeData[]){
    let sibs = treeNodes; 
    for(let i = 0; i<slotPath.length-1; i++){
      sibs = sibs[slotPath[i]].children
    }
    return sibs; 
  }

//Decrements last element of an array. 
export function decrementLastElement(arr: number[]) {
  if (Array.isArray(arr) && arr.length > 0) {
    const copy = [...arr]
    copy[copy.length - 1] -= 1;
    return copy; 
  } else {
      console.log("Input is not a valid non-empty array.");
  }
}