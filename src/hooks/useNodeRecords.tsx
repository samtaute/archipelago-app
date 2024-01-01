import { useState, useEffect } from "react";
import { useCollection } from "./useCollection";
import { DatabaseNodeRecord } from "../definition";
import { useWatch } from "./useWatch";
import { BSON } from "realm-web";

export function useNodeRecords() {
  const [nodeRecords, setNodeRecords] = useState([] as DatabaseNodeRecord[]);
  const [loading, setLoading] = useState(true);

  const nodeCollection = useCollection({
    cluster: "mongodb-atlas",
    db: "archipelago-prod",
    collection: "nodes",
  });

  useEffect(() => {
    let shouldUpdate = true;
    console.log(nodeCollection)
    const fetchTreeNodes = nodeCollection!.find({});
    if (shouldUpdate) {
      fetchTreeNodes.then((fetchedNodes) => {
        setNodeRecords(fetchedNodes);
        setLoading(false);
      });
    }
    return () => {
      shouldUpdate = false;
    };
  }, [nodeCollection]);

  useWatch(nodeCollection, {
    onUpdate: (change: Realm.Services.MongoDB.UpdateEvent<any>) => {
      setNodeRecords((oldNodeRecords) => {
        if (loading) {
          return oldNodeRecords;
        }
        const idx = oldNodeRecords.findIndex((node) => {
          return node._id.toString() === change.fullDocument._id.toString();
        });

        const clone = [...oldNodeRecords]
        clone.splice(idx,1,change.fullDocument)
        return clone; 
      });
    },
    onInsert: (change: Realm.Services.MongoDB.InsertEvent<any>)=>{
      setNodeRecords((oldNodeRecords)=>{
        return [...oldNodeRecords, change.fullDocument]
      })
    },
    onDelete: (change: Realm.Services.MongoDB.DeleteEvent<any>)=>{
      setNodeRecords((oldNodeRecords)=>{
        let updatedRecords=[...oldNodeRecords]
        deleteRecord(change.documentKey._id)

        function deleteRecord(id: BSON.ObjectId){
          updatedRecords = updatedRecords.filter((node)=>{return !node._id.equals(id)})
          for(const record of updatedRecords.filter((rec)=>rec.parentId?.equals(change.documentKey._id))){
            deleteRecord(record._id)
          }
        }
        return updatedRecords; 
      })
    }

  });

  const updateNodeRecord = async (record: any) => {
    await nodeCollection?.updateOne(
      { _id: record._id },
      {
        $set: {
          text: record.text,
          parentId: record.parentId,
          order: record.order,
        },
      }
    );
  };

  const insertNodeRecord = async(record: any)=>{
    await nodeCollection?.insertOne({
      ...record
    })
  }

  const deleteNodeRecord = async(recordId: BSON.ObjectId)=>{
    await nodeCollection?.deleteOne({
      _id: recordId,
    })

    for(const record of nodeRecords.filter((rec)=>rec.parentId?.equals(recordId))){
      deleteNodeRecord(record._id)
    }

    
    // const doc = {
    //   $or: [
    //     {
    //       _id: recordId,
    //     },
    //     {
    //       parentId: recordId,
    //     }
    //   ]
    // }
    // await nodeCollection?.deleteMany(doc)
  }

  return {
    loading,
    nodeRecords,
    updateNodeRecord,
    insertNodeRecord,
    deleteNodeRecord,
  };
}
