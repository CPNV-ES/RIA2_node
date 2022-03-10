import vision, { ImageAnnotatorClient } from "@google-cloud/vision";

import { FaceDetectionManager } from "src/interfaces/FaceDetectionManager.interface";

export class GCPFaceDetectionManager implements FaceDetectionManager {
  private client: ImageAnnotatorClient;

  constructor() {
    this.client = new vision.ImageAnnotatorClient();
  }

  async detectFaces(imageUrl: string): Promise<any> {
    const results = await this.client.faceDetection({
      image: { source: { filename: imageUrl } },
    });
    const faces = results[0].faceAnnotations;
    const numFaces = faces?.length;
    console.log(`Found ${numFaces} face${numFaces === 1 ? "" : "s"}.`);
    return faces;
  }
}
