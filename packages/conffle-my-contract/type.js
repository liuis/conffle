const lodash = require('lodash');
const BigNumber = require('bignumber.js');

// ----------------------------------- Hex ------------------------------------
/**
 * @memberOf type
 * @param value {string|number|Buffer|Date|BigNumber|null} - The value to gen hex string.
 * @return {string} Hex string.
 */
function Hex(value) {
  if (value === null) {
    return '0x';
  }

  if (lodash.isNumber(value) || BigNumber.isBigNumber(value)) {
    return Hex(value.toString(16));
  }

  if (lodash.isString(value)) {
    if (Hex.isHex(value)) { // In order not to copy hex string in most case.
      return value;
    }

    let string = value.toLowerCase();
    string = string.startsWith('0x') ? string : `0x${string}`;
    string = string.length % 2 ? `0x0${string.substring(2)}` : string;
    if (!Hex.isHex(string)) {
      throw new Error(`"${value}" do not match hex string`);
    }
    return string;
  }

  if (Buffer.isBuffer(value)) {
    return `0x${value.toString('hex')}`;
  }

  if (lodash.isDate(value)) {
    return Hex(value.valueOf());
  }

  return Hex(`${value}`);
}

/**
 * Check if is hex string.
 *
 * > Hex: /^0x([0-9a-f][0-9a-f])*$/
 *
 * @param hex {string} - Value to be check.
 * @return {boolean}
 */
Hex.isHex = function (hex) {
  return /^0x([0-9a-f][0-9a-f])*$/.test(hex);
};

Hex.isHex20 = function (hex) {
  return /^0x[0-9a-f]{40}$/.test(hex);
};

Hex.isHex32 = function (hex) {
  return /^0x[0-9a-f]{64}$/.test(hex);
};

/**
 * @param hex {string} - The hex string.
 * @return {Buffer}
 */
Hex.toBuffer = function (hex) {
  if (!Hex.isHex(hex)) {
    throw new Error(`"${hex}" do not match hex string`);
  }

  const buffer = Buffer.from(hex.substring(2), 'hex');
  if (buffer.equals(Buffer.from('00', 'hex'))) {
    return Buffer.from('');
  }
  return buffer;
};

// ---------------------------------- UInt ------------------------------------
/**
 * @memberOf type
 * @param value
 * @return {string}
 */
function UInt(value) {
  return Hex(Number(value));
}

// ---------------------------------- Drip ------------------------------------
/**
 * @memberOf type
 * @param value {string|number|Buffer|BigNumber}
 * @return {string}
 */
function Drip(value) {
  const number = BigNumber(value);
  const string = Hex(number);
  if (string.length < 2) {
    throw new Error(`Drip can not be empty, got "${value}"`);
  }
  return string;
}

/**
 * Get Drip hex string by GDrip value.
 *
 * @param value {string|number|BigNumber} - Value in GDrip.
 * @return {string} Hex string in drip.
 */
Drip.fromGDrip = function (value) {
  const number = BigNumber(value).times(1e9);
  if (!number.isInteger()) {
    throw new Error(`can no parse ${value} GDrip to Drip in integer`);
  }
  return Drip(number);
};

/**
 * Get Drip hex string by CFX value.
 *
 * @param value {string|number|BigNumber} - Value in CFX.
 * @return {string} Hex string in drip.
 */
Drip.fromCFX = function (value) {
  const number = BigNumber(value).times(1e9).times(1e9); // XXX: 1e18 > Number.MAX_SAFE_INTEGER > 1e9
  if (!number.isInteger()) {
    throw new Error(`can no parse ${value} CFX to Drip in integer`);
  }
  return Drip(number);
};

/**
 * Get `GDrip` from Drip.
 *
 * @param value {string|number|BigNumber}
 * @return {BigNumber}
 */
Drip.toGDrip = function (value) {
  return BigNumber(value).div(1e9);
};

/**
 * Get `CFX` from Drip.
 *
 * @param value {string|number|BigNumber}
 * @return {BigNumber}
 */
Drip.toCFX = function (value) {
  return BigNumber(value).div(1e9).div(1e9); // XXX: 1e18 > Number.MAX_SAFE_INTEGER > 1e9
};

// ---------------------------------- PrivateKey ------------------------------
/**
 * @memberOf type
 * @param value {string|number|Buffer|BigNumber}
 * @return {string}
 */
function PrivateKey(value) {
  const hex = Hex(value);
  if (hex.length !== 2 + 64) { // XXX: check length for performance
    throw new Error(`${value} do not match PrivateKey`);
  }
  return hex;
}

// ----------------------------------- Address --------------------------------
/**
 * @memberOf type
 * @param value {string|number|Buffer|BigNumber}
 * @return {string}
 */
function Address(value) {
  const hex = Hex(value);
  if (hex.length !== 2 + 40) { // XXX: check length for performance
    throw new Error(`${value} do not match Address`);
  }
  return hex;
}

// ------------------------------- EpochNumber --------------------------------
/**
 * @memberOf type
 * @param value {string|number|Buffer|BigNumber}
 * @return {string}
 */
function EpochNumber(value) {
  if (lodash.isString(value)) {
    value = value.toLowerCase();
  }

  if ([EpochNumber.EARLIEST, EpochNumber.LATEST_STATE, EpochNumber.LATEST_MINED].includes(value)) {
    return value;
  }

  return Hex(Number(value));
}

/**
 * The earliest epochNumber where the genesis block in.
 *
 * @var {string}
 */
EpochNumber.EARLIEST = 'earliest';

/**
 * The latest epochNumber where the latest block with an executed state in.
 *
 * @var {string}
 */
EpochNumber.LATEST_STATE = 'latest_state';

/**
 * The latest epochNumber where the latest mined block in.
 *
 * @var {string}
 */
EpochNumber.LATEST_MINED = 'latest_mined';

// ----------------------------------- BlockHash ------------------------------
/**
 * @memberOf type
 * @param value {string|number|Buffer|BigNumber}
 * @return {string}
 */
function BlockHash(value) {
  const string = Hex(value);
  if (string.length !== 2 + 64) {
    throw new Error(`${value} do not match BlockHash`);
  }
  return string;
}

// ----------------------------------- TxHash ---------------------------------
/**
 * @memberOf type
 * @param value {string|number|Buffer|BigNumber}
 * @return {string}
 */
function TxHash(value) {
  const string = Hex(value);
  if (string.length !== 2 + 64) {
    throw new Error(`${value} do not match TxHash`);
  }
  return string;
}

module.exports = {
  Hex,
  UInt,
  Drip,
  PrivateKey,
  Address,
  EpochNumber,
  BlockHash,
  TxHash,
};
