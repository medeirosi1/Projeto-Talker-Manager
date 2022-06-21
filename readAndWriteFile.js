const fs = require('fs').promises;

const readFile = async (path) => {
    try {
      const content = await fs.readFile(path, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      return null;
    }
  };

const writeFile = async (path, content) => {
    try {
      const readfile = await readFile(path);
      readfile.push(content);
      await fs.writeFile(path, JSON.stringify(readfile));
    } catch (error) {
      console.log(error.message);
    }
};

module.exports = {
    readFile,
    writeFile,
};