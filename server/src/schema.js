import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    allTagTypes: [TagType]
    allTags(typeid: ID!): [Tag]

    recipes: [Recipe]
    recipe(id: ID!): Recipe
  }

  type Mutation {
    addTagType(label: String!): TagTypeMutation
    deleteTagType(id: ID!): TagTypeMutation
    updateTagType(id: ID!, label: String!): TagTypeMutation

    addTag(typeid: String!, label: String!): TagMutation
    deleteTag(id: ID!): TagMutation
    updateTag(id: ID!, label: String): TagMutation

    addRecipe(recipe: RecipeInput!): RecipeMutation
    deleteRecipe(id: ID!): RecipeMutation
    updateRecipe(id: ID!, recipe: RecipeInput!): RecipeMutation
  }

  type TagTypeMutation {
    success: Boolean!
    message: String
    tagType: TagType
  }

  type TagMutation {
    success: Boolean!
    message: String
    tag: Tag
  }

  type TagType {
    id: ID!
    label: String!
  }

  type Tag {
    id: ID!
    typeid: ID!
    label: String!
  }

  type RecipeMutation {
    success: Boolean!
    message: String
    recipe: Recipe
  }

  type Recipe {
    id: ID!
    title: String!
    description: String
    source: Source
    photo: String
    servings: Int!
    directions: [DirectionSection]
    ingredients: [IngredientSection]
    timing: TimeGroup
    tags: [Tag]
    meta: RecipeMeta
  }

  scalar ISODate

  type RecipeMeta {
    dateAdded: ISODate
    dateUpdated: ISODate
  }

  type Source {
    display: String
    url: String
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

  type TimeGroup {
    prep: [Timing]
    total: [Timing]
  }

  type Timing {
    value: Int!
    units: TimingUnit!
  }

  enum TimingUnit {
    MINUTE
    HOUR
  }

  input RecipeInput {
    title: String
    description: String
    source: SourceInput
    photo: String
    servings: Int
    directions: [DirectionSectionInput]
    ingredients: [IngredientSectionInput]
    timing: TimingInput
    tags: [RecipeTagInput]
  }

  input SourceInput {
    display: String
    url: String
  }

  input TimingInput {
    prep: [TimeInput]
    total: [TimeInput]
  }

  input DirectionSectionInput {
    label: String
    steps: [DirectionStepInput]
  }

  input DirectionStepInput {
    text: String!
  }

  input IngredientSectionInput {
    label: String
    ingredients: [IngredientInput]
  }

  input IngredientInput {
    amount: String
    rangedAmount: RangedAmountInput
    unit: String
    prep: String
    name: String
    toTaste: Boolean
    optional: Boolean
  }

  input RangedAmountInput {
    min: String
    max: String
  }

  input TimeInput {
    value: Int
    units: TimingUnit
  }

  input RecipeTagInput {
    id: ID
  }
`;
export default typeDefs;
