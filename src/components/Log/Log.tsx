import { Node } from "../../gql/graphql"
const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
const formatter = new Intl.DateTimeFormat('en-US', options);


export const Log = ({completedNodes}: {completedNodes: Node[]}) =>{



    const dateNodeMap = createMap(completedNodes);
    //convert array to map

    return (
        <div>
            <div>Log</div>
            {completedNodes.map((node)=>{
                const date = new Date(node.completedDate)
                return (
                    <div>{formatter.format(date)}</div>
                )
            })}
        </div>
    )

}


//start here -- use formateed dated as map key.

function createMap(nodes: Node[]){
    const map = new Map()
    for (let i = 0; i < nodes.length; i ++){
        if(map.has(nodes[i].completedDate)){
            map[nodes[i].completedDate]
        }
    }
}