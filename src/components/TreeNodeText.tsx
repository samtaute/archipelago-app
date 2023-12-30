import { DatabaseNodeRecord, TreeNodeData } from "../definition";
import { siblingsAtPath } from "../util/pathFunctions";

const TreeNodeText = ({
  nodeData,
  updateNodeRecord,
  insertNodeRecord,
  deleteNodeRecord,
  handleTabPress,
  handleShiftTabPress,
  rootNodes,
}: {
  nodeData: TreeNodeData;
  insertNodeRecord: (record: any) => Promise<void>;
  updateNodeRecord: (record: any) => Promise<void>;
  deleteNodeRecord: (recordId: any) => Promise<void>;
  handleTabPress: (node: TreeNodeData) => void;
  handleShiftTabPress: (node: TreeNodeData) => void;

  rootNodes: TreeNodeData[];
}) => {
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") {
      event.preventDefault();

      const siblings = siblingsAtPath(nodeData.path, rootNodes);
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
    }
    //calculateOrder takes an array of nodes and an index and returns an order value that can be used to add an item to the array at the desired index.
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
  }

  const blurHandler = (event: React.FocusEvent<HTMLDivElement>) => {
    if (nodeData.text != event.currentTarget.innerHTML) {
      updateNodeRecord({
        _id: nodeData._id,
        order: nodeData.order,
        text: event.currentTarget.innerHTML,
        parentId: nodeData.parentId,
      });
    }
  };
  return (
    <div
      className="node-header-text"
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{ __html: nodeData.text }}
      onBlur={blurHandler}
      onKeyDown={handleKeyDown}
    ></div>
  );
};

export default TreeNodeText;
