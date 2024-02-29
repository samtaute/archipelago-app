import { FlatNode } from "../../util/flattenTree"
import { TreeNodeData } from "../../util/buildTree";
import { useUpdateNode } from "../../graphql/hooks";
import { extractNodeData } from "../../util/extractNodeData";




export const useIndent = (flatTree: FlatNode[])=>{
    const {updateNode} = useUpdateNode(); 
    console.log("UseIndent processed")
    const indent = async(nodeToIndent: TreeNodeData)=>{
        const {_id, path} = nodeToIndent
        const nodeEntity = extractNodeData(nodeToIndent)

        const depth  = path.length; 

        let pointer = flatTree.findIndex((node)=>node.id === _id); 
        while (pointer > 0) { // Move pointer up tree until reach 0.
            pointer--
            const currNode = flatTree[pointer]; 
            if(currNode.path.length < depth){
                return; 
            }
            else if(currNode.path.length === depth){
                const result = updateNode({
                    _id, 
                },{
                    ...nodeEntity,
                    parentId: currNode.id,
                    order: 100
                })
                return result; 
            } else if (flatTree[pointer].path.length === depth + 1){
                const currNode = flatTree[pointer];

                const result = updateNode({
                    _id,
                },{
                    ...nodeEntity,
                    parentId: currNode.parentId, 
                    order: currNode.order + 100, 
                })
                return result; 
            }
        }


    }

    return {indent}
}