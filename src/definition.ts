import { BSON } from "realm-web"

export type TreeNodeData = {
    _id: BSON.ObjectId, 
    path: number[],
    order: number,
    text: string,
    parentId: BSON.ObjectId|null,
    children: TreeNodeData[], 
}

export type FlatNode = {
    id: BSON.ObjectId;
    path: number[];
    parentId: BSON.ObjectID|null; 
  };

export type DatabaseNodeRecord = {
    _id: BSON.ObjectID,
    order: number, 
    text: string,
    parentId: BSON.ObjectId|null,
}






