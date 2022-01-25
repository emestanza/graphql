import {v4 as uuidV4} from 'uuid'
const Mutation = {
    createUser: (parent, {data}, {db}, info) => {

        const isEmailTaken = db.users.some(
            user => 
            user.email === data.email
        )

        if(isEmailTaken){
            throw new Error("Email is taken")
        }

        const user = {
            id: uuidV4(),
            ...data
        }

        db.users.push(user)
        return user

    },

    updateUser: (parent, {id, data}, {db}, info) => {

        const userExists = db.users.find(user => user.id === id)

        if (!userExists){
            throw new Error("user not found")
        }

        const isEmailTaken = db.users.some(user => user.email === data.email)

        if (isEmailTaken){
            throw new Error ("Email taken")
        }

        db.users = db.users.map(user => {
            if (user.id === id){
                user = {...user, ...data}
                return user
            }
            return user
        })

        return {...userExists, ...data}
    },

    createAuthor: (parent, {data}, {db}, info) => {
        const author = {
            id: uuidV4(),
            ...data
        }

        db.authors.push(author)

        return author
    },

    updateAuthor: (parent, {id, data}, {db}, info) => {
        
        const authorExists = db.authors.find(author => author.id === id)

        if (!authorExists){
            throw new Error("Author does not exist")
        }

        db.authors = db.authors.map(author => {
            if (author.id === id){
                author = {...author, ...data}
                return author
            }

            return author
        })

        return {...authorExists, ...data}
    },

    createBook: (parent, {data}, {db}, info) => {
       const book = {
           id: uuidV4(),
           ...data
       }

       db.books.push(book)

       return book
    },

    updateBook: (parent, {id, data}, {db}, info) => {

        const bookExists = db.books.find(book => book.id === id)

        if (!bookExists){
            throw new Error("Book not found")
        }

        db.books = db.books.map(book => {
            if (book.id === id){
                book = {...book, ...data}
                return book
            }

            return book
        })

        return {...bookExists, ...data}
    },

    deleteBook: (parent, {id}, {db}, info) => {
        const bookExists = db.books.find(book => book.id === id)
        
        if (!bookExists){
            throw new Error("Book not found")
        }

        db.books = db.books.reduce((acc, book) => {
            if (book.id !== id){
                acc.push(book)
            }

            return acc
        }, [])
    }

}

export default Mutation