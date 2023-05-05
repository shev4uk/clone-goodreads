import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Mutation($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
    }
  }
`;

export const REGISTER_USER = gql`
	mutation Mutation($input: CreateUserInput!) {
		create(input: $input) {
			name
			password
			email
		}
	}
`;

export const GET_BOOKS = gql`
	query Query {
		books {
			author
			date
			id
			image
			title
			type
		}
	}
`;

export const GET_BOOK = gql`
	query Query($id: ID!) {
		book(id: $id) {
			author
			date
			id
			image
			title
			type
		}
	}
`;

export const CREATE_BOOKS = gql`
	mutation Mutation($input: CreateBookInput!) {
		createBook(input: $input) {
			author
			date
			image
			title
			type
		}
	}
`;

export const UPDATE_BOOK = gql`
	mutation Mutation($id: ID!, $type: String!) {
		updateBook(id: $id, type: $type) {
			author
			date
			image
			title
			type
		}
	}
`;