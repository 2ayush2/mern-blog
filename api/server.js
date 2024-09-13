const express = require("express");
const cors = require("cors");
const db = require("./Database/Data");
const Admin = require("./Model/Admin");
const Post = require("./Model/Post");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = "hkfsjdkhfjksadhjknjnjdskdbfkj";

// Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // Allow cross-origin requests from your frontend
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// File upload setup
const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
});

// Middleware for token authentication
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("This is the data");
});

// Registration route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
    });
    res.json(newAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    const isPasswordMatch = bcrypt.compareSync(password, admin.password);
    if (isPasswordMatch) {
      jwt.sign({ username: admin.username, id: admin._id }, secret, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          return res.status(500).json({ error: 'Error in the token generation' });
        }
        res.cookie('token', token, { httpOnly: true, secure: false }).json({
          id: admin._id,
          username: admin.username
        });
      });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Profile route (requires authentication)
app.get('/profile', authenticateToken, (req, res) => {
  res.json(req.user);
});

// Logout route
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Handle file upload and form data in backend
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname } = req.file;
  const ext = path.extname(originalname); // Get the file extension (including the dot)
  const baseName = path.basename(req.file.path); // Get the base name of the temporary file
  const newPath = path.join(path.dirname(req.file.path), baseName + ext); // Construct the new file path

  // Rename file
  fs.rename(req.file.path, newPath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error renaming file' });
    }
  });

  const { title, summary, content } = req.body;
  try {
    const newData = await Post.create({
      title,
      summary,
      content,
      file: newPath // Updated file path
    });
    res.json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Show posts
app.get('/post', async (req, res) => {
  try {
    const posts = await Post.find().limit(20).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Show single post
app.get('/inner-post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const postInfo = await Post.findById(id); // Await the asynchronous operation
    if (!postInfo) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(postInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update the post
app.put('/post/:id', uploadMiddleware.single('file'), async (req, res) => {
  const { title, summary, content } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // If a new file is uploaded
    if (req.file) {
      const { originalname } = req.file;
      const ext = path.extname(originalname); // Get the file extension
      const baseName = path.basename(req.file.path, ext); // Get the base name of the temporary file
      const newFilePath = path.join(path.dirname(req.file.path), baseName + ext); // Construct the new file path

      // Rename file
      fs.rename(req.file.path, newFilePath, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error renaming file' });
        }
      });

      // Update the file path in the post
      post.file = newFilePath;
    }

    // Update post details
    post.title = title;
    post.summary = summary;
    post.content = content;

    // Save updated post
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the Express server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
