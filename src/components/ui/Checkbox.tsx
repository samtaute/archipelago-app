import { useContext, useState } from "react";
import { useUpdateNode } from "../../graphql/hooks";
import { TreeNodeData } from "../../util/buildTree";
import { AppContext } from "../../contexts/realm-context";

export const Checkbox = ({ nodeData }: { nodeData: TreeNodeData }) => {
  const app = useContext(AppContext); 
  const [checked, setCheck] = useState(nodeData.status === "done");

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
        ownerId: app?.currentUser?.id,
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
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 1H2.5C1.67157 1 1 1.67157 1 2.5V11.5C1 12.3284 1.67157 13 2.5 13H11.5C12.3284 13 13 12.3284 13 11.5V2.5C13 1.67157 12.3284 1 11.5 1Z"
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
