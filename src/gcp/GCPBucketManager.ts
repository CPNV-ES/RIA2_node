import { Storage } from "@google-cloud/storage";

import { BucketManager } from "./../bucket/BucketManager.interface";

export class GCPBucketManager implements BucketManager {
  storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  async createObject(objectUrl: string, filePath?: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async objectExists(objectUrl: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  removeObject(objectUrl: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  downloadObject(objectUrl: string, destinationUri: string): void {
    throw new Error("Method not implemented.");
  }
}
