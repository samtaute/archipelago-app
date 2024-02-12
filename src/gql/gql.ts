/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query Nodes {\n        nodes{\n            _id\n            order\n            text\n            parentId\n        }\n    }\n": types.NodesDocument,
    "\n    mutation InsertOneNode($data: NodeInsertInput!){\n        insertOneNode(data: $data){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n": types.InsertOneNodeDocument,
    "\n    query Node($query: NodeQueryInput) {\n        node(query: $query){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n": types.NodeDocument,
    "\n    mutation UpdateOneNode($query: NodeQueryInput, $set: NodeUpdateInput!){\n        updateOneNode(query: $query, set: $set){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n": types.UpdateOneNodeDocument,
    "\n    mutation DeleteOneNode($query: NodeQueryInput!){\n        deleteOneNode(query: $query){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n": types.DeleteOneNodeDocument,
    "\n    mutation DeleteManyNodes($query: NodeQueryInput!){\n        deleteManyNodes(query: $query){\n            deletedCount\n        }\n    }\n": types.DeleteManyNodesDocument,
    "\n    mutation DeleteNodeAndChildren($input: NodeQueryInput){\n        deleteNodeAndChildren(input: $input)\n    }\n": types.DeleteNodeAndChildrenDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Nodes {\n        nodes{\n            _id\n            order\n            text\n            parentId\n        }\n    }\n"): (typeof documents)["\n    query Nodes {\n        nodes{\n            _id\n            order\n            text\n            parentId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation InsertOneNode($data: NodeInsertInput!){\n        insertOneNode(data: $data){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n"): (typeof documents)["\n    mutation InsertOneNode($data: NodeInsertInput!){\n        insertOneNode(data: $data){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Node($query: NodeQueryInput) {\n        node(query: $query){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n"): (typeof documents)["\n    query Node($query: NodeQueryInput) {\n        node(query: $query){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateOneNode($query: NodeQueryInput, $set: NodeUpdateInput!){\n        updateOneNode(query: $query, set: $set){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateOneNode($query: NodeQueryInput, $set: NodeUpdateInput!){\n        updateOneNode(query: $query, set: $set){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteOneNode($query: NodeQueryInput!){\n        deleteOneNode(query: $query){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteOneNode($query: NodeQueryInput!){\n        deleteOneNode(query: $query){\n            _id\n            order\n            text\n            parentId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteManyNodes($query: NodeQueryInput!){\n        deleteManyNodes(query: $query){\n            deletedCount\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteManyNodes($query: NodeQueryInput!){\n        deleteManyNodes(query: $query){\n            deletedCount\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteNodeAndChildren($input: NodeQueryInput){\n        deleteNodeAndChildren(input: $input)\n    }\n"): (typeof documents)["\n    mutation DeleteNodeAndChildren($input: NodeQueryInput){\n        deleteNodeAndChildren(input: $input)\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;