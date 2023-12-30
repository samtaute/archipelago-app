import { FlatNode} from "../definition";

const SlotMarker = ({ flatTree, slotPath }: { flatTree: FlatNode[]; slotPath: number[] }) => {  
  //Calculate Left Margin of Marker
  const left = 10+ (slotPath.length-1) * 40;

  //Calculate top

  function levelsFromTop() {
    let levels = 0;
    //iterate through all nodes in flatNode array
    for (let i = 0; i < flatTree.length; i++) {
        //check if current node path is equal to the slot path.
      if (flatTree[i].path.toString() === slotPath.toString()) {
        levels = i-1 ;
        return levels;
      }
      //check each index in node path. 
      //If index is higher than corresponding slotPath index, return index
      //If index is lower than corresponding slotPath index, break out of path index loop
      //if index is equal to corresponding slotPath, continue to next index in path (implied). 
      for (let j = 0; j < flatTree[i].path.length; j++) {
        if (flatTree[i].path[j] > slotPath[j]) {
          levels = i - 1;
          return levels;
        } 
        if (flatTree[i].path[j] < slotPath[j]){
            break; 
        }
      }
    }
    //return the length of the flatNode array if traversal is complete.
    return flatTree.length - 1;
  }

  const levels = levelsFromTop()+1;
  const top = levels * 28; 
  const style = {
    left,
    top,
  };

  return <div className="slot-marker" style={style}></div>;
};

export default SlotMarker;