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
    db: "nodes",
    collection: "myNodes",
  });

  useEffect(() => {
    let shouldUpdate = true;
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
        return oldNodeRecords.filter((node)=>{return !node._id.equals(change.documentKey._id)})
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
  }

  return {
    loading,
    nodeRecords,
    updateNodeRecord,
    insertNodeRecord,
    deleteNodeRecord,
  };
}
