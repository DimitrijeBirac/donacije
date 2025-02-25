const isNumericInput = input => {
  return /^-?\d+(,\d+)?$/.test(input);
};

export default isNumericInput;
