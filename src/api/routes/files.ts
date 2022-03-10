import express, { Request, Response } from "express";
import multer from "multer";

import { GCPBucketManager } from './../../gcp/GCPBucketManager';

const router = express.Router();
const upload = multer({ dest: process.env.FILE_UPLOAD_PATH });

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      error: "No file uploaded",
    });
  }

  const bucketManager = new GCPBucketManager();
  const bucketName = req.file.filename;

  await bucketManager.createObject(bucketName);
  await bucketManager.createObject(bucketName, req.file.path);

  res.status(201).json({
    filename: req.file.filename,
  });
});

export default router;
