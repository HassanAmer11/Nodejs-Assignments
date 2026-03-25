import path from "path";
import fs from "fs";
import os from "os";
import EventEmitter from "events";

// 1. Log current file path and directory
function getCurrentPaths() {
  return {
    File: path.resolve("index.js"),
    Dir: path.dirname(path.resolve("index.js")),
  };
}

// 2. Get file name from path
function getFileName(filePath) {
  return path.basename(filePath);
}

// 3. Build path from object
function buildPath(obj) {
  return path.format({
    dir: obj.dir,
    name: obj.name,
    ext: obj.ext,
  });
}

// 4. Get file extension
function getExtension(filePath) {
  return path.extname(filePath);
}

// 5. Parse path (name + ext)
function parsePath(filePath) {
  const parsed = path.parse(filePath);
  return {
    Name: parsed.name,
    Ext: parsed.ext,
  };
}

// 6. Check if path is absolute
function isAbsolutePath(filePath) {
  return path.isAbsolute(filePath);
}

// 7. Join multiple segments
function joinSegments(...segments) {
  return path.join(...segments);
}

// 8. Resolve relative to absolute
function resolvePath(relPath) {
  return path.resolve(relPath);
}

// 9. Join two paths
function joinTwoPaths(p1, p2) {
  return path.join(p1, p2);
}

// 10. Delete file asynchronously
function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) return console.log("Error:", err.message);
    console.log(`${filePath} is deleted.`);
  });
}

// 11. Create folder synchronously
function createFolder(dirPath) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("Success");
  } catch (err) {
    console.log("Error:", err.message);
  }
}

const emitter = new EventEmitter();

// 12. Start event
emitter.on("start", () => {
  console.log("Welcome event triggered!");
});

// 13. Login event
emitter.on("login", (username) => {
  console.log(`User logged in: ${username}`);
});

// Trigger events
// emitter.emit("start");
// emitter.emit("login", "Ahmed");

// 14. Read file synchronously
function readFileSyncFunc(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    console.log("the file content =>", data);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

// 15. Write asynchronously
function writeFileAsync(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) return console.log("Error:", err.message);
    console.log("File written successfully");
  });
}

// 16. Check if directory/file exists
function checkExists(filePath) {
  return fs.existsSync(filePath);
}

function getSystemInfo() {
  return {
    Platform: os.platform(),
    Arch: os.arch(),
  };
}

console.log(getCurrentPaths());
console.log(getFileName("/user/files/report.pdf"));
console.log(buildPath({ dir: "/folder", name: "app", ext: ".js" }));
console.log(getExtension("/docs/readme.md"));
console.log(parsePath("/home/app/main.js"));
console.log(isAbsolutePath("/home/user/file.txt"));
console.log(joinSegments("src", "components", "App.js"));
console.log(resolvePath("./index.js"));
console.log(joinTwoPaths("/folder1", "folder2/file.txt"));

deleteFile("./test.txt");
createFolder("./newFolder");

emitter.emit("start");
emitter.emit("login", "Ahmed");

readFileSyncFunc("./notes.txt");
writeFileAsync("./async.txt", "Async save");

console.log(checkExists("./notes.txt"));
console.log(getSystemInfo());
