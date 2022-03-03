import { Storage } from "@google-cloud/storage";

import { BucketManager } from "./../bucket/BucketManager.interface";

export class GCPBucketManager implements BucketManager {
  storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  async createObject(objectUrl: string, filePath?: string): Promise<void> {
    // If the bucket didn't exist creates it
    if (!await this.objectExists(objectUrl))
    {
      const [bucket, apiResponse] = await this.storage.bucket(objectUrl.replace('gs://', '')).create();
      // If there is a file create it
      if (filePath) {
        bucket.upload(filePath);
      }
    }
    else
    {
      // If there is a file create it
      if (filePath) {
        const bucket = this.storage.bucket(objectUrl);
        bucket.upload(filePath);
      }
    }
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
