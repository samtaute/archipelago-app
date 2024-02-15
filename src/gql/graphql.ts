/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ObjectId: { input: any; output: any; }
};

export type DeleteManyPayload = {
  __typename?: 'DeleteManyPayload';
  deletedCount: Scalars['Int']['output'];
};

export type InsertManyPayload = {
  __typename?: 'InsertManyPayload';
  insertedIds: Array<Maybe<Scalars['ObjectId']['output']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteManyNodes?: Maybe<DeleteManyPayload>;
  deleteNodeAndChildren?: Maybe<Scalars['Int']['output']>;
  deleteOneNode?: Maybe<Node>;
  insertManyNodes?: Maybe<InsertManyPayload>;
  insertOneNode?: Maybe<Node>;
  replaceOneNode?: Maybe<Node>;
  updateManyNodes?: Maybe<UpdateManyPayload>;
  updateOneNode?: Maybe<Node>;
  upsertOneNode?: Maybe<Node>;
};


export type MutationDeleteManyNodesArgs = {
  query?: InputMaybe<NodeQueryInput>;
};


export type MutationDeleteNodeAndChildrenArgs = {
  input?: InputMaybe<NodeQueryInput>;
};


export type MutationDeleteOneNodeArgs = {
  query: NodeQueryInput;
};


export type MutationInsertManyNodesArgs = {
  data: Array<NodeInsertInput>;
};


export type MutationInsertOneNodeArgs = {
  data: NodeInsertInput;
};


export type MutationReplaceOneNodeArgs = {
  data: NodeInsertInput;
  query?: InputMaybe<NodeQueryInput>;
};


export type MutationUpdateManyNodesArgs = {
  query?: InputMaybe<NodeQueryInput>;
  set: NodeUpdateInput;
};


export type MutationUpdateOneNodeArgs = {
  query?: InputMaybe<NodeQueryInput>;
  set: NodeUpdateInput;
};


export type MutationUpsertOneNodeArgs = {
  data: NodeInsertInput;
  query?: InputMaybe<NodeQueryInput>;
};

