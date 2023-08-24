const {UserList, MovieList} = require('../fakeData');

const resolvers = {
    Query: {

        //User Resolvers...
        users: () => {
            return UserList;
        },
        user: (_, args) => {
            const id = Number(args.id);
            return UserList.find(user => user.id === id);
        },

        //Movie Resolvers
        movies: () => {
            return MovieList;
        },
        movie: (_, args) => {
            const name = args.name;
            return MovieList.find(movie => movie.name === name);
        }
    },
    User: {
        favouriteMovies: () => {
            return MovieList.filter(movie => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
        }
    },
    Mutation: {
        createUser: (_, args) => {
            const userToBeCreated = args.input;
            const lastId = UserList[UserList.length - 1].id
            userToBeCreated.id = lastId + 1;
            UserList.push(userToBeCreated);
            console.log("userToBeCreated: ", userToBeCreated);
            return userToBeCreated
        },
        updateUserName: (_, args) => {
            const {id, newUserName} = args.input;
            console.log(`id: ${id}, newUserName: ${newUserName}`);
            let userToBeUpdated;
            UserList.forEach(user => {
                if (user.id === Number(id)) {
                    user.username = newUserName;
                    userToBeUpdated = user;
                }
            });
            return userToBeUpdated;
        },
        deleteUser: (_, args) => {
            const id = args.id;
            let userIndex = UserList.findIndex(user => user.id === Number(id));
            if (userIndex !== -1) {
                console.log("UserIndex: ", userIndex);
                UserList.splice(userIndex, 1);
            }
            return null;
        }
    }
}

module.exports = {resolvers};