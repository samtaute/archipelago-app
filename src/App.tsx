import TreeEditor from './components/TreeEditor'
import { useNodeRecords } from './hooks/useNodeRecords';


function App() {
  const {nodeRecords, updateNodeRecord, insertNodeRecord, deleteNodeRecord} = useNodeRecords(); 

  
  return (
    <div id="app">
        <TreeEditor data={nodeRecords} updateNodeRecord={updateNodeRecord} insertNodeRecord={insertNodeRecord} deleteNodeRecord={deleteNodeRecord}/>
    </div>
  )
}

export default App


