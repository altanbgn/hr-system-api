import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import * as path from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage: any = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) {
    callback(null, path.join(__dirname, '../../public/images/'))
  },

  filename: function (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) {
    callback(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/))
  }
});

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    callback(null, true);
  } else {
    callback(null, false);
    const error = new Error('ExtensionError: Only .png, .jpg and .jpeg format allowed!');
    error.name = 'ExtensionError';
    return callback(error);
  }
}

export const multerConfig = {
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter: fileFilter
}