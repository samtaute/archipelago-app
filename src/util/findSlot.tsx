import { DragMoveEvent, Active, Over } from "@dnd-kit/core";
import { TreeNodeData } from "./buildTree"
import { FlatNode } from "./flattenTree"

export function findSlot(
  event: DragMoveEvent,
  treeNodes: TreeNodeData[],
  flatTree: FlatNode[]
) {
  const { active, over } = event;

  //Validate event object to make sure it has active and over values
  if (active === null || over === null) {
    console.log("DragMoveEvent is missing active or over properties");
    console.log(event.over);

    return [];
  }

  // //Check that drop will not attempt to drop a node onto one of its children.
  // const activePathString = event.active.data.current!.path.toString();
  // const overPathString = over.data.current!.path.toString();

  // if (
  //   overPathString.slice(0, activePathString.length).includes(activePathString)
  // ) {
  //   console.log("circular");
  //   //reset state
  //   return [];
  // }

  const activeDepth = getDepth(active);
  const overPath = over.data.current!.path;

  const overDepth = overPath.length;

  //Determine whether active node is positioned at the top or bottom half of the over node
  const overYZone = getYZone(active, over); //returns 'top' or 'bottom'

  if (overYZone === "bottom") {
    //if cursor depth is higher than the depth of over node, return a slot definition that corresponds to the first child of over.
    if (activeDepth >= overDepth) {
      return [...over.data.current!.path, 0] as number[];
    } else {
      //Find index of over in flatTree
      let currIndex;
      for (let i = 0; i < flatTree.length; i++) {
        if (flatTree[i].id.toString() === over.id) {
          currIndex = i;
          break;
        }
      }
      if (!currIndex) return [];

      //set minDepth equal to the depth of the next node after over in flattenedTree
      let minDepth;
      if (currIndex === flatTree.length - 1) {
        minDepth = 0;
      } else {
        minDepth = flatTree[currIndex + 1].path.length;
      }

      //If next node is nested, return slot definition that points to the first child of over;
      if (minDepth > overDepth) {
        return [...overPath, 0] as number[];
      }

      let targetDepth = activeDepth + 1;
      if (targetDepth < minDepth) {
        targetDepth = minDepth;
      }

      //Slice path of overNode at targetDepth
      const targetPath = overPath.slice(0, targetDepth);
      //Increment the last index of targetPath
      //TODO: Investigate why this if check is necessary.
      if (targetPath.length !== 0) {
        targetPath.splice(
          targetPath.length - 1,
          1,
          targetPath[targetPath.length - 1] + 1
        );
      }

      return targetPath as number[];
    }
  } else if (overYZone === "top") {
    if (activeDepth < overDepth) {
      return overPath;
    } else {
      const minDepth = activeDepth;
      //Find index of over in flatTree
      let currIndex;
      for (let i = 0; i < flatTree.length; i++) {
        if (flatTree[i].id.toString() === over.id) {
          currIndex = i;
          break;
        }
      }
      if (!currIndex) return [];

      let slotPath;

      for (let i = currIndex - 1; i >= 0; i--) {
        if (flatTree[i].path.length <= minDepth) {
          const parent = getNodeByPath(treeNodes, flatTree[i].path);
          //checks if activeDepth is nested from targetPath
          if (activeDepth > flatTree[i].path.length) {
            slotPath = [...flatTree[i].path, 0];
          } else {
            //todo check this !
            slotPath = [...flatTree[i].path, parent!.children.length];
          }
          return slotPath;
        }
      }
      console.log("No slot found");
      return [];
    }
  }

  function getDepth(active: Active) {
    //calculate screen position of the center of the active element.
    const activeCenterX = active.rect.current.translated!.left  -8; 

    const pageLeftEdge = document
      .getElementById("page")
      ?.getBoundingClientRect().x;
    if (pageLeftEdge === undefined || activeCenterX === undefined) {
      console.log(pageLeftEdge);
      console.log("can't find depth");
      return -1;
    }
    const activeDepth = Math.floor((activeCenterX - pageLeftEdge) / 40);

    return activeDepth;
  }

  function getYZone(active: Active, over: Over) {
    const activeCenterY = active.rect.current.translated!.top + 9;
    const overCenterY = over!.rect.top + 22;

    const yZone = activeCenterY < overCenterY ? "top" : "bottom";

    return yZone;
  }

  function getNodeByPath(rootNodes: TreeNodeData[], path: number[]) {
    if (path.length === 0) {
      return null;
    } else {
      let target = rootNodes[path[0]];
      for (let i = 1; i < path.length; i++) {
        target = target.children[path[i]];
      }
      return target;
    }
  }
}
