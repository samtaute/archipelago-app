import { TreeNodeData } from "./buildTree";
import { decrementLastElement } from "./pathFunctions";

export function createSlotConfig(slotPath: number[], nodeTree: TreeNodeData[]){
    const lastIdx = slotPath[slotPath.length-1];

    const targetNode = findNode(slotPath, nodeTree); 

    if (targetNode){
        return {
            slotId: targetNode._id,
            pos: "top"
        }
    }

    if (lastIdx > 0){
        const siblingPath = decrementLastElement(slotPath); 

        if(!siblingPath){
            console.log("No sibling path")
            return; 
        }
        const targetNode = findNode(siblingPath, nodeTree); 
        return {
            slotId: targetNode._id,
            pos: "bottom"
        }
    }else if (slotPath.length === 1 && lastIdx === 0){
        const targetNode = findNode([0], nodeTree); 

        return {
            slotId: targetNode._id,
            pos: "top"
        }
    }else if (lastIdx === 0){
        const parentPath = slotPath.slice(0,slotPath.length-1); 
        const targetNode = findNode(parentPath, nodeTree);

        return {
            slotId: targetNode._id, 
            pos: "nested"
        }
    }
}


export function findNode(path: number[], nodeTree: TreeNodeData[]) {
    let target = nodeTree[path[0]];
    for (let i = 1; i < path.length; i++) {
      target = target.children[path[i]];
    }
    return target;
  }