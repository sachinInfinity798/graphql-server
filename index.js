const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;

// const books = [
//     {
//         title: 'Harry Potter and the Chamber of Secrets',
//         author: 'J.K. Rowling',
//     },
//     {
//         title: 'Jurassic Park',
//         author: 'Michael Crichton',
//     },
// ];

// // Resolvers define the technique for fetching the types defined in the
// // schema. This resolver retrieves books from the "books" array above.
// const resolvers = {
//     Query: {
//         books: () => books,
//     },
// };
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
                allCourses: [Course]
        course(id: Int!): Course
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`;
var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: '#'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: '#'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: '#'
    }
];
var getCourse = function (root, { id }) {
    return coursesData.filter(course => {
        return course.id === id;
    })[0];
};
var getAllCourses = function () {
    return coursesData;
}
// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        allCourses: getAllCourses,
        course: getCourse,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});