function isStringEmpty(str) {
  return str.length > 0 && /[^\s]/.test(str);
}

export default isStringEmpty;
