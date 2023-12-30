import { DatabaseNodeRecord, TreeNodeData } from "../definition";

export function buildTree(databaseRecords: DatabaseNodeRecord[]) {
  //Create Map for quick reference
  const nodeMap = new Map();
  //Create array to be returned.
  const nodeCollection: TreeNodeData[] = [];

  //Add each record to nodeMap for quick reference
  for (const record of databaseRecords) {
    const newNode: TreeNodeData = {
      _id: record._id,
      text: record.text,
      path: [],
      parentId: record.parentId,
      children: [] as TreeNodeData[],
      order: record.order,
    };

    nodeMap.set(record["_id"].toString(), newNode);
  }

  for (const record of databaseRecords) {
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
