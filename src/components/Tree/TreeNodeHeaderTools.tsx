import { useUpdateNode } from "../../graphql/hooks";
import { TreeNodeData } from "../../util/buildTree";
import { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";

export const TreeNodeHeaderTools = ({
  nodeData,
}: {
  nodeData: TreeNodeData;
}) => {
  return (
    <div className="flex items-center justify-end h-8 absolute right-[100%] pr-1 gap-[2px]">
      <CheckBubble nodeData={nodeData} />
      <ExpandArrow nodeData={nodeData} />
      <Bullet nodeData={nodeData} />
    </div>
  );
};

const Bullet = ({ nodeData }: { nodeData: TreeNodeData }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: nodeData._id.toString(),
    data: {
      path: nodeData.path,
    },
  });

  const isCollapsed = localStorage
    .getItem("collapsedList")
    ?.includes(nodeData._id);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`h-4 w-4 rounded-full hover:bg-slate-200 ${
        isCollapsed ? "bg-slate-400" : ""
      }`}
    >
      <svg viewBox="0 0 16 16">
        <circle
          cx="8"
          cy="8"
          r="3"
          stroke="rgb(75, 81, 85)"
          strokeWidth="1"
          fill="rgb(75, 81, 85)"
        />
      </svg>
    </div>
  );
};

const ExpandArrow = ({ nodeData }: { nodeData: TreeNodeData }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const collapsedList = localStorage.getItem("collapsedList");
    setIsCollapsed(Boolean(collapsedList?.includes(nodeData._id)));
  }, [nodeData]);

  useEffect(() => {
    const handleStorageChange = () => {
      const collapsedList = localStorage.getItem("collapsedList")
        ? localStorage.getItem("collapsedList")
        : "";
      // const collapsedArr = collapsedList?.split(",");
      setIsCollapsed(collapsedList!.includes(nodeData._id));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [nodeData._id]);

  const handleNodeExpandedToggle = () => {
    const collapsedList = localStorage.getItem("collapsedList")
      ? localStorage.getItem("collapsedList")
      : "";

    if (collapsedList!.includes(nodeData._id) && nodeData.children.length > 0) {
      localStorage.setItem(
        "collapsedList",
        collapsedList!.replace(`${nodeData._id},`, "")
      );
      window.dispatchEvent(new Event("storage"));
    } else if (nodeData.children.length > 0) {
      localStorage.setItem(
        "collapsedList",
        collapsedList!.concat(`${nodeData._id},`)
      );
      window.dispatchEvent(new Event("storage"));
    }
  };

  if (nodeData.children.length === 0) {
    return;
  } else
    return (
      <div
        onClick={handleNodeExpandedToggle}
        className={`mx-[6px] h-4 w-4 p-1 ${isCollapsed ? "-rotate-90" : ""}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path
            fill="currentColor"
            d="M27.528 40.772c-1.617 2.99-5.915 2.966-7.499-.041L4.495 11.229C3.005 8.4 5.057 5 8.255 5h31.488c3.22 0 5.27 3.44 3.739 6.272z"
          />
        </svg>
      </div>
    );
};

const CheckBubble = ({ nodeData }: { nodeData: TreeNodeData }) => {
  const { updateNode } = useUpdateNode();

  const handleClick = () => {
    updateNode(
      {
        _id: nodeData._id,
      },
      {
        status: nodeData.status === "done" ? "todo" : "done",
      }
    );
  };

  return (
    <div
      onClick={handleClick}
      className="h-5 w-5 p-[2px] opacity-0 rounded-full hover:opacity-100 hover:bg-slate-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 512 512"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M416 128L192 384l-96-96"
        />
      </svg>
    </div>
  );
};

// const IconContainer = ({
//   children,
//   pos,
// }: React.PropsWithChildren<{ pos: number }>) => {
//   const left = 32 + 16 * pos;
//   console.log(left);

//   return (
//     <div className={`h-full w-8 flex items-center justify-center`}>
//       {children}
//     </div>
//   );
// };
