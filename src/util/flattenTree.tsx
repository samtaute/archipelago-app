import { TreeNodeData, FlatNode } from "../definition";

export function flattenTree(rootNodes: TreeNodeData[]){
    if(rootNodes === null){
        return []
    }
    const flattened = [] as FlatNode[];  

    for(const node of rootNodes){
        flattened.push({
            id: node._id,
            path: node.path,
            parentId: node.parentId,
        })
        for (const child of node.children){
            flattened.push(...flattenTree([child]))
        }
    }

    return flattened; 
}