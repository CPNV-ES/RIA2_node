import { Storage } from "@google-cloud/storage";

import { BucketManager } from "./../bucket/BucketManager.interface";

export class GCPBucketManager implements BucketManager {
  storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  async createObject(objectUrl: string, filePath?: string): Promise<void> {
    const bucketName = objectUrl.split("//")[1];
    await this.storage.createBucket(bucketName);
  }

  async objectExists(objectUrl: string): Promise<boolean> {
    const bucketName = objectUrl.split("//")[1];
    const [exists] = await this.storage.bucket(bucketName).exists();

    return exists;
  }

  async removeObject(objectUrl: string): Promise<void> {
    if (await this.objectExists(objectUrl)) {
      const bucketName = objectUrl.split("//")[1];

      await this.storage.bucket(bucketName).delete();
    }
  }

  downloadObject(objectUrl: string, destinationUri: string): void {
    throw new Error("Method not implemented.");
  }
}
