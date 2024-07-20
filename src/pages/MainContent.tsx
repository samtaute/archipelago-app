import { PropsWithChildren, useContext } from "react";
import { Log } from "../components/Log/Log";
import { AppContext } from "../contexts/realm-context";
import { useNavigate } from "react-router-dom";
import { useInsertNode, useNodes } from "../graphql/hooks";
import { useEffect, useState } from "react";
import { TreeNodeData, buildTree } from "../util/buildTree";
import { FlatNode, flattenTree } from "../util/flattenTree";
import NodeTree from "../components/Tree/Tree";
import { Node } from "../gql/graphql";

export const MainContent = () => {
  const app = useContext(AppContext);
  const navigate = useNavigate();

  const [creatingNode, setCreatingNode] = useState(false);

  const { nodes, loading, error } = useNodes(app?.currentUser?.id);
  const { insertNode } = useInsertNode();

  


  useEffect(() => {
    if (!app?.currentUser) {
      navigate("/auth/login");
    }
  }, [navigate, app]);

  useEffect(() => {
    if (nodes?.length === 0 && !creatingNode) {
      setCreatingNode(true);
      handleStart();
    }
    setCreatingNode(false);
    async function handleStart() {
      await insertNode({
        parentId: null,
        text: "",
        order: 100,
        ownerId: app?.currentUser?.id,
      });
    }
  }, [app, insertNode, nodes, creatingNode]);

  let nodeTree: TreeNodeData[] = [];
  let flatTree: FlatNode[] = [];
  let completedNodes: Node[] = [];

  if (nodes) {
    nodeTree = buildTree(nodes)
    flatTree = flattenTree(nodeTree); 
    completedNodes = nodes.filter((node)=>node.status === "done")
  }

  if (error) {
    return <div>Encountered an Error</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto gap-2 flex relative p-8 justify-center items-stretch">
      <Pane>
        <NodeTree nodeTree={nodeTree} flatTree={flatTree}/>
      </Pane>
      <Pane>
        <Log completedNodes={completedNodes}/>
      </Pane>
    </div>
  );
};

export const Pane = ({ children }: PropsWithChildren) => {
  return <div className="border-2 w-[600px] p-2 relative">{children}</div>;
};
