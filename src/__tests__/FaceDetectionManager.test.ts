import { FaceDetectionManager } from "../interfaces/FaceDetectionManager.interface";
import { GCPBucketManager } from "../gcp/GCPBucketManager";
import { GCPFaceDetectionManager } from "../gcp/GCPFaceDetectionManager";
import { generateBucketName } from "./fixtures/generateBucketName";

let faceDetectionManager: FaceDetectionManager;
const bucketManager = new GCPBucketManager();

const domain = "actualit.info";
const bucketName = generateBucketName();
const imageName = "test_face.jpg";
const pathToTestFolder = "src/__tests__/files";
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
}, 10000000);

afterAll(async () => {
  if (await bucketManager.objectExists(imageUrl)) {
    await bucketManager.removeObject(imageUrl);
  }

  if (await bucketManager.objectExists(bucketUrl)) {
    await bucketManager.removeObject(bucketUrl);
  }
}, 10000000);

beforeEach(async () => {
  faceDetectionManager = new GCPFaceDetectionManager();
});

describe("FaceDetectionManager unit tests", () => {
  it("should return a response", async () => {
    const result = await faceDetectionManager.detectFaces(imageUrl);

    expect(result).toBeDefined();
  });
});
