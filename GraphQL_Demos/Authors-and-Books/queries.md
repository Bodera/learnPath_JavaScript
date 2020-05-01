# Queries tets model

A document for test the functionalities of the program more efficiently.

## Summary

- [Querying a single book by it's number id](https://github.com/Bodera/learnPath_JavaScript/blob/master/GraphQL_Demos/Authors-and-Books/queries.md#querying-a-single-book-by-its-number-id)
- [Querying a single author by it's number id](https://github.com/Bodera/learnPath_JavaScript/blob/master/GraphQL_Demos/Authors-and-Books/queries.md#querying-a-single-author-by-its-number-id)
- [Querying the fields of all authors and it's books titles](https://github.com/Bodera/learnPath_JavaScript/blob/master/GraphQL_Demos/Authors-and-Books/queries.md#querying-the-fields-of-all-authors-and-its-books-titles)
- [Querying for all books](https://github.com/Bodera/learnPath_JavaScript/blob/master/GraphQL_Demos/Authors-and-Books/queries.md#querying-for-all-books)
- [Mutation that adds a new book, and returns it's title and id](https://github.com/Bodera/learnPath_JavaScript/blob/master/GraphQL_Demos/Authors-and-Books/queries.md#mutation-that-adds-a-new-book-and-returns-its-title-and-id)
- [Mutation that adds a new author, and returns it's details](https://github.com/Bodera/learnPath_JavaScript/blob/master/GraphQL_Demos/Authors-and-Books/queries.md#mutation-that-adds-a-new-author-and-returns-its-details)

### Querying a single book by it's number id

Input:

```graphql
query
{
  book(id: 1) {
    title,
    author {
      name
    }
  }
}
```

Successful output:

```json
{
  "data": {
    "book": {
      "title": "And Then There Were None",
      "author": {
        "name": "Agatha Christie"
      }
    }
  }
}
```

Exception output for nonexistent `id`:

```json
{
  "data": {
    "book": null
  }
}
```

Exception output for `id` data type:

```json
{
  "errors": [
    {
      "message": "Expected type Int, found \"teste\".",
      "locations": [
        {
          "line": 34,
          "column": 13
        }
      ]
    }
  ]
}
```

Test function:

```javascript
```

### Querying a single author by it's number id

Input:

```graphql
query
{
  author(id: 1){
    name,
    birth_date,
    nationality,
    books {
      title
    }
  }
}
```

Successful output:

```json
{
  "data": {
    "author": {
      "name": "Agatha Christie",
      "birth_date": "1890-09-15",
      "nationality": "British",
      "books": [
        {
          "title": "And Then There Were None"
        },
        {
          "title": "The Moving Finger"
        },
        {
          "title": "Mrs McGinty's Dead"
        }
      ]
    }
  }
}
```

Exception output for nonexistent `id`:

```json
{
  "data": {
    "author": null
  }
}
```

Exception output for `id` data type:

```json
{
  "errors": [
    {
      "message": "Expected type Int, found \"teste\".",
      "locations": [
        {
          "line": 34,
          "column": 13
        }
      ]
    }
  ]
}
```

Test function:

```javascript
```

### Querying the fields of all authors and it's books titles

Input:

```graphql
query
{
  authors {
    id,
    name,
    birth_date,
    nationality,
    books {
      title
    }
  }
}
```

Successful output:

```json
{
  "data": {
    "books": [
      {
        "title": "And Then There Were None",
        "id": 1
      },
      {
        "title": "The Moving Finger",
        "id": 2
      },
      {
        ...
      }
    ]
  }
}
```

Exception output:

```json
{
  "data": {
  }
}
```

Test function:

```javascript
```

### Querying for all books

Input:

```graphql
query{
  books {
    id,
    title
  }
}
```

Successful output:

```json
{
  "data": {
    "authors": [
      {
        "id": 1,
        "name": "Agatha Christie",
        "birth_date": "1890-09-15",
        "nationality": "British",
        "books": [
          {
            "title": "And Then There Were None"
          },
          {
            "title": "The Moving Finger"
          },
          {
            "title": "Mrs McGinty's Dead"
          }
        ]
      },
      {
        "id": 2,
        "name": "Mikhail Bulgakov",
        "birth_date": "1891-05-15",
        "nationality": "Ukrainian",
        "books": [
          {
            "title": "The Master and Margarita"
          },
          {
            "title": "Morphine"
          }
        ]
      },
      {
          ...
      }
    ]
  }
}
```

Exception output:

```json
{
  "data": {

  }
}
```

Test function:

```javascript
```

### Mutation that adds a new book, and returns it's title and id

Input:

```graphql
mutation{
  addBook(authorId: 4, title: "First Among Equals") {
    title,
    id
  }
}
```

Successful output:

```json
{
  "data": {
    "addBook": {
      "title": "First Among Equals",
      "id": 21
    }
  }
}
```

Exception output:

```json
{
  "data": {

  }
}
```

Test function:

```javascript
```

### Mutation that adds a new author, and returns it's details

Input:

```graphql
mutation{
  addAuthor(
    name: "Ruth Rocha",
    birth_date: "1931-03-02",
  	nationality: "Brazilian") {
    name,
    id,
    nationality,
    birth_date,
    books {
      title
    }
  }
}
```

Successful output:

```json
{
  "data": {
    "addAuthor": {
      "name": "Ruth Rocha",
      "id": 10,
      "nationality": "Brazilian",
      "birth_date": "1931-03-02",
      "books": []
    }
  }
}
```

Exception output:

```json
{
  "data": {
  }
}
```

Test function:

```javascript
```
