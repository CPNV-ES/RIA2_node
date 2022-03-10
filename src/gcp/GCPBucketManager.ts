import { Storage } from "@google-cloud/storage";

import { BucketManager } from "../interfaces/BucketManager.interface";

export class GCPBucketManager implements BucketManager {
  storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  async createObject(objectUrl: string, filePath?: string): Promise<void> {
    let bucketName: string = objectUrl;
    const fileName = this.getImgName(objectUrl);
    if (fileName) {
      bucketName = objectUrl.replace(/\/\w*\.\w*$/, '');
    }

    // If the bucket didn't exist creates it
    if (!await this.objectExists(bucketName))
    {
      const [bucket, apiResponse] = await this.storage.createBucket(bucketName.replace(/^gs:\/\//, ''));
      // If there is a file create it
      if (fileName) {
        await bucket.upload(filePath || '');
      }
    }
    else
    {
      // If there is a file create it
      if (fileName) {
        const bucket = this.storage.bucket(bucketName.replace(/^gs:\/\//, ''));
        await bucket.upload(filePath || '');
      }
    }
  }

  async objectExists(objectUrl: string): Promise<boolean> {
    const fileName = this.getImgName(objectUrl);
    const bucketName = objectUrl.replace(/\/\w*\.\w*$/, '');
    const bucket = this.storage.bucket(bucketName.replace(/^gs:\/\//, ''));

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
      const bucketName = objectUrl.replace(/^gs:\/\//, '');
      const bucket = this.storage.bucket(bucketName);

      await bucket.deleteFiles();

      await bucket.delete();
    }
  }

  async downloadObject(objectUrl: string, destinationUri: string): Promise<void> {
    const bucketName = objectUrl.split("//")[1];
    const bucket = await this.storage.bucket(bucketName);
    const file = bucket.file(objectUrl);

    file.download({
      destination: destinationUri,
    });
  }

  getImgName(url?: string) : string{
    if (url)
      return url.replace(/((?!\/\w*\.\w*$).)*/, '').replace(/\//, '');
    return "";
  }
}
