import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    allTagTypes: [TagType]

    allCategories: [Tag]
    allCuisines: [Tag]
    allEquipment: [Tag]
    allMealTypes: [Tag]

    recipes: [Recipe]
    recipe(id: String!): Recipe
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

    addRecipe(recipe: RecipeInput!): Recipe
    deleteRecipe(id: String!): String
    updateRecipe(id: String!, recipe: RecipeInput!): Recipe
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

  type Recipe {
    id: String!
    title: String!
    description: String
    source_display: String!
    source_url: String
    photo_url: String
    servings: Int!
    directions: [DirectionSection]
    ingredients: [IngredientSection]
    prepTime: [Timing]!
    totaTime: [Timing]!
    tags: [RecipeTag]
    dateAdded: String
    dateUpdated: String
  }

  type DirectionSection {
    label: String
    steps: [DirectionStep]!
  }

  type DirectionStep {
    text: String!
  }

  type IngredientSection {
    label: String
    ingredients: [Ingredient]!
  }

  type Ingredient {
    amount: String
    rangedAmount: RangedAmount
    unit: String
    prep: String
    name: String!
    toTaste: Boolean
    optional: Boolean
  }

  type RangedAmount {
    min: String!
    max: String!
  }

  type RecipeTag {
    recipeid: String!
    tagid: String!
  }

  type Timing {
    value: Int!
    units: TimingUnit
  }

  enum TimingUnit {
    MINUTE
    HOUR
  }

  input RecipeInput {
    title: String
    description: String
    source_display: String
    source_url: String
    photo_url: String
    servings: Int
  }
`;
/*
    directions: [DirectionSection]// TODO need input type
    ingredients: [IngredientSection]// TODO need input type
    prepTime: [Timing]! // TODO need input type
    totalTime: [Timing]!// TODO need input type
    tags: [RecipeTag]// TODO need input type
*/
export default typeDefs;
