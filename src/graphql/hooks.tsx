import { useMutation, useQuery } from "@apollo/client";
import {
  bulkWriteMutation,
  deleteNodeAndChildrenMutation,
  insertNodeMutation,
  nodeSubtreeQuery,
  nodesQuery,
  updateNodeMutation,
} from "./queries";
import {
  Node,
  NodeInsertInput,
  NodeQueryInput,
  NodeUpdateInput,
} from "../gql/graphql";
import { useContext } from "react";
import { AppContext } from "../contexts/realm-context";

export const useNodes = (ownerId: string | undefined) => {
  const { loading, error, data } = useQuery(nodesQuery, {
    // pollInterval: 500,
    variables: { query: { ownerId } },
  });
  return { nodes: data?.nodes as Node[], loading, error: Boolean(error) };
};

export const useNodeSubtree = (nodeId: string | undefined) => {
  const { loading, error, data } = useQuery(nodeSubtreeQuery, {
    variables: { input: nodeId },
  });
  return { nodes: data?.nodeSubtree, loading, error: Boolean(error) };
};

export const useBulkWrite = () => {
  const [mutate, { loading }] = useMutation(bulkWriteMutation);
  const app = useContext(AppContext);
  const ownerId = app?.currentUser?.id;

  const bulkWrite = async (input: NodeUpdateInput[]) => {
    const result = await mutate({
      variables: {
        input,
      },
      optimisticResponse: {
        bulkUpsertNodes: {
          status: "complete",
        },
      },
      update: (proxy) => {
        const previousData: { nodes: any[] } | null = proxy.readQuery({
          query: nodesQuery,
          variables: {
            query: {
              ownerId: app?.currentUser?.id,
            },
          },
        });
        const insertIds = input.map((node) => node._id);
        //start here -- update
        const newData = [...previousData!.nodes];

        console.log(newData);
        console.log(input); 
        
        const filteredData = newData.filter((node)=>{return !insertIds.includes(node._id)})


        const allData = [...filteredData, ...input]
   

        proxy.writeQuery({
          query: nodesQuery,
          variables: {
            query: {
              ownerId: ownerId,
            },
          },
          data: {
            nodes: allData,
          },
        });
      },
    });
    return result;
  };
  return { bulkWrite, loading };
};

export const useInsertNode = () => {
  const [mutate, { loading }] = useMutation(insertNodeMutation);
  const app = useContext(AppContext);
  const ownerId = app?.currentUser?.id;

  const insertNode = async (data: NodeInsertInput) => {
    const result = await mutate({
      variables: {
        data,
      },
      optimisticResponse: {
        insertOneNode: {
          _id: "temp",
          __typename: "Node",
          order: data.order,
          parentId: data.parentId,
          text: data.text,
          ownerId: ownerId,
          status: "todo",
        },
      },
      update: (proxy, response) => {
        const previousData: { nodes: any[] } | null = proxy.readQuery({
          query: nodesQuery,
          variables: {
            query: {
              ownerId: data.ownerId,
            },
          },
        });
        const newData = [...previousData!.nodes, response.data.insertOneNode];
        proxy.writeQuery({
          query: nodesQuery,
          variables: {
            query: {
              ownerId: ownerId,
            },
          },
          data: {
            nodes: newData,
          },
        });
      },
    });
    return result.data.insertOneNode;
  };

  return { insertNode, loading };
};

export const useUpdateNode = () => {
  const [mutate, { loading }] = useMutation(updateNodeMutation);

  const updateNode = async (query: NodeQueryInput, set: NodeUpdateInput) => {
    const {
      data: { node },
    } = await mutate({
      variables: {
        query,
        set,
      },
      optimisticResponse: {
        updateOneNode: {
          _id: query._id,
          __typename: "Node",
          order: set.order,
          parentId: set.parentId,
          text: set.text,
          parentId_unset: set.parentId_unset,
          ownerId: set.ownerId,
          status: set.status,
        },
      },
    });
    return node;
  };
  return { updateNode, loading };
};

export const useDeleteNode = (ownerId: string | undefined) => {
  const [mutate, { loading }] = useMutation(deleteNodeAndChildrenMutation);

  const deleteNode = async (query: NodeQueryInput) => {
    const result = await mutate({
      variables: {
        input: query,
      },
      optimisticResponse: {
        deleteNodeAndChildren: 1,
      },
      update: (proxy) => {
        const previousData: { nodes: any[] } | null = proxy.readQuery({
          query: nodesQuery,
          variables: {
            query: {
              ownerId: ownerId,
            },
          },
        });
        // const newData = previousData?.nodes.filter(
        //   (node) => node._id !== response.data.deleteOneNode._id
        // );
        proxy.writeQuery({
          query: nodesQuery,
          variables: {
            query: {
              ownerId: ownerId,
            },
          },
          data: {
            nodes: previousData!.nodes.filter((node) => {
              return node._id !== query._id && node.parentId !== query._id;
            }),
          },
        });
      },
    });

    return result;
  };
  return { deleteNode, loading };
};

