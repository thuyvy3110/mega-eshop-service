import AWS from 'aws-sdk';
import fs from 'fs';
import _ from 'lodash';
import { projectServices } from '../lib/constant';
import * as dotenv from 'dotenv';

dotenv.config();
// Default options for S3 storage
export function defaultStorageOptions (): any {
	const options = {
		accessKeyId: process.env.S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.S3_ACCESS_SECRET,
	};
	return options;
}

// Function to configure storage
export function configDefaultStorage (): void {
	return AWS.config.update(defaultStorageOptions());
}

// Function to initialize application storage
export function initStorage (options?: any): AWS.S3 {
	let storage: AWS.S3;
	if (_.isEmpty(options)) {
		storage = new AWS.S3(defaultStorageOptions());
		return storage;
	}
	storage = new AWS.S3(options);
	return storage;
}

// Function to create bucket
export function createBucket (s3: AWS.S3, bucketName: string, options: any): null | Error {
	try {
		s3.createBucket({ Bucket: bucketName, CreateBucketConfiguration: options });
		return null;
	} catch (error) {
		if (error.statusCode === 409) {
			console.log(`Bucket ${bucketName} has already existed.`);
			return null;
		}
		console.log(`${bucketName} failed to create.`);
		return error;
	}
}

// Function that check if bucket exists
export async function checkBucketExists (s3: AWS.S3, bucketName: string): Promise<Error | boolean> {
	try {
		await s3.headBucket({ Bucket: bucketName }).promise();
		return true;
	} catch (error) {
		if (error.statusCode === 404) {
			return false;
		}
		return error;
	}
}

// Function to upload file to S3 bucket
const bucketName = process.env.S3_BUCKET_NAME || '3dphantom';
export async function uploadFileToS3(
	filePath: string,
	key: string,
): Promise<any> {
	if (key.indexOf('.mp4') != -1) {
		return uploadVideoToS3(filePath, key);
	}
	return uploadImageToS3(filePath, key);
}

export async function uploadVideoToS3 (
	filePath: string,
	key: string,
): Promise<any> {
	return uploadToS3(filePath, 'video', key, initStorage())
}

export async function uploadImageToS3 (
	filePath: string,
	key: string,
): Promise<any> {
	return uploadToS3(filePath, 'images', key, initStorage())
}

export async function uploadToS3 (
	filePath: string,
	type: string,
	key: string,
	s3: AWS.S3
): Promise<any> {
	const readStream = fs.createReadStream(filePath);
	const params = {
		Bucket: bucketName,
		Body: readStream,
		Key: `demo/${type}/${key}`
	};
	return new Promise((resolve, reject) => {
		s3.upload(params, (error: any, data: any) => {
			readStream.destroy();
			if (error) {
				return reject(error);
			}
			console.log('uploaded', data);
			return resolve(data);
		});
	});
}

// Function getVideoFromS3ById (export scenario by id)
export async function getFileFromS3 (key: string) {
	// TODO move "demo/" into environment variable
	if (!key.startsWith("demo/")) {
		return key;
	}
	const params = {
		Bucket: bucketName,
		Key: key,
		Expires: 604800
	};

	const s3 = initStorage();

	try {
		const url = await s3.getSignedUrlPromise('getObject', params);
		return url;
	} catch (error) {
		return error;
	}
}

