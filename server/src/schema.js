import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    allTagTypes: [TagType]

    allCategories: [Tag]
    allCuisines: [Tag]
    allEquipment: [Tag]
    allMealTypes: [Tag]
  }

  type Mutation {
    addTagType(label: String!): TagType
    deleteTagType(id: String!): String
    updateTagType(id: String!, label: String!): TagType

    addCategory(label: String!): Tag
    addCuisine(label: String!): Tag
    addEquipment(label: String!): Tag
    addMealType(label: String!): Tag
    deleteTag(id: String!): String
    updateTag(id: String!, typeid: String, label: String): Tag
  }

  type TagType {
    id: String!
    label: String!
  }

  type Tag {
    id: String!
    typeid: String!
    label: String!
  }
`;

export default typeDefs;
