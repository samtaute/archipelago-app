import { Node } from "../gql/graphql";

export interface TreeNodeData {
  _id: string;
  order: number;
  parentId: string;
  text: string | undefined;
  children: TreeNodeData[];
  path: number[];
}

export function buildTree(rawNodes: Node[]) {
  //Create Map for quick reference
  const nodeMap = new Map();
  //Create array to be returned.
  const nodeCollection: TreeNodeData[] = [];

  //Add each record to nodeMap for quick reference
  for (const record of rawNodes) {
    const newNode: TreeNodeData = {
      _id: record._id,
      text: record.text ? (record.text as string) : undefined,
      path: [],
      parentId: record.parentId,
      children: [] as TreeNodeData[],
      order: record.order ? (record.order as number) : 100,
    };

    nodeMap.set(record["_id"].toString(), newNode);
  }

  for (const record of rawNodes) {
    const { _id, parentId, order } = record;
    const newNode = nodeMap.get(_id.toString());
    if (!parentId) {
      //If the node has no parent, add it to top-level of the tree.
      const index = nodeCollection.findIndex((child) => {
        return child.order > order;
      });
      if (index === -1) {
        nodeCollection.push(newNode);
      } else nodeCollection.splice(index, 0, newNode);
    }
    if (parentId) {
      const parent = nodeMap.get(parentId.toString());
      if(!parent){
        nodeCollection.push(newNode)
      }
      if (parent) {
        const indexToInsert = parent.children.findIndex(
          (child: TreeNodeData) => child.order > order
        );
        if (indexToInsert === -1) {
          parent.children.push(newNode);
        } else {
          parent.children.splice(indexToInsert, 0, newNode);
        }
      }
    }
  }
  resetPaths(nodeCollection, []);

  return nodeCollection;
}

function resetPaths(collection: TreeNodeData[], basePath: number[]) {
  for (let i = 0; i < collection.length; i++) {
    collection[i].path = [...basePath, i];
    if (collection[i].children.length > 0) {
      resetPaths(collection[i].children, collection[i].path);
    }
  }
}
