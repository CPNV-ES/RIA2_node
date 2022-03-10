import vision, { ImageAnnotatorClient } from "@google-cloud/vision";

import { FaceDetectionManager } from "src/interfaces/FaceDetectionManager.interface";

export class GCPFaceDetectionManager implements FaceDetectionManager {
  private client: ImageAnnotatorClient;

  constructor() {
    this.client = new vision.ImageAnnotatorClient();
  }

  async detectFaces(imageUrl: string) {
    const [results] = await this.client.faceDetection({
      image: { source: { imageUri: imageUrl } },
    });

    return results.faceAnnotations;
  }
}
