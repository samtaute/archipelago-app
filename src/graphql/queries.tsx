import {gql} from 'graphql-tag'

export const nodesQuery = gql`
    query Nodes($query: NodeQueryInput) {
        nodes(query: $query){
            _id
            order
            text
            parentId
            ownerId
            status
        }
    }
`  

export const nodeSubtreeQuery = gql`
    query NodeSubtree($input: ObjectId){
        nodeSubtree(input: $input){
            _id
            parentId
            order
            text
            ownerId
            status
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
            status
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
            status
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
            status
        }
    }
`
export const deleteNodeMutation = gql`
    mutation DeleteOneNode($query: NodeQueryInput!){
        deleteOneNode(query: $query){
            _id
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