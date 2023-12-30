import { useEffect, useMemo, useRef } from "react";

const noop = () => {};
const defaultChangeHandlers = {
  onInsert: noop,
  onUpdate: noop,
  onReplace: noop,
  onDelete: noop,
};

export function useWatch(
  collection: Realm.Services.MongoDB.MongoDBCollection<any>|undefined,
  changeHandlers: any
) {
  const filter = useMemo(() => ({}), []);

  const handlers = { ...defaultChangeHandlers, ...changeHandlers };

  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = {
      onInsert: handlers.onInsert,
      onUpdate: handlers.onUpdate,
      onReplace: handlers.onReplace,
      onDelete: handlers.onDelete,
    };
  }, [
    handlers.onInsert,
    handlers.onUpdate,
    handlers.onReplace,
    handlers.onDelete,
  ]);

  useEffect(() => {
    let stream: any;
    const watchNodes = async () => {
      stream = collection!.watch({ filter });
      for await (const change of stream) {
        switch (change.operationType) {
          case "insert": {
            handlersRef.current.onInsert(change);
            break;
          }
          case "update": {
            handlersRef.current.onUpdate(change);
            break;
          }
          case "replace": {
            handlersRef.current.onReplace(change);
            break;
          }
          case "delete": {
            handlersRef.current.onDelete(change);
            break;
          }
          default: {
            // change.operationType will always be one of the specified cases, so we should never hit this default
            throw new Error(
              `Invalid change operation type: ${change.operationType}`
            );
          }
        }
      }
    };
    watchNodes();
    return ()=>{
        stream?.return()
    }
  }, [collection, filter]);

}
