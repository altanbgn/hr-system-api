import fs from 'fs';
import path from 'path';

export default class FileServices {
  /**
   * Upload multiple files
   * @param files
   * @returns Uploaded files in array of objects with filename, size and path
   */
  public static async uploadMultiple(files: Express.Multer.File[] | any) {
    if (!files)
      throw new Error('No files!');

    return files.map((file: Express.Multer.File) => {
      return {
        filename: file.filename,
        size: file.size,
        path: '/images/' + file.filename
      }
    })
  }

  /**
   * Upload single file
   * @param file
   * @returns Uploaded file in object with filename, size and path
   */
  public static async uploadSingle(file: Express.Multer.File | any) {
    if (!file)
      throw new Error('No file!');

    return {
      filename: file.filename,
      size: file.size,
      path: '/images/' + file.filename
    }
  }

  /**
   * Delete one file with matching filename
   * @param filename
   * @returns nothing
   */
  public static async deleteOne(filename: string) {
    if (!filename)
      throw new Error('Filename not specified!');

    fs.unlink(path.join(__dirname, `../../public/images/${filename}`), () => {})

    return;
  }
}
