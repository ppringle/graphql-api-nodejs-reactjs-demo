import React, {useState} from 'react';
import {useQuery, useLazyQuery, gql, useMutation} from '@apollo/client';

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
            nationality
        }
    }
`;

const GET_USER_BY_ID = gql`
    query User($userId: ID!) {
        user(id: $userId) {
            name
            age
            nationality
        }
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!){
        createUser(input: $input) {
            id
            name
        }
    }
`

function DisplayData() {

    const [searchUserId, setSearchUserId] = useState("");

    //Create User States
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");


    const {data, loading, error, refetch} = useQuery(QUERY_ALL_USERS);

    const [fetchUser, {data: userDataResult, error: userDataError}] = useLazyQuery(GET_USER_BY_ID);
    const [createUser] = useMutation(CREATE_USER_MUTATION);

    const handleUserSearchChange = (event) => {
        setSearchUserId(event.target.value);
    }

    if (loading) {
        return (
            <div>Data is loading...</div>
        )
    }

    return (
        <div>
            <div>
                <input type="text" placeholder="Name..."
                       onChange={(event) => setName(event.target.value)}/>
                <input type="text" placeholder="Username..."
                       onChange={(event) => setUsername(event.target.value)}/>
                <input type="number" placeholder="Age..."
                       onChange={(event) => setAge(Number(event.target.value))}/>
                <input type="text" placeholder="Nationality ..."
                       onChange={(event) => {
                           setNationality(event.target.value.toUpperCase())
                       }}/>
                <button onClick={() => {
                    createUser({
                        variables: {
                            input: {
                                name,
                                username,
                                age,
                                nationality
                            }
                        }
                    });
                    refetch();
                }
                }>Create User
                </button>
            </div>
            {data && data.users.map(user => {
                return (
                    <div>
                        <h1>Name: {user.name}</h1>
                        <h1>Username: {user.username}</h1>
                        <h1>Age: {user.age}</h1>
                        <h1>Nationality: {user.nationality}</h1>
                    </div>
                );
            })}
            <div>
                <input type="text" placeholder="User Id..." onChange={handleUserSearchChange}/>
                <button
                    onClick={() => {
                        fetchUser({
                            variables: {
                                userId: searchUserId,
                            }
                        });
                    }}>
                    Fetch User Info
                </button>
                <div>
                    {userDataResult && (
                        <div key={userDataResult.user.id}>
                            <h1>Name: {userDataResult.user.name}</h1>
                            <h1>Age: {userDataResult.user.age}</h1>
                            <h1>Nationality: {userDataResult.user.nationality}</h1>
                        </div>
                    )}
                    {userDataError && <h1>There was an error fetching the user matching the search term !</h1>}
                </div>
            </div>
        </div>
    )
}

export default DisplayData;