export type Node = {
  __typename?: 'Node';
  _id: Scalars['ObjectId']['output'];
  order: Scalars['Int']['output'];
  ownerId: Scalars['ObjectId']['output'];
  parentId?: Maybe<Scalars['ObjectId']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type NodeInsertInput = {
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  order: Scalars['Int']['input'];
  ownerId: Scalars['ObjectId']['input'];
  parentId?: InputMaybe<Scalars['ObjectId']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type NodeQueryInput = {
  AND?: InputMaybe<Array<NodeQueryInput>>;
  OR?: InputMaybe<Array<NodeQueryInput>>;
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  _id_gt?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_gte?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_in?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  _id_lt?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_lte?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_ne?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_nin?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  order?: InputMaybe<Scalars['Int']['input']>;
  order_exists?: InputMaybe<Scalars['Boolean']['input']>;
  order_gt?: InputMaybe<Scalars['Int']['input']>;
  order_gte?: InputMaybe<Scalars['Int']['input']>;
  order_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  order_lt?: InputMaybe<Scalars['Int']['input']>;
  order_lte?: InputMaybe<Scalars['Int']['input']>;
  order_ne?: InputMaybe<Scalars['Int']['input']>;
  order_nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  ownerId?: InputMaybe<Scalars['ObjectId']['input']>;
  ownerId_exists?: InputMaybe<Scalars['Boolean']['input']>;
  ownerId_gt?: InputMaybe<Scalars['ObjectId']['input']>;
  ownerId_gte?: InputMaybe<Scalars['ObjectId']['input']>;
  ownerId_in?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  ownerId_lt?: InputMaybe<Scalars['ObjectId']['input']>;
  ownerId_lte?: InputMaybe<Scalars['ObjectId']['input']>;
  ownerId_ne?: InputMaybe<Scalars['ObjectId']['input']>;
  ownerId_nin?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  parentId?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_exists?: InputMaybe<Scalars['Boolean']['input']>;
  parentId_gt?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_gte?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_in?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  parentId_lt?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_lte?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_ne?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_nin?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_exists?: InputMaybe<Scalars['Boolean']['input']>;
  status_gt?: InputMaybe<Scalars['String']['input']>;
  status_gte?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status_lt?: InputMaybe<Scalars['String']['input']>;
  status_lte?: InputMaybe<Scalars['String']['input']>;
  status_ne?: InputMaybe<Scalars['String']['input']>;
  status_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_exists?: InputMaybe<Scalars['Boolean']['input']>;
  text_gt?: InputMaybe<Scalars['String']['input']>;
  text_gte?: InputMaybe<Scalars['String']['input']>;
  text_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text_lt?: InputMaybe<Scalars['String']['input']>;
  text_lte?: InputMaybe<Scalars['String']['input']>;
  text_ne?: InputMaybe<Scalars['String']['input']>;
  text_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum NodeSortByInput {
  OrderAsc = 'ORDER_ASC',
  OrderDesc = 'ORDER_DESC',
  OwneridAsc = 'OWNERID_ASC',
  OwneridDesc = 'OWNERID_DESC',
  ParentidAsc = 'PARENTID_ASC',
  ParentidDesc = 'PARENTID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TextAsc = 'TEXT_ASC',
  TextDesc = 'TEXT_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export type NodeUpdateInput = {
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_unset?: InputMaybe<Scalars['Boolean']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  order_inc?: InputMaybe<Scalars['Int']['input']>;
  order_unset?: InputMaybe<Scalars['Boolean']['input']>;
  ownerId?: InputMaybe<Scalars['ObjectId']['input']>;
  ownerId_unset?: InputMaybe<Scalars['Boolean']['input']>;
  parentId?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_unset?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_unset?: InputMaybe<Scalars['Boolean']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_unset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  nodeSubtree?: Maybe<Array<Maybe<Node>>>;
  nodes: Array<Maybe<Node>>;
};


export type QueryNodeArgs = {
  query?: InputMaybe<NodeQueryInput>;
};


export type QueryNodeSubtreeArgs = {
  input?: InputMaybe<Scalars['ObjectId']['input']>;
};


export type QueryNodesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<NodeQueryInput>;
  sortBy?: InputMaybe<NodeSortByInput>;
};

export type UpdateManyPayload = {
  __typename?: 'UpdateManyPayload';
  matchedCount: Scalars['Int']['output'];
  modifiedCount: Scalars['Int']['output'];
};

export type NodesQueryVariables = Exact<{
  query?: InputMaybe<NodeQueryInput>;
}>;


export type NodesQuery = { __typename?: 'Query', nodes: Array<{ __typename?: 'Node', _id: any, order: number, text?: string | null, parentId?: any | null, ownerId: any, status?: string | null } | null> };

export type NodeSubtreeQueryVariables = Exact<{
  input?: InputMaybe<Scalars['ObjectId']['input']>;
}>;


export type NodeSubtreeQuery = { __typename?: 'Query', nodeSubtree?: Array<{ __typename?: 'Node', _id: any, parentId?: any | null, order: number, text?: string | null, ownerId: any, status?: string | null } | null> | null };

export type InsertOneNodeMutationVariables = Exact<{
  data: NodeInsertInput;
}>;


export type InsertOneNodeMutation = { __typename?: 'Mutation', insertOneNode?: { __typename?: 'Node', _id: any, order: number, text?: string | null, parentId?: any | null, ownerId: any, status?: string | null } | null };

export type NodeQueryVariables = Exact<{
  query?: InputMaybe<NodeQueryInput>;
}>;


export type NodeQuery = { __typename?: 'Query', node?: { __typename?: 'Node', _id: any, order: number, text?: string | null, parentId?: any | null, ownerId: any, status?: string | null } | null };

export type UpdateOneNodeMutationVariables = Exact<{
  query?: InputMaybe<NodeQueryInput>;
  set: NodeUpdateInput;
}>;


export type UpdateOneNodeMutation = { __typename?: 'Mutation', updateOneNode?: { __typename?: 'Node', _id: any, order: number, text?: string | null, parentId?: any | null, ownerId: any, status?: string | null } | null };

export type DeleteOneNodeMutationVariables = Exact<{
  query: NodeQueryInput;
}>;


export type DeleteOneNodeMutation = { __typename?: 'Mutation', deleteOneNode?: { __typename?: 'Node', _id: any } | null };

export type DeleteManyNodesMutationVariables = Exact<{
  query: NodeQueryInput;
}>;


export type DeleteManyNodesMutation = { __typename?: 'Mutation', deleteManyNodes?: { __typename?: 'DeleteManyPayload', deletedCount: number } | null };

export type DeleteNodeAndChildrenMutationVariables = Exact<{
  input?: InputMaybe<NodeQueryInput>;
}>;


export type DeleteNodeAndChildrenMutation = { __typename?: 'Mutation', deleteNodeAndChildren?: number | null };


export const NodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Nodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NodeQueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<NodesQuery, NodesQueryVariables>;
export const NodeSubtreeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NodeSubtree"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodeSubtree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<NodeSubtreeQuery, NodeSubtreeQueryVariables>;
export const InsertOneNodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertOneNode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NodeInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertOneNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<InsertOneNodeMutation, InsertOneNodeMutationVariables>;
export const NodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Node"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NodeQueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<NodeQuery, NodeQueryVariables>;
export const UpdateOneNodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneNode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NodeQueryInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NodeUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateOneNodeMutation, UpdateOneNodeMutationVariables>;
export const DeleteOneNodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneNode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NodeQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteOneNodeMutation, DeleteOneNodeMutationVariables>;
export const DeleteManyNodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteManyNodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NodeQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteManyNodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletedCount"}}]}}]}}]} as unknown as DocumentNode<DeleteManyNodesMutation, DeleteManyNodesMutationVariables>;
export const DeleteNodeAndChildrenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNodeAndChildren"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NodeQueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNodeAndChildren"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteNodeAndChildrenMutation, DeleteNodeAndChildrenMutationVariables>;