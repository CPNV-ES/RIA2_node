import { BucketManager } from "./../bucket/BucketManager.interface";

export class GCPBucketManager implements BucketManager {
  async createObject(objectUrl: string, filePath?: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async objectExists(objectUrl: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  removeObject(objectUrl: string): void {
    throw new Error("Method not implemented.");
  }

  downloadObject(objectUrl: string, destinationUri: string): void {
    throw new Error("Method not implemented.");
  }
}
