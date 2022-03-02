import { GCPBucketManager } from "./../gcp/GCPBucketManager";
import { BucketManager } from "./../bucket/BucketManager.interface";

let bucketManager: BucketManager;

const domain = "actualit.info";
const bucketName = "test-bucket";
const bucketUrl = `gs://${bucketName}.${domain}`;
const imageName = "";
const pathToTestFolder = "";

// eslint-disable-next-line @typescript-eslint/no-empty-function
beforeEach(() => {
  bucketManager = new GCPBucketManager();
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
afterEach(async () => {});

describe("CloudStorageBucketManager unit tests", () => {
  test("createObject_CreateNewBucket_Success", async ()=>{
    //given
    expect(await bucketManager.objectExists(bucketUrl)).toBeFalsy();

    //when
    bucketManager.createObject(bucketUrl);

    //then
    expect(await bucketManager.objectExists(bucketUrl)).toBeTruthy();
  });

  test("createObject_createObjectWithExistingBucket_Success", async () => {
    //given
    const fileName = imageName;
    const objectUrl = bucketUrl + "/" + imageName;
    await bucketManager.createObject(bucketUrl);

    expect(await bucketManager.objectExists(bucketUrl)).toBeTruthy();
    expect(await bucketManager.objectExists(objectUrl)).toBeFalsy();

    //when
    await bucketManager.createObject(objectUrl, pathToTestFolder + "//" + fileName);

    //then
    expect(await bucketManager.objectExists(objectUrl)).toBeTruthy();
  });

  test("createObject_createObjectBucketNotExist_Success", async () => {
    //given
    const fileName = imageName;
    const objectUrl = bucketUrl + "/" + imageName;
    expect(await bucketManager.objectExists(bucketUrl)).toBeFalsy();
    expect(await bucketManager.objectExists(objectUrl)).toBeFalsy();

    //when
    await bucketManager.createObject(objectUrl, pathToTestFolder + "//" + fileName);

    //then
    expect(await bucketManager.objectExists(objectUrl)).toBeTruthy();
  });

  test("DownloadObject_NominalCase_Success", async () => {
    //given
    //when
    //then
  });

  test("IsobjectExists_NominalCase_Success", async () => {
    //given
    await bucketManager.createObject(bucketUrl);

    //when
    const exists = await bucketManager.objectExists(bucketUrl);

    //then
    expect(exists).toBe(true);
  });

  test("IsobjectExists_ObjectNotExistBucket_Success", async () => {
    //given
    const notExistingBucketName = "not-existing-bucket";
    const notExistingBucketUrl = `gs://${notExistingBucketName}.${domain}`;

    //when
    const exists = await bucketManager.objectExists(notExistingBucketUrl);

    //then
    expect(exists).toBe(false);
  });

  test("IsobjectExists_ObjectNotExistFile_Success", async () => {
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
