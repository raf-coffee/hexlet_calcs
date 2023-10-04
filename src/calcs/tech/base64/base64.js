const toBinary = (string) => {
  const charCodes = new Uint8Array(
    Uint16Array.from({ length: string.length }, (element, index) => string.charCodeAt(index)).buffer
  );
  const result = { str: "" };
  charCodes.forEach((char) => {
    result.str += String.fromCharCode(char);
  });
  return result.str;
};

const fromBinary = (binary) => {
  const charCodes = new Uint16Array(
    Uint8Array.from({ length: binary.length }, (element, index) => binary.charCodeAt(index)).buffer
  );
  const result = { str: "" };
  charCodes.forEach((char) => {
    result.str += String.fromCharCode(char);
  });
  return result.str;
};

const fromUTF8 = (str) =>
  btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(`0x${p1}`)));

const toUTF8 = (str) =>
  decodeURIComponent(
    atob(str)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );

export const base64 = (string, action, scheme) => {
  const actions = {
    utf16: {
      encode: () => btoa(toBinary(string)),
      decode: () => fromBinary(atob(string)),
    },
    utf8: {
      encode: () => fromUTF8(string),
      decode: () => toUTF8(string),
    },
  };
  return actions[scheme][action]();
};
