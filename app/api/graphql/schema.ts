const typeDefs = `#graphql
   type Social{
      github: String
      linkedin: String
      discord: String
      telegram: String
      instagram: String
      facebook: String
   }
   
   input SocialInput {
      github: String
      linkedin: String
      discord: String
      telegram: String
      instagram: String
      facebook: String
   }

   type User{
      id:ID!
      username: String!
      email: String!
      passwordHash:String!
      interests: [String!]
      posts: [String!]
      socials: [Social]
      dateCreated: String!
   }

  
   input NewUserInput {
      username:String!
      email:String!
      passwordHash:String!
   }

   input LoginInput{
      username:String!
      password:String
   }

   input UpdateUserInput {
      id: ID!
      username: String
      email: String
      passwordHash:String
      interests: [String!]
      posts: [String!]
      socials: SocialInput
   }

   type Query{
      users: [User]
      user(username:String!): User
      login(input:LoginInput! ): User
   }

   type Mutation {
      createUser(input: NewUserInput!): User
      updateUser(input: UpdateUserInput!): User
      deleteUser(id: ID!): String
   }
`

export default typeDefs
