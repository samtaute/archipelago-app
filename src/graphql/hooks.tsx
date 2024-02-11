import { useMutation, useQuery } from "@apollo/client";
import {
  deleteNodeAndChildrenMutation,
  insertNodeMutation,
  nodesQuery,
  updateNodeMutation,
} from "./queries";
import {
  Node,
  NodeInsertInput,
  NodeQueryInput,
  NodeUpdateInput,
} from "../gql/graphql";

export const useNodes = () => {
  const { loading, error, data } = useQuery(nodesQuery, {
    // pollInterval: 500,
  });
  return { nodes: data?.nodes as Node[], loading, error: Boolean(error) };
};

export const useInsertNode = () => {
  const [mutate, { loading }] = useMutation(insertNodeMutation);

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
        },
      },
      update: (proxy, response) => {
        const previousData: { nodes: any[] } | null = proxy.readQuery({
          query: nodesQuery,
        });
        const newData = [...previousData!.nodes, response.data.insertOneNode];
        proxy.writeQuery({
          query: nodesQuery,
          data: {
            nodes: newData,
          },
        });
      },
    });
    return result.data.node;
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
        },
      },
    });
    return node;
  };
  return { updateNode, loading };
};

export const useDeleteNode = () => {
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
        });
        // const newData = previousData?.nodes.filter(
        //   (node) => node._id !== response.data.deleteOneNode._id
        // );
        proxy.writeQuery({
          query: nodesQuery,
          data: {
            nodes: previousData!.nodes.filter((node)=>{
              return node._id !== query._id && node.parentId !== query._id
            }),
          },
        });
      },
    });

    return result;
  };
  return { deleteNode, loading };
};
