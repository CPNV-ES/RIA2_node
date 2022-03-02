import { GCPBucketManager } from "./../gcp/GCPBucketManager";
import { BucketManager } from "./../bucket/BucketManager.interface";

let bucketManager: BucketManager;

const domain = "actualit.info";
const bucketName = "test-bucket";
const bucketUrl = `gs://${bucketName}.${domain}`;

// eslint-disable-next-line @typescript-eslint/no-empty-function
beforeEach(() => {
  bucketManager = new GCPBucketManager();
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
afterEach(async () => {});

describe("CloudStorageBucketManager unit tests", () => {
  test("createObject_CreateNewBucket_Success", async () => {
    //given
    //when
    //then
  });

  test("CreateObject_CreateObjectWithExistingBucket_Success", async () => {
    //given
    //when
    //then
  });

  test("CreateObject_CreateObjectBucketNotExist_Success", async () => {
    //given
    //when
    //then
  });

  test("DownloadObject_NominalCase_Success", async () => {
    //given
    //when
    //then
  });

  test("IsObjectExists_NominalCase_Success", async () => {
    //given
    await bucketManager.createObject(bucketUrl);

    //when
    const exists = await bucketManager.objectExists(bucketUrl);

    //then
    expect(exists).toBe(true);
  });

  test("IsObjectExists_ObjectNotExistBucket_Success", async () => {
    //given
    const notExistingBucketName = "not-existing-bucket";
    const notExistingBucketUrl = `gs://${notExistingBucketName}.${domain}`;

    //when
    const exists = await bucketManager.objectExists(notExistingBucketUrl);

    //then
    expect(exists).toBe(false);
  });

  test("IsObjectExists_ObjectNotExistFile_Success", async () => {
    //given
    const notExistingFileName = "not-existing-file.jpg";
    const notExistingFileUrl = `${bucketUrl}/${notExistingFileName}`;

    if (!(await bucketManager.objectExists(bucketUrl))) {
      await bucketManager.createObject(bucketUrl);
    }

    //when
    const exists = await bucketManager.objectExists(notExistingFileUrl);

    //then
    expect(exists).toBe(false);
  });

  test("RemoveObject_EmptyBucket_Success", async () => {
    //given
    //when
    //then
  });

  test("RemoveObject_NotEmptyBucket_Success", async () => {
    //given
    //when
    //then
  });
});
