import { Bool } from 'aws-sdk/clients/clouddirectory';
import jsonwebtoken from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import superagent from 'superagent';

const { POOL_ID_ADMIN, POOL_ID_SALES_PERSON, POOL_ID_TABLET, POOL_ID_DISPLAY } = require('../lib/constant');

const getJwkKey: any = (poolname: any) => {
	switch (poolname) {
		case POOL_ID_ADMIN:
			return superagent.get(`https://cognito-idp.ap-northeast-1.amazonaws.com/${process.env.POOL_ID_ADMIN}/.well-known/jwks.json`);
		case POOL_ID_SALES_PERSON:
			return superagent.get(`https://cognito-idp.ap-northeast-1.amazonaws.com/${process.env.POOL_ID_SALES_PERSON}/.well-known/jwks.json`);
		case POOL_ID_TABLET:
			return superagent.get(`https://cognito-idp.ap-northeast-1.amazonaws.com/${process.env.POOL_ID_TABLET}/.well-known/jwks.json`);
		case POOL_ID_DISPLAY:
			return superagent.get(`https://cognito-idp.ap-northeast-1.amazonaws.com/${process.env.POOL_ID_DISPLAY}/.well-known/jwks.json`);
	}
};

const decodeTokenHeader: any = (token: string) => {
	const [headerEncoded] = token.split('.');
	const buff = Buffer.from(headerEncoded, 'base64');
	const text = buff.toString('ascii');
	return JSON.parse(text);
};

const getJsonWebKeyWithKID: any = (kid: string, token: string, poolname: string) => {
	return getJwkKey(poolname)
		.then((resp: any) => {
			const { keys } = JSON.parse(resp.text);

			for (const jwk of keys) {
				if (jwk.kid === kid) {
					return verifyJsonWebTokenSignature(token, jwk);
				}
			}
		})
		.catch((error: any) => {
			console.log(error);
		});
};

const verifyJsonWebTokenSignature = (token: string, jsonWebKey: jwkToPem.JWK) => {
	const pem = jwkToPem(jsonWebKey);
	let decodedToken: string | object;
	try {
		decodedToken = jsonwebtoken.verify(token, pem, { algorithms: ['RS256'] });
		console.log(decodedToken);
		return decodedToken;
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const validate = async (token: string, poolname: string): Promise<boolean> => {
	const header = decodeTokenHeader(token);
	const data = await getJsonWebKeyWithKID(header.kid, token, poolname);
	if (data) {
		return true;
	}
	return false;
};


