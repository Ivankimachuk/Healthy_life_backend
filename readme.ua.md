# Healthy Life API

## Опис проекту

Healthy Life API - це повноцінний RESTful API, який підключається до великої бази даних та має кілька маршрутів. Воно дозволяє користувачам отримувати доступ до різноманітних функцій, пов'язаних з авторизацією, користувачами, їхніми цілями, водою та продуктами.

## Документація

[Посилання на фронтенд front-end](https://va7ul.github.io/Healthy_life/)

[Swagger документація](https://healthy-life-backend-b6ck.onrender.com/api-docs/#/)

## Технології

Проект побудований на основі наступних технологій:

- **Node.js** для серверної частини
- **Express.js** для реалізації RESTful API
- **MongoDB** для зберігання даних

<p align="left"> 
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> 
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> 
<a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 
<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> 
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
<a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> </p>

і інші використані технології:

- **Cors**
- **bcrypt**
- **cloudinary**
- **morgan**
- **multer**
- **nodemailer**

## Маршрути API

У проекті є кілька основних маршрутів, таких як:

- `/auth/signup` - маршрут для реєстрації користувача
- `/auth/signin` - маршрут для входу користувача з перевіркою облікових даних та генерацією токену автентифікації
- `/auth/forgot-password` - маршрут для оновлення інформації про пароль користувача, надсилання нового паролю на електронну пошту користувача
- `/auth/signout` - маршрут для виходу користувача з системи (вихід)
- `/user/current` - маршрут для отримання інформації про користувача
- `/user/update` - маршрут для оновлення інформації про користувача або одного з полів контактної інформації з переліком даних
- `/user/goal` - маршрут для оновлення цілей користувача, нову ціль можна передати в тілі запиту
- `/user/weight` - маршрут для додавання інформації про поточну вагу користувача на поточну дату
- `/user/food-intake` - маршрут для збереження інформації про харчування, спожиту користувачем, на поточну дату або видалення даних
- `/user/food-intake/:id` - маршрут для оновлення інформації про спожиту їжу для конкретного запису за його ідентифікатором (id)
- `/user/water-intake` - маршрут для збереження інформації про споживання води користувачем на поточну дату або видалення
- `/user/statistics` - маршрут для отримання статистики споживання калорій, води та ваги користувача за вибраний період
- `/user/recommended-food` - маршрут для отримання списку рекомендованих продуктів


## Команди

### Встановлення

```bash
npm install

Запуск сервера

bash

npm run start:dev


```

## Автори

- [@Irulik ](https://github.com/Irulik)
- [@victoria2588 ](https://github.com/victoria2588)
- [@Ivankimachuk ](https://github.com/Ivankimachuk)
- [@Miradzyapko ](https://github.com/Miradzyapko)
