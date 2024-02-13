import { useNavigate } from "react-router-dom";
import {
  useDeleteNode,
  useInsertNode,
  useNodes,
  useUpdateNode,
} from "../graphql/hooks";
import { useContext, useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { AppContext } from "../contexts/realm-context";
import { buildTree } from "../util/buildTree";
import { FlatNode, flattenTree } from "../util/flattenTree";
import TreeNode from "./TreeNode";
import { findSlot } from "../util/findSlot";
import { TreeNodeData } from "../util/buildTree";
import { Node } from "../gql/graphql";
import { siblingsAtPath } from "../util/pathFunctions";
import { createSlotConfig } from "../util/createSlotConfig";

const NodeTree = () => {
  const app = useContext(AppContext);
  const navigate = useNavigate();

  const { nodes, loading, error } = useNodes(app?.currentUser?.id);
  const { updateNode } = useUpdateNode();
  const { insertNode } = useInsertNode();
  const { deleteNode } = useDeleteNode(app?.currentUser?.id);

  const [creatingNode, setCreatingNode] = useState(false); 

  const [draggingNode, setDraggingNode] = useState("");
  const [slotPath, setSlotPath] = useState<number[]>([]);
  const [focusId, setFocusId] = useState("");

  let nodeTree = [] as TreeNodeData[];
  let flatTree = [] as FlatNode[];
  let slotConfig: { slotId: string; pos: string } | undefined;

  if (nodes) {
    nodeTree = buildTree(nodes);
    flatTree = flattenTree(nodeTree);
  }
  if (slotPath.length > 0) {
    slotConfig = createSlotConfig(slotPath, nodeTree);
  }

  useEffect(() => {
    if (!app?.currentUser) {
      setFocusId(""); //Todo remove this
      navigate("/login");
    }
  }, [navigate, app]);

  useEffect(()=>{
    if(nodes?.length === 0 && !creatingNode){
      setCreatingNode(true); 
      handleStart()
    }
    setCreatingNode(false); 
    async function handleStart(){
      await insertNode({
        parentId: null,
        text: "",
        order: 100,
        ownerId: app?.currentUser?.id,
      });
    }
  
  }, [app, insertNode, nodes, creatingNode])

  if (error) {
    return <div>Encountered an Error</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div id="page">
      <DndContext
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        {nodeTree.map((node) => {
          return (
            <TreeNode
              nodeData={node}
              key={node._id}
              handleKeyDown={handleKeyDown}
              handleBlur={handleBlur}
              focusId={focusId}
              draggingNode={draggingNode}
              slotConfig={slotConfig}
            />
          );
        })}
      </DndContext>
      {slotPath.toString()}
    </div>
  );

  //drag handlers
  function handleDragStart(event: DragStartEvent) {
    setDraggingNode(event.active.id as string);
  }
  function handleDragMove(event: DragMoveEvent) {
    if (event.collisions && event.collisions.length > 0) {
      const targetedSlot = findSlot(event, nodeTree, flatTree);
      setSlotPath(targetedSlot);
    }
  }

  //handleDragEnd updates the node being dragged based on the current slot path.
  async function handleDragEnd(event: DragEndEvent) {
    if (
      slotPath
        .toString()
        .slice(0, event.active.data.current!.path.toString().length)
        .includes(event.active.data.current!.path.toString())
    ) {
      console.log("circular");
      //todo: wrrap this in a function. it repeats below.
      setDraggingNode("");
      setSlotPath([]);
      return;
    }
    const draggedNode = findNode(event.active!.data!.current!.path);
    const draggedNodeId = draggedNode._id;

    let draggedNodeParentId;
    if (slotPath.length === 1) {
      console.log("path");
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
      let sibs = nodeTree;
      for (let i = 0; i < slotPath.length - 1; i++) {
        sibs = sibs[slotPath[i]].children;
      }
      return sibs;
    }

    await updateNode(
      {
        _id: draggedNodeId,
      },
      {
        order: updatedOrder,
        parentId: draggedNodeParentId,
        text: draggedNode.text,
        parentId_unset: !draggedNodeParentId ? true : false,
        ownerId: app?.currentUser?.id,
      }
    );

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
      let target = nodeTree[path[0]];
      for (let i = 1; i < path.length; i++) {
        target = target.children[path[i]];
      }
      return target;
    }
    async function updateOrders(siblings: TreeNodeData[]) {
      for (let i = 0; i < siblings.length; i++) {
        await updateNode(
          {
            _id: siblings[i]._id,
          },
          {
            order: i * 100,
            parentId: siblings[i].parentId,
            text: siblings[i].text,
            ownerId: app?.currentUser?.id,
          }
        );
      }
    }
  }
  async function handleKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
    nodeData: TreeNodeData
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      const siblings = siblingsAtPath(nodeData.path, nodeTree);
      const targetIdx = nodeData.path[nodeData.path.length - 1] + 1;

      await insertNode({
        parentId: nodeData.parentId,
        text: "",
        order: await calculateOrder(siblings, targetIdx),
        ownerId: app?.currentUser?.id,
      });
    } else if (event.key === "Backspace") {
      const selection = window.getSelection();

      //Start here  -- why isn't this if check working.
      if (selection?.anchorOffset === 0 && nodes.length > 1) {
        event.preventDefault();
        await deleteNode({
          _id: nodeData._id,
        });
      }
    } else if (event.key === "Tab" && event.shiftKey === false) {
      event.preventDefault();
      const startingDepth = nodeData.path.length;
      let pointerIdx = flatTree.findIndex((fNode) => fNode.id === nodeData._id);

      while (pointerIdx > 0) {
        pointerIdx--;
        if (flatTree[pointerIdx].path.length === startingDepth) {
          await updateNode(
            {
              _id: nodeData._id,
            },
            {
              _id: nodeData._id,
              parentId: flatTree[pointerIdx].id,
              ownerId: app?.currentUser?.id,
              order: 100,
              text: event.currentTarget.innerHTML
                ? event.currentTarget.innerHTML
                : "",
            }
          );
          return;
        } else if (flatTree[pointerIdx].path.length === startingDepth + 1) {
          const siblings = siblingsAtPath(flatTree[pointerIdx].path, nodeTree);
          await updateNode(
            {
              _id: nodeData._id,
            },
            {
              _id: nodeData._id,
              text: nodeData.text ? nodeData.text : "",
              ownerId: app?.currentUser?.id,
              parentId: flatTree[pointerIdx].parentId,
              order: await calculateOrder(
                siblings,
                flatTree[pointerIdx].path[
                  flatTree[pointerIdx].path.length - 1 + 1
                ]
              ),
            }
          );
        }
      }
      console.log("no suitable tab slots");
    } else if (event.key === "Tab" && event.shiftKey === true) {
      const startingDepth = nodeData.path.length;
      let pointerIdx = flatTree.findIndex((fNode) => fNode.id === nodeData._id);

      while (pointerIdx > 0) {
        pointerIdx--;
        if (flatTree[pointerIdx].path.length === startingDepth - 1) {
          const siblings = siblingsAtPath(flatTree[pointerIdx].path, nodeTree);
          await updateNode(
            {
              _id: nodeData._id,
            },
            {
              _id: nodeData._id,
              text: event.currentTarget.innerHTML
                ? event.currentTarget.innerHTML
                : "",
              parentId: flatTree[pointerIdx].parentId,
              parentId_unset: !flatTree[pointerIdx].parentId ? true : false,
              order: await calculateOrder(
                siblings,
                flatTree[pointerIdx].path[
                  flatTree[pointerIdx].path.length - 1 + 1
                ]
              ),
            }
          );
          return;
        }
      }
      console.log("no suitable shift-tab");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const targetIdx = flatTree.findIndex((nd) => {
        return nd.id === nodeData._id;
      });
      if (targetIdx > 0) {
        setFocusId(flatTree[targetIdx - 1].id);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const targetIdx = flatTree.findIndex((nd) => nd.id === nodeData._id);
      if (targetIdx < flatTree.length - 1) {
        setFocusId(flatTree[targetIdx + 1].id);
      }
    }
  }
  async function handleBlur(
    event: React.FocusEvent<HTMLDivElement>,
    nodeData: TreeNodeData
  ) {
    //todo: is there a better way to fix this?
    const nodeText = nodeData.text ? nodeData.text : "";
    if (nodeText != event.currentTarget.innerHTML) {
      await updateNode(
        {
          _id: nodeData._id,
        },
        {
          text: event.currentTarget.innerHTML,
          order: nodeData.order,
          parentId: nodeData.parentId,
          ownerId: app?.currentUser?.id,
        }
      );
    }
  }
  async function calculateOrder(
    siblings: TreeNodeData[] | Node[],
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
        await updateNode(
          {
            _id: siblings[i]._id,
          },
          {
            _id: siblings[i]._id,
            order: i * 100,
            parentId: siblings[i].parentId,
            text: siblings[i].text,
            ownerId: app?.currentUser?.id,
          }
        );
      }
    }

    return order;
  }
};

export default NodeTree;
