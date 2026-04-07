/*
Part1: Core Modules ( 1.5 Grades)
1. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
• Input Example: "./big.txt"
• Output Example: log each chunk
2. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
• Input Example: "./source.txt", "./dest.txt"
• Output Example: File copied using streams
3. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
• Input Example: "./data.txt", "./data.txt.gz"
*/

import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream";

const readStream = fs.createReadStream("./big.txt", {
  encoding: "utf-8",
  highWaterMark: 100,
});

readStream.on("data", (chunk) => {
  console.log({ chunk });
});

const sourceStream = fs.createReadStream("./source.txt");

const destStream = fs.createWriteStream("./dest.txt");

sourceStream.pipe(destStream);

destStream.on("finish", () => {
  console.log("File copied using streams");
});

function compressFile(inputPath, outputPath) {
  const source = fs.createReadStream(inputPath);
  const gzip = zlib.createGzip();
  const destination = fs.createWriteStream(outputPath);

  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log("File compressed successfully");
    }
  });
}

compressFile("./data.txt", "./data.txt.gz");

/*
1. Create an API that adds a new user to your users stored in a JSON file. 
(ensure that the email of the new user doesn’t exist before) (1 Grade)
o URL: POST /user

*/

/*
2. Create an API that updates an existing user's name, age, or email by their ID. 
The user ID should be retrieved from the URL (1 Grade)
Note: Remember to update the corresponding values in the JSON file

URL: PATCH /user/id


3. Create an API that deletes a User by ID. The user id should be retrieved from the URL (1 Grade)
Note: Remember to delete the user from the file
o URL: DELETE /user/id

4. Create an API that gets all users from the JSON file. (1 Grade)
o URL: GET /user
*/

import http from "http";
//import { users } from "./user.js";
let users = [];
fs.readFile("./user.json", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading user data:", err);
    return;
  }

  users = JSON.parse(data || "[]");
});

http
  .createServer((req, res) => {
    const { url, method } = req;
    const urlParts = url.split("/");
    if (urlParts[1] === "user") {
      if (method === "POST") {
        let userData = "";
        req.on("data", (chunk) => {
          userData += chunk;
        });
        req.on("end", () => {
          const newUser = JSON.parse(userData);
          addUser(newUser, res);
        });
      } else if (method === "PATCH") {
        const userId = parseInt(urlParts[2]);
        let userData = "";
        req.on("data", (chunk) => {
          userData += chunk;
        });
        req.on("end", () => {
          userData = JSON.parse(userData);
          updateUser(userId, userData, res);
        });
      } else if (method === "DELETE") {
        const userId = parseInt(urlParts[2]);
        deleteUser(userId, res);
      } else if (method === "GET") {
          const userId = parseInt(urlParts[2]);
          userId ? getUserById(userId, res) : getAllUsers(res);
      } else {
        res.write("Method Not Allowed");
        res.end();
      }
    } else {
      res.write("Not Found");
      res.end();
    }
  })
  .listen(4000, () => {
    console.log("Server Is Running");
  });

function addUser(newUser, res) {
  const existingUser = users.find((user) => user.email === newUser.email);
  if (existingUser) {
    res.write("Email already exists.");
    return res.end();
  }
  newUser.id = users[users.length - 1]?.id ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);
  res.write("User added successfully.\n");
  const userStr = JSON.stringify(users);
  res.write(userStr);
  fs.writeFile("./user.json", userStr, (err) => {
    if (err) {
      console.error("Error writing to user.json:", err);
    }
  });
  res.end();
}

function updateUser(userId, userData, res) {
  const existingUserId = users.findIndex((user) => user.id === userId);
  if (existingUserId == -1) {
    res.write("User Not Found.");
    return res.end();
  }
  const existingUserEmail = users.findIndex(
    (user) => user.email === userData.email,
  );
  if (existingUserEmail == -1 || existingUserEmail === existingUserId) {
    users[existingUserId].name = userData.name || users[existingUserId].name;
    users[existingUserId].age = userData.age || users[existingUserId].age;
    users[existingUserId].email = userData.email || users[existingUserId].email;

    const userStr = JSON.stringify(users);
    res.write(userStr);

    fs.writeFile("./user.json", userStr, (err) => {
      if (err) {
        console.error("Error writing to user.json:", err);
      }
    });
    res.write("\n User Updated successfully.\n");
    res.end();
  } else {
    res.write("Email already used by another user.");
    return res.end();
  }
}

function deleteUser(userId, res) {
  const existingUserId = users.findIndex((user) => user.id === userId);
  if (existingUserId == -1) {
    res.write("User id Not Found.");
    return res.end();
  }

  users.splice(existingUserId, 1);

  const userStr = JSON.stringify(users);
  res.write(userStr);
  fs.writeFile("./user.json", userStr, (err) => {
    if (err) {
      console.error("Error writing to user.json:", err);
    }
  });
  res.write("\n User Deleted successfully.\n");
  res.end();
}

function getAllUsers(res) {
  res.write(JSON.stringify(users));
  res.end();
}

function getUserById(userId, res) {
  const existingUser = users.find((user) => user.id === userId);
  if (!existingUser) {
    res.write("User Not Found.");
    return res.end();
  }
  res.write(JSON.stringify(existingUser));
  res.end();
}

/*
1. What is the Node.js Event Loop?

The Event Loop is the core mechanism that allows Node.js to perform non-blocking 
asynchronous operations despite being single-threaded.

It continuously checks:
Call Stack → is there code to execute?
Event Queue → are there completed async tasks waiting?
It pushes callbacks from the queue to the stack when the stack is empty.

👉 In short:
Event Loop = traffic controller that decides when async callbacks run

2. What is Libuv and What Role Does It Play in Node.js?

Libuv is a C library used by Node.js to handle asynchronous I/O operations.

🔧 It provides:

Event loop implementation
Thread pool
Async file system operations
Networking (TCP, UDP)

👉 Without libuv:
Node.js wouldn’t be able to handle async operations efficiently.

3. How Does Node.js Handle Asynchronous Operations Under the Hood?

Node.js uses:

Event Loop
Libuv (thread pool + OS APIs)

📌 Flow:

Async task (e.g., file read, API call) is sent to libuv
It is handled by:
OS (for network I/O), OR
Thread pool (for file system, crypto)
Once done → callback is placed in Event Queue
Event Loop moves it to Call Stack when ready
4. Difference Between Call Stack, Event Queue, and Event Loop

Call Stack	Executes functions (LIFO). Only one task at a time
Event Queue	Holds completed async callbacks waiting to execute
Event Loop	Moves callbacks from queue → stack when stack is empty

👉 Simple analogy:

Call Stack = Chef 👨‍🍳
Event Queue = Orders waiting 🧾
Event Loop = Waiter delivering orders 🚶‍♂️
--------------------------------------------------------------------

5. What is the Node.js Thread Pool and How to Set the Thread Pool Size?

Node.js uses a thread pool (via libuv) for heavy tasks like:

File system operations
Crypto
Compression

📌 Default size:

4 threads

📌 Change size:

UV_THREADPOOL_SIZE=8 node app.js

👉 Important:

Max recommended: around number of CPU cores
Too many threads = performance overhead

----------------------------------------------------------------

6. How Does Node.js Handle Blocking and Non-Blocking Code Execution?
🔴 Blocking Code
Runs synchronously
Stops execution of other code
const data = fs.readFileSync('file.txt'); // blocks
🟢 Non-Blocking Code
Runs asynchronously
Allows other operations to continue
fs.readFile('file.txt', (err, data) => {
  console.log(data);
});

*/