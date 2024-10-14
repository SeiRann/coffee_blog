import { gql } from "@apollo/client"

// export const CREATE_USER = gql`
//   mutation createUser($input: NewUserInput!) {
//     createUser(input: $input) {
//       active
//       age
//       email
//       first_name
//       id
//       last_name
//     }
//   }
// `;

export const FETCH_USERS = gql`
	query getUsers {
		users {
			username
			email
		}
	}
`

export const CREATE_USER = gql`
	mutation createUser($input: UserInput!) {
		createUser(input: $input) {
			username
			email
		}
	}
`
