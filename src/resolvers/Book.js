const Book = {
    writted_by (parent, args, {db}, info){
        return db.authors.find(function(author){
            return author.id === parent.writted_by
        })
    },
    register_by (parent, args, {db}, info){
        return db.users.find(function(user){
            return user.id === parent.register_by
        })
    }
}

export default Book