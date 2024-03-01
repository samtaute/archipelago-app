import { useDeleteNode, useUpdateNode } from "../graphql/hooks";
import { useContext, useState } from "react";
import { DndContext, DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { AppContext } from "../contexts/realm-context";
import TreeNode from "./TreeNode";
import { findSlot } from "../util/findSlot";
import { TreeNodeData } from "../util/buildTree";
import { createSlotConfig } from "../util/createSlotConfig";
import { FlatNode } from "../util/flattenTree";
import { useNavigate } from "react-router-dom";
import { useInsertAt } from "./hooks/useInsertAt";
import { useMoveToSlot } from "./hooks/useMoveTo";
import { findNode } from "../util/findNode";
import { useIndent } from "./hooks/useIndent";
import { useOutdent } from "./hooks/useOutdent";
import { useFocus } from "./hooks/useFocus";

type NodeTreeProps = {
  nodeTree: TreeNodeData[];
  flatTree: FlatNode[];
};

const NodeTree = ({ nodeTree, flatTree }: NodeTreeProps) => {
  const app = useContext(AppContext);
  const navigate = useNavigate();

  //CRUD hooks
  const { insertAt } = useInsertAt();
  const { moveToSlot } = useMoveToSlot();
  const { indent } = useIndent(flatTree);
  const { outDent } = useOutdent(flatTree, nodeTree);

  const { updateNode } = useUpdateNode();
  const { deleteNode } = useDeleteNode(app?.currentUser?.id);

  //UI state
  const [draggingNode, setDraggingNode] = useState("");
  const [slotPath, setSlotPath] = useState<number[]>([]);

  const {focusId, setFocusId, focusDown, focusUp} = useFocus(flatTree)

  function resetTree() {
    //Used in handlers to reset UI state
    setDraggingNode("");
    setSlotPath([]);
    setFocusId("");
  }

  let slotConfig: { slotId: string; pos: string } | undefined;
  if (slotPath.length > 0) {
    slotConfig = createSlotConfig(slotPath, nodeTree);
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

  //DRAG HANDLERS
  function handleDragStart() {
    //do nothing for now
  }

  function handleDragMove(event: DragMoveEvent) {
    setDraggingNode(event.active.id as string);

    if (event.collisions && event.collisions.length > 0) {
      const targetedSlot = findSlot(event, nodeTree, flatTree);
      setSlotPath(targetedSlot);
    }
  }
  async function handleDragEnd(event: DragEndEvent) {
    handleNoDrag(event); //Expands node if user has clicked without dragging.

    if (slotIsValid()) {
      const targetNode = findNode(event.active!.data!.current!.path, nodeTree);

      moveToSlot(slotPath, targetNode, nodeTree);
    }

    resetTree();
    function handleNoDrag(event: DragEndEvent) {
      if (event.active.id === event.over?.id && draggingNode === "") {
        navigate("/" + event.active.id.toString());
      }
    }

    function slotIsValid() {
      if (
        slotPath
          .toString()
          .slice(0, event.active.data.current!.path.toString().length)
          .includes(event.active.data.current!.path.toString())
      ) {
        resetTree();
        return false;
      }
      if (slotPath.length === 0) {
        return false;
      }

      return true;
    }
  }
  //

  //KEYPRESS HANDLERS
  async function handleKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
    nodeData: TreeNodeData
  ) {
    if (event.key === "Enter") {
      event.preventDefault();

      //Generate insertPath
      const insertPath = [...nodeData.path];
      insertPath[insertPath.length - 1]++;

      //get id of inserted node and set as focus
      const { _id } = await insertAt(insertPath, nodeTree);
      setFocusId(_id);
    } else if (event.key === "Backspace") {
      const selection = window.getSelection();

      if (
        selection?.anchorOffset === 0 &&
        nodeTree.length + nodeTree[0].children.length > 1
      ) {
        event.preventDefault();
        deleteNode({
          _id: nodeData._id,
        });

      }
    } else if (event.key === "Tab" && event.shiftKey === false) {
      event.preventDefault();
      const temp = {...nodeData, text: event.currentTarget.innerHTML}
      indent(temp);
    } else if (event.key === "Tab" && event.shiftKey === true) {
      const temp = {...nodeData, text: event.currentTarget.innerHTML}
      outDent(temp);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusUp(nodeData)
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      focusDown(nodeData); 
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
          status: nodeData.status,
        }
      );
    }
  }
};

export default NodeTree;
