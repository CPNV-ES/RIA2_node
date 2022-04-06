export interface FaceDetectionManager {
  detectFaces(imageUrl: string): Promise<any>;
}
