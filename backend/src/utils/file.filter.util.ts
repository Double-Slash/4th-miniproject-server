import { extname } from 'path';

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 3000).toString(16))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};

export const returnUploadFileNameList = (files) => {
  const uploadFileList = [];
  if (files) {
    files.forEach((file) => {
      uploadFileList.push(file.originalname);
    });
  }
  return uploadFileList;
};
