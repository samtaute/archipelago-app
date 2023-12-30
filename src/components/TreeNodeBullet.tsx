import { useDraggable} from "@dnd-kit/core";
import { TreeNodeData } from "../definition";


const TreeNodeBullet = ({nodeData} : {nodeData: TreeNodeData}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: nodeData._id.toString(),
    data: {
        path: nodeData.path,
    }
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <a ref={setNodeRef} style={style} {...attributes} {...listeners} className="node-header-bullet">
      <svg width="18" height="18">
        <circle
          className="bullet"
          cx="9"
          cy="9"
          r="3.5"
          stroke="rgb(75, 81, 85)"
          strokeWidth="1"
          fill="rgb(75, 81, 85)"
        />
      </svg>
    </a>
  );
};

export default TreeNodeBullet;
