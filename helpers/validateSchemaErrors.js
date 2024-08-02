// Обработка ошибок работы с БД (установка необходимых статусов)
const isConflict = ({ name, code }) => (name === "MongoServerError" && code === 11000);

const schemaErrors = (error, data, next) => {
    console.log("Вход в schemaErrors");
    error.status = isConflict(error) ? 409 : 400;
    next();
}

export default schemaErrors;