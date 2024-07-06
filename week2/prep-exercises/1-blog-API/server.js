const express = require('express')
const app = express();
 const fs = require('fs');
 app.use(express.json());

// YOUR CODE GOES IN HERE
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.post('/blogs', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }
  fs.writeFileSync(title, content);
  res.send('ok');
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
app.listen(3000)