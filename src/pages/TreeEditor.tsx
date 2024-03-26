import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/realm-context";
import NodeTree from "../components/Tree";
import { useInsertNode, useNodeSubtree, useNodes } from "../graphql/hooks";
import { TreeNodeData, buildTree } from "../util/buildTree";
import { FlatNode, flattenTree } from "../util/flattenTree";
import { useParams } from "react-router-dom";

export const TreeEditor = () => {
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

  if (nodes) {
    nodeTree = buildTree(nodes);
    flatTree = flattenTree(nodeTree);
  }

  if (error) {
    return <div>Encountered an Error</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return <NodeTree nodeTree={nodeTree} flatTree={flatTree} />;
};

export const SubtreeEditor = () => {
  const app = useContext(AppContext);
  const navigate = useNavigate();
  const { nodeId } = useParams();

  const { nodes, loading, error } = useNodeSubtree(nodeId);
  let nodeTree: TreeNodeData[] = [];
  let flatTree: FlatNode[] = [];

  useEffect(() => {
    if (!app?.currentUser) {
      navigate("/login");
    }
  }, [navigate, app]);

  if (nodes) {
    nodeTree = buildTree(nodes);
    flatTree = flattenTree(nodeTree);
  }

  if (error) {
    navigate("/")
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return <NodeTree nodeTree={nodeTree} flatTree={flatTree} />;
};
