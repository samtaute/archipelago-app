import { Node } from "../gql/graphql"
import { TreeNodeData } from "./buildTree"

export const extractNodeData = (treeNode: TreeNodeData): Node =>{
    return {
        _id: treeNode._id, 
        parentId: treeNode.parentId,
        order: treeNode.order, 
        status: treeNode.status,
        text: treeNode.text,
        ownerId: treeNode.ownerId
    }

}