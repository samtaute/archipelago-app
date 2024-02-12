import {gql} from 'graphql-tag'

export const nodesQuery = gql`
    query Nodes($query: NodeQueryInput) {
        nodes(query: $query){
            _id
            order
            text
            parentId
            ownerId
        }
    }
`  

export const insertNodeMutation = gql`
    mutation InsertOneNode($data: NodeInsertInput!){
        insertOneNode(data: $data){
            _id
            order
            text
            parentId
            ownerId
        }
    }
`

export const nodeByIdQuery = gql`
    query Node($query: NodeQueryInput) {
        node(query: $query){
            _id
            order
            text
            parentId
            ownerId
        }
    }
`

export const updateNodeMutation = gql`
    mutation UpdateOneNode($query: NodeQueryInput, $set: NodeUpdateInput!){
        updateOneNode(query: $query, set: $set){
            _id
            order
            text
            parentId
            ownerId
        }
    }
`
export const deleteNodeMutation = gql`
    mutation DeleteOneNode($query: NodeQueryInput!){
        deleteOneNode(query: $query){
            _id
            order
            text
            parentId
            ownerId
        }
    }
`

export const deleteManyNodesMutation = gql`
    mutation DeleteManyNodes($query: NodeQueryInput!){
        deleteManyNodes(query: $query){
            deletedCount
        }
    }
`

export const deleteNodeAndChildrenMutation = gql`
    mutation DeleteNodeAndChildren($input: NodeQueryInput){
        deleteNodeAndChildren(input: $input)
    }
`