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
	query Users {
		users {
			id
			username
			email
			passwordHash
			interests
			posts
			socials {
				github
				linkedin
				discord
				telegram
				instagram
				facebook
			}
		}
	}
`

export const LOGIN_USER = gql`
	query Query($input: LoginInput!) {
		login(input: $input) {
			id
			username
			email
			interests
			posts
			dateCreated
			socials {
				github
				linkedin
				discord
				telegram
				instagram
				facebook
			}
		}
	}
`

export const CREATE_USER = gql`
	mutation createUser($input: NewUserInput!) {
		createUser(input: $input) {
			id
			username
			email
			passwordHash
			interests
			posts
			socials {
				github
				linkedin
				discord
				telegram
				instagram
				facebook
			}
		}
	}
`
