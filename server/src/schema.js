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
    tagid: String!
  type TimeGroup {
    prep: [Timing]
    total: [Timing]
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
    directions: [DirectionSectionInput]
    ingredients: [IngredientSectionInput]
    prepTime: [TimingInput]
    totalTime: [TimingInput]
    tags: [RecipeTaginput]
    dateAdded: String
    dateUpdated: String
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
    ingredients: [Ingredientinput]
  }

  input Ingredientinput {
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

  input TimingInput {
    value: Int
    units: TimingUnit
  }

  input RecipeTaginput {
    recipeid: ID
    tagid: ID
  }
`;
export default typeDefs;
