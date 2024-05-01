import { TreeNodeData } from "../../util/buildTree";

export const TreeNodeChildren = ({
  nodeData,
  isCollapsed,
  children,
}: React.PropsWithChildren<{ nodeData: TreeNodeData; isCollapsed: boolean}>) => {
  if (nodeData.children.length === 0 || isCollapsed) {
    return;
  } else return <div className="ml-[19px] pl-[14px] relative border-l-2">{children}</div>;
};
 