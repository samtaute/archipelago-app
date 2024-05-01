import { TreeNodeData } from "../../util/buildTree";
import TreeNodeHeaderText from "./TreeNodeHeaderText";
import { useDroppable } from "@dnd-kit/core";
import { TreeNodeHeaderTools } from "./TreeNodeHeaderTools";

export const TreeNodeHeader = ({
  nodeData,
  handleBlur,
  handleKeyDown,
  focusId,
}: {
  nodeData: TreeNodeData;
  handleBlur: any;
  handleKeyDown: any;
  focusId: string | null;
}) => {
  const { setNodeRef } = useDroppable({
    id: nodeData._id.toString(),
    data: {
      path: nodeData.path,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="h-8 flex items-center relative ml-[-500px] pl-[532px]"
    >
      <HeaderContentContainer>
        <TreeNodeHeaderText
          nodeData={nodeData}
          handleBlur={handleBlur}
          handleKeyDown={handleKeyDown}
          focusId={focusId}
        />
        <TreeNodeHeaderTools nodeData={nodeData} />
      </HeaderContentContainer>
    </div>
  );
};

const HeaderContentContainer = ({ children }: React.PropsWithChildren) => {
  return <div className="h-full flex items-center relative">{children}</div>;
};
