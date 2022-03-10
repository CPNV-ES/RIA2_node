import { FaceDetectionManager } from "../interfaces/FaceDetectionManager.interface";
import { GCPBucketManager } from "../gcp/GCPBucketManager";
import { GCPFaceDetectionManager } from "../gcp/GCPFaceDetectionManager";

let faceDetectionManager: FaceDetectionManager;
const bucketManager = new GCPBucketManager();

const domain = "actualit.info";
const bucketName = "test-bucket";
const imageName = "test_face.jpg";
const pathToTestFolder = "./files";
const bucketUrl = `gs://${bucketName}.${domain}`;
const imageUrl = `${bucketUrl}//${imageName}`;
const imagePath = `${pathToTestFolder}//${imageName}`;

beforeAll(async () => {
  if (!(await bucketManager.objectExists(bucketUrl))) {
    await bucketManager.createObject(bucketUrl);
  }

  if (!(await bucketManager.objectExists(imageUrl))) {
    await bucketManager.createObject(imageUrl, imagePath);
  }
});

afterAll(async () => {
  if (await bucketManager.objectExists(imageUrl)) {
    await bucketManager.removeObject(imageUrl);
  }

  if (await bucketManager.objectExists(bucketUrl)) {
    await bucketManager.removeObject(bucketUrl);
  }
});

describe("FaceDetectionManager unit tests", () => {
  it("should return a response", async () => {
    faceDetectionManager = new GCPFaceDetectionManager();

    const result = await faceDetectionManager.detectFaces(imageUrl);

    expect(result).toBeDefined();
  });
});
