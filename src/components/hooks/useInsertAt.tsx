import { useBulkWrite, useInsertNode} from "../../graphql/hooks";
import { TreeNodeData } from "../../util/buildTree";
import { findNode } from "../../util/createSlotConfig";
import { NodeInsertInput } from "../../gql/graphql";
import { useContext } from "react";
import { AppContext } from "../../contexts/realm-context";
import { BSON } from "realm-web";



export const useInsertAt = () => {
  const { insertNode } = useInsertNode();
  const {bulkWrite} = useBulkWrite(); 

  const app = useContext(AppContext);

  const insertAt = async (path: number[], tree: TreeNodeData[]) => {
    const parent = findNode(path.slice(0, -1), tree);
    const siblings = findSiblings(path, tree);

    const { order, needsReset } = computeOrder(siblings, path[path.length - 1]);

    const insertData: NodeInsertInput = {
      text: " ",
      parentId: parent?._id ? parent._id : null, 
      order: order,
      ownerId: app?.currentUser?.id,
      status: "todo",
      _id: new BSON.ObjectId().toString(), 
    };

    if (needsReset) {
      const upsertDocs: (NodeInsertInput)[] = [...siblings].map((node)=>{
        return {
            _id: node._id, 
            text: node.text,
            parentId: node.parentId,
            order: node.order, 
            status: node.status,
            ownerId: app?.currentUser?.id
        }
      })
      upsertDocs.splice(path[path.length - 1], 0, insertData);
      for (let i = 0; i < upsertDocs.length; i++) {
        upsertDocs[i].order = 100 + i * 100;
      }
      //todo: Do I need to await this?  
      await bulkWrite(upsertDocs); 
      return {_id: insertData._id}
    } else {
      const result = await insertNode(insertData);
      return result;
    }
  };

  return { insertAt };
};

function findSiblings(path: number[], tree: TreeNodeData[]) {
  return path.length <= 1 ? tree : findNode(path.slice(0, -1), tree).children;
}

export function computeOrder(rawSiblings: TreeNodeData[], index: number) {
  const siblings = rawSiblings.map((node) => node.order);

  let order;
  let needsReset;
  if (siblings.length === 0) {
    order = 100;
    needsReset = false;
  } else if (index === 0) {
    order = Math.floor(siblings[0] / 2);
    needsReset = order <= 4;
  } else if (index === siblings.length) {
    order = siblings[siblings.length - 1] + 100;
    needsReset = false;
  } else {
    order = Math.floor(
      siblings[index - 1] + (siblings[index] - siblings[index - 1]) / 2
    );
    needsReset = siblings[index] - siblings[index - 1] <= 4;
  }

  return { order, needsReset };
}
