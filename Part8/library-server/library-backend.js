const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const dotenv = require('dotenv')
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      id: ID,
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () =>  Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({})
      if (args.author && args.genre) {
        return books.filter((book) => 
          book.genres.includes(args.genre) && book.author === args.author
        )
      } else if (args.author) {
        return books.filter((book) => book.author === args.author)
      } else if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: () => Author.find({})
  },
  Book: {
    author: async (root) => {
      const author = await Author.findOne({ _id: root.author })
      return author
    }
  },
  Author: {
    bookCount: async (root) => {
      const authors = await Author.find({ name: root.name })
      return authors
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
      })

      if (!author) {
        const newAuthor = new Author({ name: args.author })
        const savedAuthor = await newAuthor.save()
        
        newBook.author = savedAuthor._id
      } else {
        newBook.author = author._id
      }
      
      await newBook.save()
      return newBook
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      await author.save()
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})