# Queries tets model

## Querying a single book by it's number id

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

```graphql
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
      "message": "Expected type Int, found \"s\".",
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

## Querying the fields of all authors and its books titles

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

```graphql
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
