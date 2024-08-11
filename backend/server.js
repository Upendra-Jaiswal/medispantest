// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { processFile } from "./fileProcessor.js";

// const app = express();
// const port = 3001;

// // Set up multer for file uploads
// const upload = multer({ dest: "temp-uploads/" }); // Temporary storage

// app.post("/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   const uploadedFilePath = path.join(__dirname, req.file.path);

//   try {
//     const result = processFile(uploadedFilePath);
//     res.json(result);
//   } catch (error) {
//     res.status(500).send(error.message);
//   } finally {
//     // Clean up temporary file
//     fs.unlink(uploadedFilePath, (err) => {
//       if (err) console.error("Error deleting file:", err);
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// import express from 'express';
// import multer from 'multer';
// import { processFile } from './fileProcessor.js';

// const app = express();
// const port = 3000;

// // Set up multer for file uploads
// const upload = multer({ dest: 'temp-uploads/' }); // Temporary storage

// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const uploadedFilePath = path.join(__dirname, req.file.path);

//   try {
//     const result = processFile(uploadedFilePath);
//     res.json(result);
//   } catch (error) {
//     res.status(500).send(error.message);
//   } finally {
//     // Clean up temporary file
//     fs.unlink(uploadedFilePath, (err) => {
//       if (err) console.error('Error deleting file:', err);
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { processFile } from './fileProcessor.js';

// const app = express();
// const port = 3000;

// // Set up multer for file uploads
// const upload = multer({ dest: 'temp-uploads/' }); // Temporary storage

// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const uploadedFilePath = path.join(__dirname, req.file.path);

//   try {
//     const result = processFile(uploadedFilePath);
//     res.json(result);
//   } catch (error) {
//     res.status(500).send(error.message);
//   } finally {
//     // Clean up temporary file
//     fs.unlink(uploadedFilePath, (err) => {
//       if (err) console.error('Error deleting file:', err);
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { processFile } from "./fileProcessor.js";

// const app = express();
// const port = 3001;

// // Set up multer for file uploads
// const upload = multer({ dest: "temp-uploads/" }); // Temporary storage

// app.post("/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   const uploadedFilePath = path.join(__dirname, req.file.path);

//   try {
//     const result = processFile(uploadedFilePath);
//     res.json(result);
//   } catch (error) {
//     res.status(500).send(error.message);
//   } finally {
//     // Clean up temporary file
//     fs.unlink(uploadedFilePath, (err) => {
//       if (err) console.error("Error deleting file:", err);
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import cors from 'cors';
// import { processFile } from './fileProcessor.js';

// const app = express();
// const port = 3001;

// // Enable CORS
// app.use(cors());

// // Set up multer for file uploads
// const upload = multer({ dest: 'temp-uploads/' }); // Temporary storage

// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const uploadedFilePath = path.join(__dirname, req.file.path);

//   try {
//     const result = processFile(uploadedFilePath);
//     res.json(result);
//   } catch (error) {
//     res.status(500).send(error.message);
//   } finally {
//     // Clean up temporary file
//     fs.unlink(uploadedFilePath, (err) => {
//       if (err) console.error('Error deleting file:', err);
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import cors from "cors";
import { processFile } from "./fileProcessor.js";

const app = express();
const port = 3001;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enable CORS
app.use(
  cors({
    origin: [`${import.meta.env.FRONTEND_URL}`],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// /{
//   origin: ["https://medispanproject-qlpf.vercel.app"],
//   methods: ["POST", "GET"],
//   credentials: true,
// }

// Set up multer for file uploads
const upload = multer({ dest: "temp-uploads/" }); // Temporary storage

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const uploadedFilePath = join(__dirname, req.file.path);

  try {
    const result = processFile(uploadedFilePath);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    // Clean up temporary file
    fs.unlink(uploadedFilePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  }
});

app.get("/", (req, res) => {
  res.send("Project is running");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
