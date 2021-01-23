const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const users = [
  {
    id: String(Math.random()),
    name: "Herllon",
    email: "herllon1@teste.com",
    active: true,
  },
  {
    id: String(Math.random()),
    name: "Herllon",
    email: "herllon2@teste.com",
    active: false,
  },
  {
    id: String(Math.random()),
    name: "Herllon",
    email: "herllon3@teste.com",
    active: true,
  },
];

const resolvers = {
  Query: {
    hello: () => "Hello World",
    users: () => users,
    getUserByEmail: (_, args) => {
      const isUser = users.find((user) => user.email === args.email);
      if (!isUser) {
        throw new Error("User cannot be found");
      }
      return isUser;
    },
  },
  Mutation: {
    createUser:(_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true,
    }
    users.push(newUser);
    return newUser
  }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server started at ${url}`));
