import express, { Request, Response } from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: process.env.FILE_UPLOAD_PATH });

router.post("/", upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      error: "No file uploaded",
    });
  }

  res.status(201).json({
    filename: req.file.filename,
  });
});

export default router;
