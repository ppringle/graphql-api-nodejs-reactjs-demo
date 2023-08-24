const {gql} = require('apollo-server');

const typeDefs = gql`

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
    }

    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
        favouriteMovies: [Movie]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
        movies: MoviesResult
        movie(name: String!): Movie!
    }

    input CreateUserInput {
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = BRAZIL
    }

    input UpdateUsernameInput {
        id: ID!
        newUserName: String!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUserName(input: UpdateUsernameInput!) : User
        deleteUser(id: ID!): User
    }
    
    type MoviesSuccessfulResult {
        movies: [Movie!]!
    }

    type MoviesFailureResult {
        message: String!
    }
    
    union MoviesResult = MoviesSuccessfulResult | MoviesFailureResult

`;

module.exports = {typeDefs};