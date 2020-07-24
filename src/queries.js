import { gql  } from '@apollo/client'


const AUTHOR_DETAILS = gql`
fragment authorDetails on Author {
  id
  name
  born
  bookCount
}
`

export const CURRENT_USER = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const FAVORITE_BOOKS = gql`
  query {
    favorites {
      title
      author {
      ...authorDetails
      }
      published
      genres
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...authorDetails
    }
  }
  ${AUTHOR_DETAILS}
`
export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String){
    allBooks(author: $author, genre: $genre) { 
      title
      author {
        ...authorDetails
      }
      published
      genres
    }
  }
  ${AUTHOR_DETAILS}
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author:String!, $published:Int!, $genres:[String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ){
      title,
      author {
        ...authorDetails
      }
    }
  }
  ${AUTHOR_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        ...authorDetails
      }
      published
      genres
    }
  }
${AUTHOR_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      ...authorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const AUTHOR_EDITED = gql`
  subscription {
    authorEdited {
      ...authorDetails
    }
  }
${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const SIGNUP = gql`
  mutation createUser($username: String!, $favoriteGenre: String!, $password: String!){
    createUser(
      username: $username,
      favoriteGenre: $favoriteGenre,
      password: $password
    ) {
      value
    }
  }
`
