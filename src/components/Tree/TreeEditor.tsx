import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/realm-context";
import NodeTree from "./Tree";
import { useNodeSubtree } from "../../graphql/hooks";
import { TreeNodeData, buildTree } from "../../util/buildTree";
import { FlatNode, flattenTree } from "../../util/flattenTree";
import { useParams } from "react-router-dom";

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
