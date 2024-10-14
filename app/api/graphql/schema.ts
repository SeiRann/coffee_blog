const typeDefs = `#graphql
    type Comment {
	postCode: String!
	commentAuthor: String
	commentText: String
	commentReply: [Reply!]
	commentLikes: Int
    }

    type Reply {
        commentCode: String!
        replyAuthor: String
        replyText: String
        replies: [Reply!]
        replyLikes: Int
    }

    type Post {
        postCode: String!
        title: String!
        text: String!
        authorUsername: String!
        category: String!
        datePosted: String!
        comments: [Comment!]
        likes: Int
        views: Int
        images: [String!]
        thumbnail: String
    }

    type Social {
        github: String
        linkedin: String
        discord: String
        telegram: String
        instagram: String
        facebook: String
    }

    type User {
        username: String!
        email: String!
        passwordHash: String!
        interests: [String!]
        posts:[String!]
        socials:Social
        accountAge:String
    }

    type Statistics {
        totalPosts: Int!
        totalAccounts: Int!
        totalComments: Int!
        totalLikes: Int!
        onlineUsers: Int!
        mostVisitedCategory: String!
    }

    input NewUserInput {
        username: String!
        email: String!
        passwordHash: String!
    }

    type Query {
        users: [User!]!
    }

    type Query {
        posts: [Post!]!
    }

    type Query {
        stats: Statistics!
    }

    type Mutation {
        createUser(input: NewUserInput!):User
    }
`

export default typeDefs
