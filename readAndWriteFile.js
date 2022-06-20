const fs = require('fs').promises;

const readFile = async (path) => {
    try {
      const content = await fs.readFile(path, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      return null;
    }
  };

// const writeFile = async (path, content) => {
//     try {
        
//     } catch (error) {
//       console.log(error.message);
//     }
// };

module.exports = {
    readFile,
};