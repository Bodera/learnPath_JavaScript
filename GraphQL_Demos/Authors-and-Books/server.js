const express = require('express')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const {
  GraphQLDate,
  //GraphQLTime,
  //GraphQLDateTime
} = require('graphql-iso-date')
const app = express()


const authors = [
  {id: 1, name: 'Agatha Christie',
   birth_date: '1890-09-15', nationality: 'British'},
  {id: 2, name: 'Mikhail Bulgakov',
   birth_date: '1891-05-15', nationality: 'Ukrainian'},
  {id: 3, name: 'Beatrix Potter',
   birth_date: '1866-07-28', nationality: 'British'},
  {id: 4, name: 'Jeffrey Archer',
   birth_date: '1940-04-15', nationality: 'British'},
  {id: 5, name: 'Stephen Covey',
   birth_date: '1932-10-24', nationality: 'American'},
  {id: 6, name: 'Eric Blair',
   birth_date: '1903-06-23', nationality: 'British'},
  {id: 7, name: 'Winston Churchill',
   birth_date: '1874-11-30', nationality: 'British'},
  {id: 8, name: 'Machado de Assis',
   birth_date: '1839-06-21', nationality: 'Brazilian'},
  {id: 9, name: 'Adolfo Caminha',
   birth_date: '1867-05-29', nationality: 'Brazilian'}
]

const books = [
  {id: 1, title: 'And Then There Were None', authorId: 1},
  {id: 2, title: 'The Moving Finger', authorId: 1},
  {id: 3, title: 'Mrs McGinty\'s Dead', authorId: 1},
  {id: 4, title: 'The Master and Margarita', authorId: 2},
  {id: 5, title: 'Morphine', authorId: 2},
  {id: 6, title: 'The Sly Old Cat', authorId: 3},
  {id: 7, title: 'The Tale of the Pie and the Patty-Pan', authorId: 3},
  {id: 8, title: 'Kane and Abel', authorId: 4},
  {id: 9, title: 'The 7 Habits of Highly Effective People', authorId: 5},
  {id: 10, title: 'The 8th Habit', authorId: 5},
  {id: 11, title: 'Nineteen Eighty-Four', authorId: 6},
  {id: 12, title: 'Animal Farm', authorId: 6},
  {id: 13, title: 'The Second World War', authorId: 7},
  {id: 14, title: 'A History of the English-Speaking Peoples', authorId: 7},
  {id: 15, title: 'Esaú e Jacó', authorId: 8},
  {id: 16, title: 'Quincas Borba', authorId: 8},
  {id: 17, title: 'O Alienista', authorId: 8},
  {id: 18, title: 'Memorial de Aires', authorId: 8},
  {id: 19, title: 'O Bom-Crioulo', authorId: 9},
  {id: 20, title: 'A Normalista', authorId: 9}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Book object represents a book written by an author.',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Book\'s numerical identification.'
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Book\'s title.'
    },
    authorId: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Key field to establish relation between a book and an author.'
    },
    author: {
      type: AuthorType,
      description: 'Textual idetification of the book\'s author.',
      resolve: (book) => {
        return authors.find(author => author.id === book.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This object stands for an author of a book object',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Author\'s numerical identification'
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Author\'s name'
    },
    birth_date: {
      type: GraphQLNonNull(GraphQLDate),
      description: 'Author\'s birth date' 
    },
    nationality: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Author\'s nationality'
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'Return a list with details of all books written by the author',
      resolve: (author) => {
        return books.filter(book => book.authorId === author.id)
      }
    }
  })
})

/*
const AggregatesAuthor = new GraphQLObjectType({
  name: 'Aggregations for author.',
  description: 'Aggregate functions fields for Author object.',
  fields: () => ({
    countof_books: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Returns the count of books in the database written by the '
    }
  })
})
*/

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Stores all queries.',
  fields: () => ({
    book: {
      type: BookType,
      description: 'Returns a single book by it\'s id.',
      args: {
        id: {type: GraphQLInt}
      },
      resolve: (parent, args) => books.find(book => book.id === args.id)
    },
    books: { 
      type: new GraphQLList(BookType),
      description: 'Returns the list of all books.',
      resolve: () => books
    },
    author: {
      type: AuthorType,
      description: 'Returns a single author by it\'s id.',
      args: {
        id: {type: GraphQLInt}
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'Returns the list of all authors.',
      resolve: () => authors
    }
  })
})

const RootMutationType = new GraphQLObjectType ({
  name: 'RootMutation',
  description: 'Stores all mutations',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'This mutation performs an update that adds a new book.',
      args: {
        title: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)}
      },
      resolve: (parent, args) => {
        //when work with a database, the id increments by default
        const book = {
          id: books.length + 1,
          title: args.title,
          authorId: args.authorId
        }
        books.push(book)
        return book
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'This mutation performs an update that adds a new author.',
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        birth_date: {type: GraphQLNonNull(GraphQLDate)},
        nationality: {type: GraphQLNonNull(GraphQLString)}
      },
      resolve: (parent, args) => {
        //when work with a database, the id increments by default
        const author = {
          id: authors.length + 1,
          name: args.name,
          birth_date: args.birth_date,
          nationality: args.nationality
        }
        authors.push(author)
        return author
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
  })
)

app.listen(8083, () => console.log('Server is up!'))
