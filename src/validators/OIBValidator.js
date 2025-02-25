const isValidOIB = oib => {
  if (!/^\d{11}$/.test(oib)) {
    return false;
  }

  let checksum = 10;
  for (let i = 0; i < 10; i++) {
    checksum += parseInt(oib[i], 10);
    checksum %= 10;
    if (checksum === 0) {
      checksum = 10;
    }
    checksum *= 2;
    checksum %= 11;
  }

  let controlDigit = (11 - checksum) % 10;
  return controlDigit === parseInt(oib[10], 10);
};

export default isValidOIB;
