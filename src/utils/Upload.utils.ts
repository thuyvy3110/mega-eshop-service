
import { uploadFileToS3, uploadImageToS3 } from './Storage.utils'

export async function upload (request: any, fieldName: string, fileKey: string) {
    if (!request.files[fieldName]) {
        throw new Error('file not found');
    }
    const file = request.files[fieldName];
    const name = file.name;

    console.log(file.tempFilePath);
    fileKey += name.substring(name.lastIndexOf('.'));

    try {
        let result: any = ''
        if (fieldName === 'image') {
            result = await uploadImageToS3(file.tempFilePath, fileKey);
        }
        else {
            result = await uploadFileToS3(file.tempFilePath, fileKey);
        }
        
        return result.Key;
    } catch (error) {
        console.log(error);
        throw error;
    }
}