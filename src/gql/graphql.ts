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
  parentId?: Maybe<Scalars['ObjectId']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type NodeInsertInput = {
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  order: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['ObjectId']['input']>;
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
  parentId?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_exists?: InputMaybe<Scalars['Boolean']['input']>;
  parentId_gt?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_gte?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_in?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  parentId_lt?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_lte?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_ne?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_nin?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
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
  ParentidAsc = 'PARENTID_ASC',
  ParentidDesc = 'PARENTID_DESC',
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
  parentId?: InputMaybe<Scalars['ObjectId']['input']>;
  parentId_unset?: InputMaybe<Scalars['Boolean']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_unset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
};


export type QueryNodeArgs = {
  query?: InputMaybe<NodeQueryInput>;
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

export type AllNodesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllNodesQuery = { __typename?: 'Query', nodes: Array<{ __typename?: 'Node', _id: any, order: number, text?: string | null, parentId?: any | null } | null> };

export type UpdateOneNodeMutationVariables = Exact<{
  query: NodeQueryInput;
  input: NodeUpdateInput;
}>;


export type UpdateOneNodeMutation = { __typename?: 'Mutation', node?: { __typename?: 'Node', _id: any } | null };


export const AllNodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllNodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<AllNodesQuery, AllNodesQueryVariables>;
export const UpdateOneNodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneNode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NodeQueryInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NodeUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"node"},"name":{"kind":"Name","value":"updateOneNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateOneNodeMutation, UpdateOneNodeMutationVariables>;