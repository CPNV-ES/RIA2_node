import { Storage } from "@google-cloud/storage";

import { BucketManager } from "../interfaces/BucketManager.interface";

export class GCPBucketManager implements BucketManager {
  storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  async createObject(objectUrl: string, filePath?: string): Promise<void> {
    const fileName = this.getImgName(objectUrl);

    // If the bucket didn't exist creates it
    if (!await this.objectExists(this.removeFileNameFromUrl(objectUrl)))
    {
      const [bucket, apiResponse] = await this.storage.createBucket(this.getBucketNameFromUrl(objectUrl));
      // If there is a file create it
      if (fileName) {
        await bucket.upload(filePath || '');
      }
    }
    else
    {
      // If there is a file create it
      if (fileName) {
        const bucket = this.storage.bucket(this.getBucketNameFromUrl(objectUrl));
        await bucket.upload(filePath || '');
      }
    }
  }

  async objectExists(objectUrl: string): Promise<boolean> {
    const fileName = this.getImgName(objectUrl);
    const bucket = this.storage.bucket(this.getBucketNameFromUrl(objectUrl));

    const [bucketExists] = await bucket.exists();

    if (fileName)
    {
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

  async downloadObject(objectUrl: string, destinationUri: string): Promise<void> {
    const fileName = this.getImgName(objectUrl);
    const bucket = this.storage.bucket(this.getBucketNameFromUrl(objectUrl));
    const file = bucket.file(fileName);

    await file.download({
      destination: destinationUri,
    });
  }

  getImgName(url?: string) : string{
    if (url)
      return url.replace(/((?!\/\w*\.\w*$).)*/, '').replace(/\//, '');
    return "";
  }

  removeFileNameFromUrl(url?: string) : string{
    if (url)
      return url.replace(/\/\w*\.\w*$/, '');
    return "";
  }

  getBucketNameFromUrl(url?: string) : string{
    if (url)
      return this.removeFileNameFromUrl(url.replace(/^gs:\/\//, ''));
    return "";
  }
}
