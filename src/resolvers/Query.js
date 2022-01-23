const Query = {
    hello (parent, args, ctx, info){
        const {name} = args
        return `Hello ${name || "world"}`
    },
    quantity () {
        return 1
    },
    user (parent, {id}, ctx, info) {
        const { db } = ctx

        if(!id) {
            return db.users
        }

        return db.users.filter(function (user){
            return user.id === id
        })
    },
    author (parent, {id}, {db}, info) {
        
        if(!id){
            return db.authors
        }

        return db.authors.filter(function (author){
            return author.id === id
        })
    },
    book (parent, {id}, {db}, info) {
        
        if(!id){
            return db.books
        }

        return db.books.filter(function (book){
            return book.id === id
        })
    }
}


export default Query