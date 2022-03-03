export interface BucketManager {
  createObject(objectUrl: string, filePath?: string): Promise<void>;

  objectExists(objectUrl: string): Promise<boolean>;

  removeObject(objectUrl: string): Promise<void>;

  downloadObject(objectUrl: string, destinationUri: string): void;
}
