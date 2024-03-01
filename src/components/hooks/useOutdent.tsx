import { FlatNode } from "../../util/flattenTree"
import { TreeNodeData } from "../../util/buildTree";
import { useUpdateNode } from "../../graphql/hooks";
import { extractNodeData } from "../../util/extractNodeData";
import { computeOrder } from "./useInsertAt";
import { findSiblings } from "../../util/findNode";

export const useOutdent = (flatTree: FlatNode[], nodeTree: TreeNodeData[])=>{
    const {updateNode} = useUpdateNode(); 
    const outDent = async(nodeToIndent: TreeNodeData)=>{
        const {_id, path} = nodeToIndent
        const nodeEntity = extractNodeData(nodeToIndent)

        const depth  = path.length; 

        let pointer = flatTree.findIndex((node)=>node.id === _id); 

        while (pointer > 0) { // Move pointer up tree until reach 0.
            pointer--
            const currNode = flatTree[pointer]; 
            if(currNode.path.length === depth-1){
                const siblings = findSiblings(currNode, nodeTree)
                const insertIndex = siblings.findIndex(node=>node._id === currNode.id)+1
                const result = updateNode({
                    _id,
                },{
                    ...nodeEntity,
                    parentId: currNode.parentId,
                    parentId_unset: currNode.parentId ? false : true, 
                    order: computeOrder(siblings, insertIndex).order
                })  
                return result; 
            }
            console.log('no indent')
        }
    }

    return {outDent}
}

 