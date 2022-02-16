export interface BucketManager {
  createObject(objectUrl: string, filePath: string): void;

  objectExists(objectUrl: string): Promise<boolean>;

  removeObject(objectUrl: string): void;

  downloadObject(objectUrl: string, destinationUri: string): void;
}
