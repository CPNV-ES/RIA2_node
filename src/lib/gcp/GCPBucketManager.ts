import { Storage } from "@google-cloud/storage";

import { BucketManager } from "../interfaces/BucketManager.interface";

export class GCPBucketManager implements BucketManager {
  storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  async createObject(objectUrl: string, filePath?: string): Promise<void> {
    //TODO Q1 - line 15 - Good idea to code everything in one line ?
    // If the bucket didn't exist creates it
    if (!(await this.objectExists(this.removeFileNameFromUrl(objectUrl)))) {
      const [bucket, apiResponse] = await this.storage.createBucket(
        this.getBucketNameFromUrl(objectUrl),
      );

      //TODO Q2 - What's happend if bucket wasn't created ?
      //TODO Q3 - Recommendation (note) for upload method have been followed ?
      // If there is a file create it
      if (filePath) {
        await bucket.upload(filePath || "");
      }
    }
    // Else if there is a file create it
    else if (filePath) {
      const bucket = this.storage.bucket(this.getBucketNameFromUrl(objectUrl));
      await bucket.upload(filePath || "");
    }

    //TODO Q4 - How to evaluate if the function run correctly ?
  }

  async objectExists(objectUrl: string): Promise<boolean> {
    const fileName = this.getImgName(objectUrl);
    const bucket = this.storage.bucket(this.getBucketNameFromUrl(objectUrl));

    const [bucketExists] = await bucket.exists();

    if (fileName) {
      const file = bucket.file(fileName);
      const [fileExists] = await file.exists();

      return fileExists;
    }

    return bucketExists;
  }

  async removeObject(objectUrl: string): Promise<void> {
    if (await this.objectExists(objectUrl)) {
      const bucket = this.storage.bucket(this.getBucketNameFromUrl(objectUrl));

      await bucket.deleteFiles();

      await bucket.delete();
    }
  }

  async downloadObject(
    objectUrl: string,
    destinationUri: string,
  ): Promise<void> {
    const fileName = this.getImgName(objectUrl);
    const bucket = this.storage.bucket(this.getBucketNameFromUrl(objectUrl));
    const file = bucket.file(fileName);

    await file.download({
      destination: destinationUri,
    });
  }

  getImgName(url?: string): string {
    if (url) return url.replace(/((?!\/\w*\.\w*$).)*/, "").replace(/\//, "");
    return "";
  }

  removeFileNameFromUrl(url?: string): string {
    if (url) return url.replace(/\/\w*\.\w*$/, "");
    return "";
  }

  getBucketNameFromUrl(url?: string): string {
    if (url) return this.removeFileNameFromUrl(url.replace(/^gs:\/\//, ""));
    return "";
  }
}
