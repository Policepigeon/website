const express = require('express');
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const frontMatter = require('front-matter');
const hljs = require('highlight.js');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Markdown files for blog posts
const getPosts = () => {
  const files = fs.readdirSync(path.join(__dirname, 'blog')).filter(file => file.endsWith('.md'));
  return files.map(file => {
    const filePath = path.join(__dirname, 'blog', file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { attributes, body } = frontMatter(content);
    return {
      ...attributes,
      content: marked(body),
      filename: file
    };
  });
};

// Get the current blog posts
const posts = getPosts();

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});

app.get('/blog/:slug', (req, res) => {
  const post = posts.find(p => p.filename === `${req.params.slug}.md`);
  if (!post) return res.status(404).send('Post not found');

  const prevPost = posts[posts.indexOf(post) - 1];
  const nextPost = posts[posts.indexOf(post) + 1];

  res.render('post.html', {
    post,
    prevPost,
    nextPost
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
