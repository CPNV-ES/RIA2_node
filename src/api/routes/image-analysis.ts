import express, { Request, Response } from "express";
import multer from "multer";

import { GCPBucketManager } from "../../gcp/GCPBucketManager";
import { GCPFaceDetectionManager } from "../../gcp/GCPFaceDetectionManager";

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
  const imageName = req.file.filename;
  const bucketUrl = `gs://${bucketName}`;
  const objectUrl = bucketUrl + "/" + imageName;

  await bucketManager.createObject(bucketUrl, req.file.path);

  const faceDetectionManager = new GCPFaceDetectionManager();

  const result = await faceDetectionManager.detectFaces(objectUrl);

  res.status(201).json(result);
});

export default router;
