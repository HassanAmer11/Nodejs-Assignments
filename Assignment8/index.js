// 1. Explicit collection: books with non-empty title validation
db.createCollection("books", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
      properties: {
        title: {
          bsonType: "string",
          minLength: 1,
          description: "title must be a non-empty string",
        },
      },
    },
  },
});


// 2. Implicit collection: authors
db.authors.insertOne({
  name: "George Orwell",
  nationality: "British"
})


// 3. Capped collection: logs with 1MB size limit
db.createCollection("logs", {
  capped: true,
  size: 1048576
})


// 4. Index on books.title
db.books.createIndex({ title: 1 })


// 5. Insert one document into books
db.books.insertOne({
  title: "1984",
  author: "George Orwell",
  publishedYear: 1949
})
