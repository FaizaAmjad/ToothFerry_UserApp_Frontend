const assert = require("assert");
const crypto = require("crypto");

const algorithm = "aes256";
const inputEncoding = "utf8";
const outputEncoding = "hex";
const ivlength = 16; // AES blocksize
const iv = crypto.randomBytes(ivlength);
const secret = "ciw7p02f70000ysjon7gztjn7c2x7GfJ";
const key = Buffer.from(secret, "latin1");

function encryptToken(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let ciphered = cipher.update(text, inputEncoding, outputEncoding);
  ciphered += cipher.final(outputEncoding);
  const cipherText = iv.toString(outputEncoding) + ":" + ciphered;
  return cipherText;
}

function decryptToken(cipherText) {
  const components = cipherText.split(":");
  const iv_from_cipherText = Buffer.from(components.shift(), outputEncoding);
  const decipher = crypto.createDecipheriv(algorithm, key, iv_from_cipherText);
  let deciphered = decipher.update(
    components.join(":"),
    outputEncoding,
    inputEncoding
  );
  deciphered += decipher.final(inputEncoding);
  return deciphered;
}

module.exports = {
  encryptToken,
  decryptToken,
};
