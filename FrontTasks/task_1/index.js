import { encoded, translations } from "./data.js";

const exeptions = ["groupId", "service", "formatSize", "ca"];
const decoderFunc = (encoded, translations) => {
  const decoded = [];
  const uniqueID = new Set();

  encoded.forEach((encoded_obj) => {
    const decoded_obj = {};
    for (let key in encoded_obj) {
      if (exeptions.includes(key)) { // обрабатываем поля исключения
        decoded_obj[key] = encoded_obj[key];
        continue;
      }
      if (key.endsWith("Id")) { // обрабатываем поля с суффиксом id
        const translatedValue = translations[encoded_obj[key]]; // если encoded_obj[key] = null -> то нет соответствующего значения в translations
        decoded_obj[key] = translatedValue !== undefined ? translatedValue : encoded_obj[key]; // чтобы поле не равнялось undefined
        if (!isNaN(encoded_obj[key])) uniqueID.add(Number(encoded_obj[key]));
      }
    }
    decoded.push(decoded_obj);
  });
  console.log(decoded, uniqueID);
};
decoderFunc(encoded, translations);
// Необходимо написать функцию расшифровки полей с суффиксом id из переменной _encoded_, используя словарь с расшифровками _translations_.
// При этом структура данных должна сохраниться в виде списка объектов с теми же ключами.
// Некоторые поля при раскодировании нужно исключить и оставить в изначальном виде: _groupId_, _service_, _formatSize_ и _ca_
// Также необходимо вывести список уникальных id, из _encoded_ (можно использовать _translations_ для проверки).
