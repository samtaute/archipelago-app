import { useState } from "react";
import { useUpdateNode } from "../../graphql/hooks";
import { TreeNodeData } from "../../util/buildTree";

export const Checkbox = ({ nodeData }: { nodeData: TreeNodeData }) => {
  const [checked, setCheck] = useState(false);

  const { updateNode } = useUpdateNode();

  const clickHandler = async () => {
    await updateNode(
      {
        _id: nodeData._id,
      },
      {
        _id: nodeData._id,
        text: nodeData.text,
        parentId: nodeData.parentId,
        ownerId: nodeData.parentId,
        status: checked ? "todo" : "done",
        order: nodeData.order,
      }
    );

    setCheck(!checked);
  };

  return (
    <>
      {checked ? (
        <Checkmark onClick={clickHandler} />
      ) : (
        <EmptyCheckbox onClick={clickHandler} />
      )}
    </>
  );
};

export const EmptyCheckbox = ({ onClick }: { onClick: any }) => {
  return (
    <div onClick={onClick}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.75 1H3.25C2.00736 1 1 2.00736 1 3.25V16.75C1 17.9926 2.00736 19 3.25 19H16.75C17.9926 19 19 17.9926 19 16.75V3.25C19 2.00736 17.9926 1 16.75 1Z"
          stroke="black"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const Checkmark = ({ onClick }: { onClick: any }) => {
  return (
    <div onClick={onClick}>
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 1L4.6 11L1 7"
          stroke="#19C8EF"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
