// const fs = require("fs/promises"); //Пакет работы с файлами
import fs from "fs/promises"; //Пакет работы с файлами
// const path = require("path"); // Пакет работы с путями
import { join } from "path"; // Пакет работы с путями
// const { v4 } = require("uuid"); // Импорт генератора случайных чисел "uuid"
import { v4 } from "uuid"; // Импорт генератора случайных чисел "uuid"

const __dirname = import.meta.dirname;
const contactsPath = join(__dirname, "../db/contacts.json"); // Нормализация пути к файлу

async function listContact() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data); //Получение массива контактов из строки
  // console.log(contacts);
  return contacts;
};

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContact();
  const result = contacts.find(item => item.id === contactId);

  // Если результат не найден, то вернуть null
  if (!result) {
    return null;
  };
    
  return result;
};

async function deleteContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContact();
  const idx = contacts.findIndex(item => item.id === contactId); // Поиск индекса нужного товара

    // Если результат не найден, то вернуть null
    if (idx === -1) {
      return null;
    };
    
    const [removeContact] = contacts.splice(idx, 1); // Удаление товара
		await fs.writeFile(contactsPath, JSON.stringify(contacts)); // Перезаписывает список товаров в виде строки
		return removeContact;
};

async function addContact({ name, email, phone }) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contacts = await listContact();
  const newContact = { id: v4(), name, email, phone  }; // Добавление id к новому контакту
  contacts.push(newContact); // Добавление нового контакта в общий список
  await fs.writeFile(contactsPath, JSON.stringify(contacts)); // Перезаписывает список товаров в виде строки
  return newContact;
};

const contactsServices = {
  listContact,
  getContactById,
  deleteContact,
  addContact
};

// exports.contactsServices = contactsServices;
// module.export = contactsServices;
export default contactsServices;