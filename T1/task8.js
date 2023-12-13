const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Use the built-in 'fs' module for file operations

const app = express();
const PORT = 3000;
const JSON_FILE_PATH = '\data.json'; // Replace with the actual path to your JSON file

// Middleware to parse JSON requests
app.use(bodyParser.json());

// In-memory storage for demonstration purposes (replace with actual file/database operations)
let fileContent = '';

// Read the content of the JSON file when the server starts
fs.readFile(JSON_FILE_PATH, 'utf-8')
  .then((content) => {
    fileContent = content;
    console.log('JSON file content loaded successfully.');
  })
  .catch((err) => {
    console.error(`Error reading JSON file: ${err.message}`);
  });

// GET endpoint to read file content
app.get('/', (req, res) => {
  res.status(200).json({ content: fileContent });
});

// POST endpoint to write content to the file
app.post('/write', (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required for writing to the file.' });
  }

  fileContent = content;
  // Update the JSON file with the new content (optional)
  fs.writeFile(JSON_FILE_PATH, content, 'utf-8')
    .then(() => {
      console.log('JSON file updated successfully.');
    })
    .catch((err) => {
      console.error(`Error updating JSON file: ${err.message}`);
    });

  res.status(201).json({ message: 'File content has been written successfully.' });
});

// PUT endpoint to update file content
app.put('/update', (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required for updating the file.' });
  }

  fileContent = content;
  // Update the JSON file with the new content (optional)
  fs.writeFile(JSON_FILE_PATH, content, 'utf-8')
    .then(() => {
      console.log('JSON file updated successfully.');
    })
    .catch((err) => {
      console.error(`Error updating JSON file: ${err.message}`);
    });

  res.status(200).json({ message: 'File content has been updated successfully.' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
