const express = require('express');
const marked = require('marked');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files like CSS, JS, images
app.use(express.static('public'));

// Example route for rendering a blog post
app.get('/blog/:slug', (req, res) => {
  const slug = req.params.slug;
  const postPath = path.join(__dirname, 'posts', `${slug}.md`); // Assuming posts are saved as .md files

  fs.readFile(postPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('Post not found');
    }
    const htmlContent = marked(data); // Convert Markdown to HTML

    // Render the post
    res.render('post', { content: htmlContent });
  });
});

// Set up view engine (e.g., EJS or Pug)
app.set('view engine', 'ejs');

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
