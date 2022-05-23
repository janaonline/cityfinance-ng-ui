// import api, { axiosInstanceWithoutDefaultConfig } from "./config/api";
let axios: any;
let BASE_URL: any;
let axiosInstanceWithoutDefaultConfig: any;
let api: any;
async function getFilesS3UrlAndUploadToS3(files: any) {
  try {
    const filesToUpload = composeFileListArrToFilesArr(files);
    const s3UrlResponse = await getS3UrlForFiles(filesToUpload);
    s3UrlResponse?.success &&
      (await uploadFilesToS3(s3UrlResponse?.data?.files, filesToUpload));
    return s3UrlResponse?.data?.files;
  } catch (e) {
    throw e;
  }
}

const composeFileListArrToFilesArr = (fileListArr: any) =>
  fileListArr.map((file: any) => file?.[0]);

async function getS3UrlForFiles(files: any) {
  try {
    const requestBody = {
      files: files.map((file: any) => ({
        mime_type: file?.type,
        file_name: file?.name,
      })),
    };
    let { data: response } = await api.post(`getS3Url`, requestBody);
    return response;
  } catch (e) {
    throw new Error("Unable To Upload");
  }
}

const uploadFilesToS3 = (filesS3UrlObjList: any, filesToUpload: any) =>
  Promise.all(
    filesS3UrlObjList?.map?.((fileS3Url: any) =>
      getFileAndUploadToGivenUrl(
        fileS3Url?.url,
        fileS3Url?.file_name,
        fileS3Url?.mime_type,
        filesToUpload
      )
    )
  );

const getFileAndUploadToGivenUrl = async (
  url: any,
  fileName: any,
  fileMimeType: any,
  files: any
) => {
  const fileToUpload = getFileWithGivenNameAndMimeType(
    files,
    fileName,
    fileMimeType
  );
  const headers = new Headers({
    "Content-Type": fileToUpload?.type,
  });
  return axiosInstanceWithoutDefaultConfig.put(url, fileToUpload, { headers });
};

const getFileWithGivenNameAndMimeType = (
  files: any,
  name: any,
  mime_type: any
) =>
  files?.find?.((file: any) => file?.name === name && file?.type === mime_type);

export { getFilesS3UrlAndUploadToS3 };
