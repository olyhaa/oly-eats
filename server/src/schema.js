import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    allTagTypes: [TagType]
    allTags(typeid: String!): [Tag]

    recipes: [Recipe]
    recipe(id: String!): Recipe
  }

  type Mutation {
    addTagType(label: String!): TagTypeMutation
    deleteTagType(id: String!): TagTypeMutation
    updateTagType(id: String!, label: String!): TagTypeMutation

    addTag(typeid: String!, label: String!): TagMutation
    deleteTag(id: String!): TagMutation
    updateTag(id: String!, label: String): TagMutation

    addRecipe(recipe: RecipeInput!): RecipeMutation
    deleteRecipe(id: String!): RecipeMutation
    updateRecipe(id: String!, recipe: RecipeInput!): RecipeMutation
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
    id: String!
    label: String!
  }

  type Tag {
    id: String!
    typeid: String!
    label: String!
  }

  type RecipeMutation {
    success: Boolean!
    message: String
    recipe: String
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
    directions: [DirectionSectionInput]
    ingredients: [IngredientSectionInput]
    prepTime: [TimingInput]
    totaTime: [TimingInput]
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
    recipeid: String
    tagid: String
  }
`;
export default typeDefs;
