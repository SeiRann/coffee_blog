const typeDefs = `#graphql
#=============================================================================================================
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
      password:String!
      interests: [String!]
      posts: [String!]
      socials: [Social]
      dateCreated: String!
   }

  
   input NewUserInput {
      username:String!
      email:String!
      password:String!
   }

   input LoginInput{
      username:String!
      password:String
   }

   input UpdateUserInput {
      id: ID!
      username: String
      email: String
      password:String
      interests: [String!]
      posts: [String!]
      socials: SocialInput
   }
#=============================================================================================================
   type Post{
      id: ID!
      postid:String!
      title: String!
      text: String!
      author: String!
      category: String!
      dateCreated: String!
      likes: Int!
      dislikes: Int!
   }

   input NewPostInput{
      title:String!
      text:String!
      authorid:ID!
      category:String!
   }

   input getPostInput{
      postid:String!
   }
#=============================================================================================================
   type Query{
      users: [User]
      user(username:String!): User
      login(input:LoginInput! ): User


      posts: [Post]
      post(input:getPostInput!): Post
   }

   type Mutation {
      createUser(input: NewUserInput!): User
      updateUser(input: UpdateUserInput!): User
      deleteUser(id: ID!): String

      createPost(input: NewPostInput!): Post
   }
`

export default typeDefs
