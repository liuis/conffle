const crypto = require('crypto');
const rlp = require('rlp');
const keccak = require('keccak');
const scryptJs = require('scrypt.js');
const secp256k1 = require('secp256k1');

// ----------------------------------------------------------------------------
/**
 * @param buffer {Buffer}
 * @return {Buffer}
 */
function sha3(buffer) {
  return keccak('keccak256').update(buffer).digest();
}

/**
 * @param array {Buffer[]}
 * @return {Buffer}
 */
function rlpEncode(array) {
  return rlp.encode(array);
}

// ----------------------------------------------------------------------------
/**
 * gen a random buffer with `size` bytes.
 *
 * > Note: call `crypto.randomBytes`
 *
 * @param size {number}
 * @return {Buffer}
 */
function randomBuffer(size) {
  return crypto.randomBytes(size);
}

/**
 * @param entropy {Buffer}
 * @return {Buffer}
 */
function randomPrivateKey(entropy = randomBuffer(32)) {
  if (!(Buffer.isBuffer(entropy) && entropy.length === 32)) {
    throw new Error(`entropy must be 32 length Buffer, got "${typeof entropy}"`);
  }

  const inner = sha3(Buffer.concat([randomBuffer(32), entropy]));
  const middle = Buffer.concat([randomBuffer(32), inner, randomBuffer(32)]);
  return sha3(middle);
}

/**
 * @param publicKey {Buffer}
 * @return {Buffer}
 */
function publicKeyToAddress(publicKey) {
  return sha3(publicKey).slice(-20);
}

/**
 * @param privateKey {Buffer}
 * @return {Buffer}
 */
function privateKeyToAddress(privateKey) {
  const publicKey = secp256k1.publicKeyCreate(privateKey, false).slice(1);
  return publicKeyToAddress(publicKey);
}

/**
 * @param hash {Buffer}
 * @param privateKey {Buffer}
 * @return {object} ECDSA signature object.
 * - r {Buffer}
 * - s {Buffer}
 * - v {number}
 */
function ecdsaSign(hash, privateKey) {
  const sig = secp256k1.sign(hash, privateKey);
  return {
    r: sig.signature.slice(0, 32),
    s: sig.signature.slice(32, 64),
    v: sig.recovery,
  };
}

/**
 * @param hash {Buffer}
 * @param r {Buffer}
 * @param s {Buffer}
 * @param v {number}
 * @return {Buffer} publicKey
 */
function ecdsaRecover(hash, { r, s, v }) {
  const senderPublic = secp256k1.recover(hash, Buffer.concat([r, s]), v);
  return secp256k1.publicKeyConvert(senderPublic, false).slice(1);
}

// ----------------------------------------------------------------------------
/**
 * @param key {Buffer}
 * @param password {Buffer}
 * @return {object} Encrypt info
 * - salt {Buffer}
 * - iv {Buffer}
 * - cipher {Buffer}
 * - mac {Buffer}
 */
function encrypt(key, password) {
  const salt = randomBuffer(32);
  const iv = randomBuffer(16);
  const derived = scryptJs(password, salt, 8192, 8, 1, 32);
  const cipher = crypto.createCipheriv('aes-128-ctr', derived.slice(0, 16), iv).update(key);
  const mac = sha3(Buffer.concat([derived.slice(16, 32), cipher]));
  return { salt, iv, cipher, mac };
}

/**
 * @param options
 * @param options.salt {Buffer}
 * @param options.iv {Buffer}
 * @param options.cipher {Buffer}
 * @param options.mac {Buffer}
 * @param password {Buffer}
 * @return {Buffer}
 */
function decrypt({ salt, iv, cipher, mac }, password) {
  const derived = scryptJs(password, salt, 8192, 8, 1, 32);
  if (!sha3(Buffer.concat([derived.slice(16, 32), cipher])).equals(mac)) {
    throw new Error('Key derivation failed, possibly wrong password!');
  }
  return crypto.createDecipheriv('aes-128-ctr', derived.slice(0, 16), iv).update(cipher);
}

// ----------------------------------------------------------------------------
module.exports = {
  sha3,
  rlpEncode,

  randomBuffer,
  randomPrivateKey,
  publicKeyToAddress,
  privateKeyToAddress,
  ecdsaSign,
  ecdsaRecover,

  encrypt,
  decrypt,
};
