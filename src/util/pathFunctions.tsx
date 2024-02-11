import { TreeNodeData } from "./buildTree";

//Returns all siblings of a node identified by its tree path. 
export function siblingsAtPath(slotPath: number[], treeNodes: TreeNodeData[]){
    let sibs = treeNodes; 
    for(let i = 0; i<slotPath.length-1; i++){
      sibs = sibs[slotPath[i]].children
    }
    return sibs; 
  }