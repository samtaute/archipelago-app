import { useContext } from "react";
import { useUpdateNode } from "../../graphql/hooks";
import { TreeNodeData } from "../../util/buildTree";
import { findNode } from "../../util/createSlotConfig";
import { computeOrder } from "./useInsertAt";
import { AppContext } from "../../contexts/realm-context";

export const useMoveToSlot = () => {
  const { updateNode } = useUpdateNode();
  const app = useContext(AppContext); 

  const moveToSlot = async (
    path: number[],
    targetNode: TreeNodeData,
    tree: TreeNodeData[]
  ) => {
    const parent = findNode(path.slice(0, path.length - 1), tree); 
    const siblings =
      path.length > 1
        ? parent.children
        : tree;

    const {order, needsReset} = computeOrder(siblings, path[path.length-1])
    if(needsReset){
        //bulkwrite logic
    }else{
        updateNode({_id: targetNode._id}, {
            text: targetNode.text, 
            parentId: parent._id ? parent._id : null,
            order: order, 
            status: targetNode.status, 
            ownerId: app?.currentUser?.id
        })
    }

  };

  return { moveToSlot };
};
