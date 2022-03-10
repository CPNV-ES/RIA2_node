import express, { Request, Response } from "express";
import multer from "multer";

import { GCPFaceDetectionManager } from "../../gcp/GCPFaceDetectionManager";

const router = express.Router();
const upload = multer({ dest: process.env.FILE_UPLOAD_PATH });

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      error: "No file uploaded",
    });
  }

  const faceDetectionManager = new GCPFaceDetectionManager();

  const result = await faceDetectionManager.detectFaces(
    "gs://ria2nodejs.actualit.info/alexandre.jpg",
  );

  res.status(201).json(result);
});

export default router;
