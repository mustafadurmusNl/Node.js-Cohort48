const express = require('express')
const app = express();
 const fs = require('fs');
 const path = require('path');
 app.use(express.json());

// YOUR CODE GOES IN HERE
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.post('/blogs', (req, res) => {
 const { title, content } = req.body;
 const postFileName = `${title}.txt`;
 const postFilePath = path.join(__dirname, postFileName);
 const isPostExist = fs.existsSync(postFilePath);
 if(isPostExist) {
   return res.status(409).send('Blog already exists');
 }
 if(title&&content) {
  try {
    fs.writeFileSync(postFilePath, content);
    res.status(201).send('Post created successfully');
  } catch (error) { 
    res.status(500).send('Internal Server Error');
  }
}
else {
  res.status(400).send('Title and content are required');
 }
});

app.put('/blogs/:title', (req, res) => {
  const { title } = req.params;
  const { content } = req.body;
  if (!content) {
    return res.status(400).send('Content is required');
  }
  if (!fs.existsSync) {
    return res.status(404).send('Blog not found');
  } else{
    fs.writeFileSync(title, content);
    res.send('ok');
  }
}
);
app.delete('/blogs/:title', (req, res) => {
  const { title } = req.params;
  if (!fs.existsSync(title)) {
    return res.status(404).send('Blog not found');
  } else {
    fs.unlinkSync(title);
    res.send('ok');
  }  
}
);
app.get('/blogs', (req, res) => {
  const files = fs.readdirSync('./'); 
  const blogs = files.filter(file => !file.startsWith('.'))
  res.json(blogs);
});
module.exports = app;