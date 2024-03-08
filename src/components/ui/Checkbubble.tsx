import { useUpdateNode } from "../../graphql/hooks";
import { TreeNodeData } from "../../util/buildTree";

export const CheckBubble = ({
  nodeData,
  draggingNode,
}: {
  nodeData: TreeNodeData;
  draggingNode: string|null;
}) => {
  const {updateNode} = useUpdateNode()
  const {status} = nodeData

  const clickHandler = async () => {
    await updateNode(
      {
        _id: nodeData._id,
      },
      {
        _id: nodeData._id,
        text: nodeData.text,
        parentId: nodeData.parentId,
        ownerId: nodeData.ownerId,
        status: status === "todo" ? "done" : "todo",
        order: nodeData.order,
      }
    );
  };

  return (
    <div
      className={`rounded-full bg-slate-200 p-1 hidden h-[20px] align-middle opacity-50 hover:opacity-100 ${!draggingNode ? "group-hover:block" : ""}`}
      onClick={clickHandler}
    >
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-full"
      >
        <path
          d="M13 1L4.6 11L1 7"
          stroke="#0a0a0a"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
