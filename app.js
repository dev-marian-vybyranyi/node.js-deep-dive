const fs = require("fs/promises");

(async () => {
  const createFile = async (path) => {
    try {
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();

      return console.log(`The file ${path} already exists.`);
    } catch (e) {
      const newFileHandle = await fs.open(path, "w");
      console.log("A new file was successfully created.");
      newFileHandle.close();
    }
  };

  const CREATE_FILE = "create a file";

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);
    const offset = 0;
    const length = buff.byteLength;
    const position = 0;

    await commandFileHandler.read(buff, offset, length, position);

    const command = buff.toString("utf-8");

    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }
  });

  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
