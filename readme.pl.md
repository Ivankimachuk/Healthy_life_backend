# Healthy Life API

## Opis projektu

Healthy Life API - to pełne API REST, które łączy się z dużą bazą danych i ma wiele tras. Umożliwia użytkownikom korzystanie z różnych funkcji związanych z autoryzacją, użytkownikami, ich celami, wodą i produktami.

## Dokumentacja

[Link to front-end](https://va7ul.github.io/Healthy_life/)

[Dokumentacja Swagger](https://healthy-life-backend-b6ck.onrender.com/api-docs/#/)

## Technologie

Projekt jest oparty na następujących technologiach:

- **Node.js** dla części serwerowej
- **Express.js** do implementacji API RESTful
- **MongoDB** do przechowywania danych

<p align="left"> 
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> 
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> 
<a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 
<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> 
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
<a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> </p>

i inne używane technologie:

- **Cors**
- **bcrypt**
- **cloudinary**
- **morgan**
- **multer**
- **nodemailer**

## Trasy  API

Projekt ma kilka głównych tras, takich jak:

- `/auth/signup` - trasa do rejestracji użytkownika
- `/auth/signin` - trasa do logowania użytkownika z walidacją poświadczeń i generowaniem tokenu autoryzacji
- `/auth/forgot-password` - trasa do aktualizacji informacji o haśle użytkownika, wysyłająca nowe hasło na adres e-mail użytkownika
- `/auth/signout` - trasa do wylogowania użytkownika z systemu (wylogowanie)
- `/user/current` - trasa do uzyskiwania informacji o użytkowniku
- `/user/update` - trasa do aktualizacji informacji o użytkowniku lub jednym z pól informacji kontaktowej z wyliczeniem danych
- `/user/goal` - trasa do aktualizacji celu użytkownika, nowy cel można przekazać w ciele żądania
- `/user/weight` - trasa dodaje informacje o bieżącej wadze użytkownika na bieżącą datę
- `/user/food-intake` - trasa do zapisywania informacji o spożywanych przez użytkownika produktach na bieżącą datę lub usuwania danych
- `/user/food-intake/:id` - trasa do aktualizacji informacji o spożywanych produktach dla określonego rekordu według identyfikatora (id)
- `/user/water-intake` - trasa do zapisywania informacji o spożyciu wody przez użytkownika na bieżącą datę lub usuwania
- `/user/statistics` - trasa do uzyskiwania statystyk zużycia kalorii, wody i wagi użytkownika przez wybrany okres
- `/user/recommended-food` - trasa do uzyskiwania listy polecanych produktów


## Zespół

### Instalacja

```bash
npm install

Uruchomienie serwera

bash

npm run start:dev


```

## Autorzy

- [@Irulik ](https://github.com/Irulik)
- [@victoria2588 ](https://github.com/victoria2588)
- [@Ivankimachuk ](https://github.com/Ivankimachuk)
- [@Miradzyapko ](https://github.com/Miradzyapko)
