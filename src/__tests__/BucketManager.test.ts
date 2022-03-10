import { GCPBucketManager } from "./../gcp/GCPBucketManager";
import { BucketManager } from "../interfaces/BucketManager.interface";
import fs from "fs/promises";
import { TIMEOUT } from "dns";

let bucketManager: BucketManager;

const domain = "actualit.info";
const bucketName = "test-bucket";
const bucketUrl = `gs://${bucketName}.${domain}`;
const imageName = "test.jpg";
const pathToTestFolder = "images";
const prefixObjectDownloaded = "downloaded";

beforeAll(async () => {
  bucketManager = new GCPBucketManager();

  if (await bucketManager.objectExists(bucketUrl)) {
    await bucketManager.removeObject(bucketUrl);
  }
});

beforeEach(() => {
  bucketManager = new GCPBucketManager();
});

afterEach(async () => {
  if (await bucketManager.objectExists(bucketUrl)) {
    await bucketManager.removeObject(bucketUrl);
  }
});

describe("CloudStorageBucketManager unit tests", () => {
  test("createObject_CreateNewBucket_Success", async ()=>{
    //given
    expect(await bucketManager.objectExists(bucketUrl)).toBeFalsy();

    //when
    await bucketManager.createObject(bucketUrl);

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
    const objectUrl = bucketUrl + "//" + imageName;
    const destinationFullPath = pathToTestFolder + "//" + prefixObjectDownloaded + imageName;
    await bucketManager.createObject( objectUrl, pathToTestFolder + "//" + imageName);

    const bucketExists = await bucketManager.objectExists(bucketUrl);
    expect(bucketExists).toBe(true);

    //when
    await bucketManager.downloadObject(objectUrl, destinationFullPath);

    //then
    const fileExists = fs.stat(destinationFullPath);
    expect(fileExists).toBeTruthy();
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
    await bucketManager.createObject(bucketUrl);

    const exists = await bucketManager.objectExists(bucketUrl);
    expect(exists).toBe(true);

    //when
    await bucketManager.removeObject(bucketUrl);

    //then
    const notExists = await bucketManager.objectExists(bucketUrl);
    expect(notExists).toBe(false);
  });

  test("RemoveObject_NotEmptyBucket_Success", async () => {
    //given
    const fileName = imageName;
    const objectUrl = bucketUrl + "/" + imageName;
    await bucketManager.createObject(bucketUrl);
    await bucketManager.createObject(
      objectUrl,
      pathToTestFolder + "//" + fileName,
    );

    const bucketExists = await bucketManager.objectExists(bucketUrl);
    expect(bucketExists).toBe(true);

    const objectExists = await bucketManager.objectExists(objectUrl);
    expect(objectExists).toBe(true);

    //when
    await bucketManager.removeObject(bucketUrl);

    //then
    const bucketNotExists = await bucketManager.objectExists(bucketUrl);
    expect(bucketNotExists).toBe(false);
  }, 10000000);
});
