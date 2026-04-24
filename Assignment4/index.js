import express from "express";
import fs from "fs/promises";
import path from "path";

async function readUserFile() {
  try {
    const data = await fs.readFile(path.resolve("users.json"), {
      encoding: "utf-8",
    });
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function WriteInUserFile(users) {
  try {
    await fs.writeFile(path.resolve("users.json"), JSON.stringify(users), {
      encoding: "utf-8",
    });
  } catch (error) {
    console.log(error);
  }
}

const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const { name, email,age } = req.body;
    if (name && email && age) {
      const users = await readUserFile();
      const emailExist = users.findIndex((user) => user.email === email);
      if (emailExist === -1) {
        const newUser = {
          id: Date.now(),
          name,
          email,
          age,
        };

        users.push(newUser);
        await WriteInUserFile(users);
        return res.status(201).json({ message: "User Added SuccessFully" });
      } else {
        return res.status(403).json({ message: "User Already Exist" });
      }
    } else {
      return res.status(406).json({ message: "User Data is Required" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

app.put("/users", async (req, res) => {
  try {
    const { id, name, email, age } = req.body;
    if (id && (name || email || age)) {
      const users = await readUserFile();
      const userIndex = users.findIndex((user) => user.id == id);
      if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
      }

      const emailExist = users.findIndex(
        (user) => user.email === email && user.id !== id,
      );

      // Check email uniqueness only if email is provided
      if (email) {
        const emailExists = users.some(
          (user) => user.email === email && user.id !== id,
        );

        if (emailExists) {
          return res.status(409).json({ message: "Email already exists" });
        }
      }
      // Update only provided fields
      if (name) users[userIndex].name = name;
      if (email) users[userIndex].email = email;
      if (age) users[userIndex].age = age;
      await WriteInUserFile(users);
      return res.status(200).json({
        message: "User updated successfully",
        user: users[userIndex],
      });
    } else {
      return res
        .status(400)
        .json({ message: "At least name or email must be provided" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    // Validate ID
    if (!id) {
      return res.status(400).json({ message: "Valid user id is required" });
    }

    const users = await readUserFile();
    const existUserIndex = users.findIndex((user) => user.id == id);
    if (existUserIndex !== -1) {
      users.splice(existUserIndex, 1);
      await WriteInUserFile(users);
      return res.status(200).json({ message: "User deleted successfully " });
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});



app.get("/users-by-name", async (req, res) => {
  try {
    const { name } = req.query;
    const users = await readUserFile();
    const existUsers = users.filters((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (existUsers.length) return res.status(200).json({ users: existUser });
    else return res.status(404).json({ message: "User Not Found" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await readUserFile();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

/**6  filters users by minimum age. */
app.get("/user/filter", async (req, res) => {
    const { minAge } = req.query;
    try {
        const users = await readUserFile();
        const filteredUsers = users.filter((user) => user.age > minAge);
        return res.status(200).json({ "users": filteredUsers });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

/** gets User by ID*/

app.get("/get-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await readUserFile();
    const existUser = users.find((user) => user.id == id);
    if (existUser) return res.status(200).json({ user: existUser });
    else return res.status(404).json({ message: "User Not Found" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});

/*
200 OK
201 Created
204 No Content

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable

500 Internal Server Error
*/
