import express, { Request, Response } from "express";
import multer from "multer";

import { GCPBucketManager } from "src/lib/gcp/GCPBucketManager";
import { GCPFaceDetectionManager } from "src/lib/gcp/GCPFaceDetectionManager";

const router = express.Router();
const upload = multer({ dest: process.env.FILE_UPLOAD_PATH });

/**
 * @swagger
 * /image-analysis:
 *   post:
 *     tags:
 *       - image-analysis
 *     description: Upload a file to the bucket
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: img
 *         description: The file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       201:
 *         description: The file was uploaded.
 *       400:
 *         description: The file was not uploaded.
 */
router.post("/", upload.single("img"), async (req: Request, res: Response) => {
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
