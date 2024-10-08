const typeDefs = `#graphql
    scalar Date{
        date: String!
    }

    type Reply{
        commentCode: ID!
        replyAuthor: String
        replyLikes: Int!
        replies: [Reply!]
        replyText: String!
    }
    
    type Socials{
        github:String
        linkedin:String
        discord:String
        telegram:String
        instagram:String
        facebook:String
    }

    type Comment {
        postCode: String!
        commentText: String!
        commentAuthor: String
        commentReply: [Reply!]
        commentLikes: Int!
    }

    type Post{
        postCode: String!
        title: String!
        text: String!
        authorUsername: String!
        category: String!
        datePosted: Date!
        comments: [Comment!]
        postLikes: Int
        views: Int
        images: [String!]
        thumbnail: String
    }

    type User {
        username: String!
        email: String!
        passwordHash: String!
        interests: [String!]
        posts: [Post!]
        socials: Socials
        accountAge: Date!
    }

    type Statistics {
        totalPosts: Int
        totalAccounts: Int
        totalComments: Int
        totalLikes: Int
        onlineUsers: Int
        mostVisitedCategory: String!
    }

    input newPostInput {
    }

    input newUserInput {
    }
`

export default typeDefs
