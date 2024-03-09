const crypto = require('crypto');
/*
 * KEY Must be 256 bits (32 characters)
 * get initial key: crypto.randomBytes(16).toString('hex'); // 1 byte results in 2 hex string
 */
const ALGORITHM = 'aes-256-cbc';
const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY; // || crypto.randomBytes(16).toString('hex');
const IV_LENGTH = 16; // For AES, this is always 16

export const encrypt = (str) => {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(CRYPTO_KEY), iv);
    const encrypted = cipher.update(str);
    return iv.toString('hex').concat(
      ':',
      Buffer.concat([encrypted, cipher.final()]).toString('hex'),
    );
  } catch (error) {
    console.error(error);
    return str;
  }
};

export const encryptAll = (obj, keyArr) => {
  const result = { ...obj };
  const keys = keyArr || Object.keys(obj);
  keys.forEach((key) => {
    if (key && typeof obj[key] === 'string') {
      result[key] = encrypt(obj[key]);
    }
  });
  return result;
};

export const decrypt = (str) => {
  try {
    const textParts = str.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedTextBuffer = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(CRYPTO_KEY), iv);
    const decrypted = decipher.update(encryptedTextBuffer);
    return Buffer.concat([decrypted, decipher.final()]).toString();
  } catch (error) {
    console.error(error);
    return str;
  }
};

export const decryptAll = (obj, keyArr) => {
  const result = { ...obj };
  const keys = keyArr || Object.keys(obj);
  keys.forEach((key) => {
    if (key && typeof obj[key] === 'string') {
      result[key] = decrypt(obj[key]);
    }
  });
  return result;
};
