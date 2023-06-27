/*  length - длина пароля - натуральное число, ограничение в форме от 1 до 50;
ниже чекбоксы
    lowerCase       включить прописные буквы (a-z)
    upperCase       включить заглавные буквы (A-Z)
    numbers         включить цифры (0-9)
    symbols         включить спец. символы (!"#$%&'()*+,-./:;<=>?@[]^_{|}~`)
    noAmbigChars    исключить похожие символы (iIl1L| o0O '\-_":;.,`)
    noBrackets      исключить скобки (<>()[]{})
    noRepeat        исключить повторяющиеся символы

*/
const generatePass = (length, lowerCase, upperCase, numbers, symbols, noAmbigChars, noBrackets, noRepeat) => {
    if (!lowerCase && !upperCase && !numbers && !symbols) {
        return 'Пожалуйста, включите хотя бы один набор символов, из которых будет состоять пароль.';
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
    if (noAmbigChars) {
        symbolSet = symbolSet.replace(/[iIl1L| o0O '\-_":;.,`]/g, "");
    }
    if (noBrackets) {
       symbolSet = symbolSet.replace(/[<>()[\]{}]/g, "");
    }
    
    if (symbolSet.length < length && noRepeat) {
        return 'Недостаточно символов для создания пароля такой длины без повторяющихся символов';
    }
    for (let i = 0; i < length; i++) {
        let addingCharacter = symbolSet.charAt(Math.floor(Math.random() * symbolSet.length));
        if (!noRepeat || !password.includes(addingCharacter)) {
            password += addingCharacter;
        } else {
            i -= 1;
        }
    }
    return password;
}

export default generatePass;