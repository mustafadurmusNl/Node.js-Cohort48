app.post('/blogs', (req, res) => {
  const { title, content } = req.body;

  // Check for missing title or content
  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }

  // Check if the blog already exists
  if (fs.existsSync(title)) {
    return res.status(409).send('Blog already exists');
  }

  // Create the new blog post
  try {
    fs.writeFileSync(title, content);
    res.status(201)
      .header('Content-Type', 'text/plain')
      .send('Post created successfully');
  } catch (err) {
    console.error('Error writing file:', err);  // Log the error for debugging
    res.status(500).send('Internal Server Error');
  }
});