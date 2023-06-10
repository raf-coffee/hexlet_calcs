const toBinary = (string) => {
  const charCodes = new Uint8Array(Uint16Array.from(
    { length: string.length },
    (element, index) => string.charCodeAt(index),
  )
    .buffer);
  const result = { str: '' };
  charCodes.forEach((char) => {
    (result.str += String.fromCharCode(char));
  });
  return result.str;
};

const fromBinary = (binary) => {
  const charCodes = new Uint16Array(Uint8Array.from(
    { length: binary.length },
    (element, index) => binary.charCodeAt(index),
  )
    .buffer);
  const result = { str: '' };
  charCodes.forEach((char) => {
    result.str += String.fromCharCode(char);
  });
  return result.str;
};

export const base64 = (string, action) => {
  const actions = {
    b64ToUtf16: () => fromBinary(atob(string)),
    utf16ToB64: () => btoa(toBinary(string)),
  };
  return actions[action]();
};
