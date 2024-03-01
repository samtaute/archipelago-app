import { TreeNodeData } from "./buildTree";

export interface FlatNode {
  id: string;
  path: number[];
  parentId: string | null;
  order: number
  children: string[]
}

export function flattenTree(rootNodes: TreeNodeData[]) {
  if (rootNodes === null) {
    return [];
  }
  const flattened = [] as FlatNode[];

  for (const node of rootNodes) {
    flattened.push({
      id: node._id,
      path: node.path,
      parentId: node.parentId,
      order: node.order,
      children: node.children.map((child)=>child._id)
    });
    for (const child of node.children) {
      flattened.push(...flattenTree([child]));
    }
  }

  return flattened;
}
