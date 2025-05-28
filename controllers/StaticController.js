import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function serveStatic(fileName) {
  return (req, res) => {
    const filePath = path.join(__dirname, '../views', fileName);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found');
    }
  };
}

export default {
  serveBlagues: (req, res) => {
    serveStatic('allJokes.html')(req, res);
  },
  serveIndex: (req, res) => {
    serveStatic('joke.html')(req, res);
  },
};