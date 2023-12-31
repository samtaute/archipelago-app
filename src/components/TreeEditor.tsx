import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import TreeNode from "./TreeNode";
import { DatabaseNodeRecord, TreeNodeData } from "../definition.ts";
import { buildTree } from "../util/buildTree.tsx";
import { useState } from "react";
import { flattenTree } from "../util/flattenTree.tsx";
import { findSlot } from "../util/findSlot.tsx";
import SlotMarker from "./SlotMarker.tsx";
import { siblingsAtPath } from "../util/pathFunctions.tsx";
import { BSON } from "realm-web";


// The TreeEditor performs the following:
//      1. Defines the drag and drop handlers and passes them to the DnDContext
//      2. Wraps the slot marker, which is positioned absolutely in relation to the "page" div.
//      3. Renders the RootNode from the tree-context.

const TreeEditor = ({
  data,
  updateNodeRecord,
  insertNodeRecord,
  deleteNodeRecord,
}: {
  data: DatabaseNodeRecord[];
  updateNodeRecord: (record: any) => Promise<void>;
  insertNodeRecord: (record: any) => Promise<void>;
  deleteNodeRecord: (recordId: any) => Promise<void>;
}) => {
  //Create rootNodes and flatTree
  const treeNodes = buildTree(data);
  const flatTree = flattenTree(treeNodes);
  //TreeEditor State
  const [draggingNode, setDraggingNode] = useState<UniqueIdentifier>("");
  const [slotPath, setSlotPath] = useState<number[]>([]);
  const [focusId, setFocusId]=useState<BSON.ObjectId|null>(null)

  const handleTabPress = (node: TreeNodeData) => {
    const startingDepth = node.path.length;
    let pointerIdx = flatTree.findIndex((fNode) => fNode.id.equals(node._id));

    while (pointerIdx > 0) {
      pointerIdx--;
      if (flatTree[pointerIdx].path.length === startingDepth) {
        updateNodeRecord({
          ...node,
          parentId: flatTree[pointerIdx].id,
          order: 100,
        });
        return;
      } else if (flatTree[pointerIdx].path.length === startingDepth + 1) {
        const siblings = siblingsAtPath(flatTree[pointerIdx].path, treeNodes);
        updateNodeRecord({
          ...node,
          parentId: flatTree[pointerIdx].parentId,
          order: calculateOrder(
            siblings,
            flatTree[pointerIdx].path[flatTree[pointerIdx].path.length - 1 + 1]
          ),
        });
      }
    }
    console.log("no suitable tab slots");
  };

  const handleShiftTabPress = (node: TreeNodeData) => {
    const startingDepth = node.path.length;
    let pointerIdx = flatTree.findIndex((fNode) => fNode.id.equals(node._id));

    while (pointerIdx > 0) {
      pointerIdx--;
      if (flatTree[pointerIdx].path.length === startingDepth - 1) {
        const siblings = siblingsAtPath(flatTree[pointerIdx].path, treeNodes);
        updateNodeRecord({
          ...node,
          parentId: flatTree[pointerIdx].parentId,
          order: calculateOrder(
            siblings,
            flatTree[pointerIdx].path[flatTree[pointerIdx].path.length - 1 + 1]
          ),
        });
      }
    }
    console.log("no suitable shift-tab");
  };

  //Handlers for DnDContext
  const handleDragStart = (event: DragStartEvent) => {
    setDraggingNode(event.active.id);
  };

  const handleDragMove = (event: DragMoveEvent) => {
    if (event.collisions && event.collisions.length > 0) {
      const targetedSlot = findSlot(event, treeNodes, flatTree);
      setSlotPath(targetedSlot);
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    if(slotPath.toString().slice(0, event.active.data.current!.path.toString().length).includes(event.active.data.current!.path.toString())){
      console.log("circular")
      //todo: wrrap this in a function. it repeats below. 
      setDraggingNode("");
      setSlotPath([]);
      return; 
    }
    const draggedNode = findNode(event.active!.data!.current!.path);
    const draggedNodeId = draggedNode._id;

    let draggedNodeParentId;
    if (slotPath.length === 1) {
      draggedNodeParentId = null;
    } else {
      draggedNodeParentId = findNode(
        slotPath.slice(0, slotPath.length - 1)
      )._id;
    }

    const lastSlotIdx = slotPath[slotPath.length - 1];
    const siblingsOrders = siblingsAtPath(slotPath)
      .map((sib) => {
        return sib.order;
      })
      .sort();

    let updatedOrder;
    if (siblingsOrders.length === 0) {
      updatedOrder = 100;
    } else if (lastSlotIdx === 0) {
      updatedOrder = siblingsOrders[0] / 2;
    } else if (lastSlotIdx === siblingsOrders.length) {
      updatedOrder = siblingsOrders[siblingsOrders.length - 1] * 2;
    } else {
      updatedOrder =
        siblingsOrders[lastSlotIdx - 1] +
        (siblingsOrders[lastSlotIdx] - siblingsOrders[lastSlotIdx - 1]) / 2;
    }

    updatedOrder = Math.floor(updatedOrder);

    function siblingsAtPath(slotPath: number[]) {
      let sibs = treeNodes;
      for (let i = 0; i < slotPath.length - 1; i++) {
        sibs = sibs[slotPath[i]].children;
      }
      return sibs;
    }

    updateNodeRecord({
      _id: draggedNodeId,
      order: updatedOrder,
      parentId: draggedNodeParentId,
      text: draggedNode.text,
    });

    //Reset States
    setDraggingNode("");
    setSlotPath([]);

    if (
      siblingsOrders[lastSlotIdx] - siblingsOrders[lastSlotIdx - 1] <= 2 ||
      updatedOrder <= 2
    ) {
      updateOrders(siblingsAtPath(slotPath));
    }

    function findNode(path: number[]) {
      let target = treeNodes[path[0]];
      for (let i = 1; i < path.length; i++) {
        target = target.children[path[i]];
      }
      return target;
    }
    function updateOrders(siblings: TreeNodeData[]) {
      for (let i = 0; i < siblings.length; i++) {
        updateNodeRecord({
          _id: siblings[i]._id,
          order: i * 100,
          parentId: siblings[i].parentId,
          text: siblings[i].text,
        });
      }
    }
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>, nodeData: TreeNodeData) {
    if (event.key === "Enter") {
      event.preventDefault();

      const siblings = siblingsAtPath(nodeData.path, treeNodes);
      const targetIdx = nodeData.path[nodeData.path.length - 1] + 1;

      insertNodeRecord({
        parentId: nodeData.parentId,
        order: calculateOrder(siblings, targetIdx),
        text: "",
      });
    } else if (event.key === "Backspace") {
      // if cursor at first position:
      //deletecurrentNode
      const selection = window.getSelection();
      if (selection?.anchorOffset === 0) {
        event.preventDefault();
        deleteNodeRecord(nodeData._id);
      }
    } else if (event.key === "Tab" && event.shiftKey === false) {
      console.log(event);
      event.preventDefault();
      handleTabPress(nodeData);
    } else if (event.key === "Tab" && event.shiftKey === true) {
      event.preventDefault();
      handleShiftTabPress(nodeData);
    } else if (event.key === "ArrowUp"){
      event.preventDefault();
      const targetIdx = flatTree.findIndex((nd)=>nd.id.equals(nodeData._id))
      console.log(targetIdx)
      if(targetIdx > 0){
        setFocusId(flatTree[targetIdx-1].id)
      }
    } else if (event.key==="ArrowDown"){
      event.preventDefault(); 
      const targetIdx = flatTree.findIndex((nd)=>nd.id.equals(nodeData._id))
      if(targetIdx < flatTree.length-1){
        console.log(flatTree[targetIdx+1].id.toString())
        setFocusId(flatTree[targetIdx+1].id)
      }
    }
    //calculateOrder takes an array of nodes and an index and returns an order value that can be used to add an item to the array at the desired index.
 
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>, nodeData: TreeNodeData) => {
    if (nodeData.text != event.currentTarget.innerHTML) {
      updateNodeRecord({
        _id: nodeData._id,
        order: nodeData.order,
        text: event.currentTarget.innerHTML,
        parentId: nodeData.parentId,
      });
    }
  };
  
  function calculateOrder(
    siblings: TreeNodeData[] | DatabaseNodeRecord[],
    index: number
  ) {
    if (siblings.length === 0) return 100;

    //Map siblings to array or orders sorted in ascending order.
    const siblingOrders = siblings
      .map((sib) => {
        return sib.order;
      })
      .sort();

    //Execute logic for determining order. Reset orders of all sibling nodes if order diffs become too small.
    let order;
    let diff;
    if (index === 0) {
      order = Math.floor(siblingOrders[0] / 2);
      diff = siblingOrders[0];
    } else if (index >= siblingOrders.length) {
      order = Math.floor(siblingOrders[siblingOrders.length - 1] + 100);
    } else {
      diff = siblingOrders[index] - siblingOrders[index - 1];
      order = Math.floor(siblingOrders[index - 1] + diff / 2);
    }

    //Todo: This is a costly operation as it requires several database queries. Consider moving it somwhere else.
    if (diff && diff < 3) {
      for (let i = 0; i < siblings.length; i++) {
        updateNodeRecord({
          _id: siblings[i]._id,
          order: i * 100,
          parentId: siblings[i].parentId,
          text: siblings[i].text,
        });
      }
    }

    return order;
  }

  

  return (
    <div id="page">
      {slotPath.length > 0 && (
        <SlotMarker slotPath={slotPath} flatTree={flatTree} />
      )}
      <DndContext
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        {treeNodes.map((node) => {
          return (
            <TreeNode
              nodeData={node}
              key={node._id.toString()}
              handleKeyDown={handleKeyDown}
              handleBlur={handleBlur}
              focusId={focusId}
              draggingNode={draggingNode}
            />
          );
        })}
      </DndContext>
      {slotPath.toString()}
    </div>
  );
};

export default TreeEditor;
