# DeliveryApp - Приложение для доставки еды

# Ссылка на демо-сайт:

👉 **[Живая версия приложения](https://prostodashaaa.github.io/DeliveryApp/)**

Вы можете просто перейти по этой ссылке, чтобы увидеть работу приложения прямо в браузере.

**DeliveryApp** — это веб-приложение для доставки еды, где пользователи могут просматривать меню с блюдами, добавлять их в корзину, а также оформлять заказы. Приложение включает в себя функционал личного кабинета, регистрацию и авторизацию.

## Функциональность

- **Главное меню** — отображение доступных блюд с возможностью поиска по меню и добавления в корзину.
- **Корзина** — пользователи могут добавлять блюда в корзину, которая сохраняется в **localStorage**, чтобы далее оформить заказ.
- **Регистрация и вход** — пользователи обязаны пройти регистрацию и авторизацию для просмотра меню.
- **API-интеграция** — данные меню и информации о пользователе обрабатываются через **API** с проверкой JWT-токенов.
- **Личный кабинет** — пользователи могут видеть свои данные (имя и почта), а также делать заказы.
  
## Технологии

- **React** — для создания пользовательского интерфейса.
- **React Router** — для реализации маршрутизации в приложении.
- **Redux Toolkit** — для управления состоянием приложения (хранение данных о пользователе, корзине и др.).
- **LocalStorage** — для сохранения данных корзины.
- **JWT** — для авторизации пользователей и проверки их доступа.
- **Vite** — для сборки и развертывания приложения.
