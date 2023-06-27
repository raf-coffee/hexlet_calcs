/*  passLength - длина пароля - натуральное число, ограничение в форме от 4 до 50;
ниже чекбоксы
    lowerCase       включить прописные буквы (a-z)
    upperCase       включить заглавные буквы (A-Z)
    numbers         включить цифры (0-9)
    symbols         включить спец. символы (!"#$%&'()*+,-./:;<=>?@[]^_{|}~`)
    excludeAmb      исключить похожие символы (iIl1L| o0O '\-_":;.,`)
    excludeBrackets исключить скобки (<>()[]{})
    noRepeat        исключить повторяющиеся символы
*/

const passwordEntropy = (setLength, passwordLength) => Math.log2(setLength ** passwordLength);

const passwordStrength = (entropy) => {
  if (entropy < 25) {
    return "Очень слабый";
  }
  if (entropy < 50) {
    return "Слабый";
  }
  if (entropy < 70) {
    return "Хороший";
  }
  if (entropy < 100) {
    return "Сильный";
  }
  return "Очень сильный";
};

export const generatePass = ({
  passLength,
  lowerCase,
  upperCase,
  numbers,
  symbols,
  excludeAmb,
  excludeBrackets,
  noRepeat,
}) => {
  if (!lowerCase && !upperCase && !numbers && !symbols) {
    return "Пожалуйста, включите хотя бы один набор символов, из которых будет состоять пароль.";
  }
  let symbolSet = "";
  let password = "";

  if (lowerCase) {
    symbolSet += "abcdefghijklmnopqrstuvwxyz";
  }
  if (upperCase) {
    symbolSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (numbers) {
    symbolSet += "0123456789";
  }
  if (symbols) {
    symbolSet += "!\"#$%&'()*+,-./:;<=>?@[]^_{|}~`";
  }
  if (excludeAmb) {
    symbolSet = symbolSet.replace(/[iIl1L|o0O'\-_":;.,`]/g, "");
  }
  if (excludeBrackets) {
    symbolSet = symbolSet.replace(/[<>()[\]{}]/g, "");
  }

  if (symbolSet.length < passLength && noRepeat) {
    return "Недостаточно символов для создания пароля такой длины без повторяющихся символов";
  }

  if (window.crypto.getRandomValues) {
    for (let i = 0; i < passLength; i += 1) {
      const arr = Array.from(crypto.getRandomValues(new Uint32Array(passLength)));
      const addingCharacter = symbolSet[arr[i] % symbolSet.length];
      if (!noRepeat) {
        password += addingCharacter;
      } else if (password.includes(addingCharacter)) {
        i -= 1;
      } else {
        password += addingCharacter;
      }
    }
  } else {
    for (let i = 0; i < passLength; i += 1) {
      const addingCharacter = symbolSet.charAt(Math.floor(Math.random() * symbolSet.length));
      if (!noRepeat || !password.includes(addingCharacter)) {
        password += addingCharacter;
      } else {
        i -= 1;
      }
    }
  }
  const entropy = passwordEntropy(symbolSet.length, passLength);
  const strength = passwordStrength(entropy);

  return { password, passwordEntropy: entropy, passwordStrength: strength };
};
