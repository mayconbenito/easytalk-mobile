function isStringEmpty(str) {
  const isEmpty = str.length > 0 && /[^\s]/.test(str);

  return !isEmpty;
}

export default isStringEmpty;
