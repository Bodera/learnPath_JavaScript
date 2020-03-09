const express = require('express')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLDate,
  GraphQLNonNull
} = require('graphql')
const app = express()


const authors = [
  {id: 1, name: 'Agatha Christie', birth_date: '15/09/1890', nationality: 'British'},
  {id: 2, name: 'Mikhail Bulgakov', birth_date: '15/05/1891', nationality: 'Ukrainian'},
  {id: 3, name: 'Beatrix Potter', birth_date: '28/07/1866', nationality: 'British'},
  {id: 4, name: 'Jeffrey Archer', birth_date: '15/04/1940', nationality: 'British'},
  {id: 5, name: 'Stephen Covey', birth_date: '24/10/1932', nationality: 'American'},
  {id: 6, name: 'Eric Blair', birth_date: '25/06/1903', nationality: 'British'},
  {id: 7, name: 'Winston Churchill', birth_date: '30/11/1874', nationality: 'British'},
  {id: 8, name: 'Machado de Assis', birth_date: '21/06/1839', nationality: 'Brazilian'},
  {id: 9, name: 'Adolfo Caminha', birth_date: '29/05/1867', nationality: 'Brazilian'}
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
      type: GraphQLNonNull(GraphQLString),
      description: 'Author\'s birth date' 
    },
    nationality: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Author\'s nationality'
    },
    books: {
      type: BookType,
      description: 'Books written by the author',
      resolve: (author) => {
        return books.
                  filter(book => book.authorId === author.id)
        }
    }
  })
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This object stands for a book written by an author object',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Book\'s numerical identification'
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Book\'s title'
    },
    authorId: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Key field to establish relation between a book and an author' 
    },
    author: {
        type: AuthorType,
        description: 'Name of the author of the book',
        resolve: (book) => {
          return authors.
                    find(author => author.id === book.authorId)
        }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Top level query',
  fields: () => ({
    books: { 
      type: GraphQLList(BookType),
      description: 'Returns the list of all books.',
      resolve: () => books
    },
    authors: {
      type: GraphQLList(AuthorType),
      description: 'Returns the list of all authors.',
      resolve: () => authors
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
)

app.listen(8083, () => console.log('Server is up!'+books[2].title))
