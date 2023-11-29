# Тестовое задание

# 👋

Задание состоит из двух частей:

# Блок с отзывами

https://www.figma.com/file/rO3SaJO2HwBFhK7c5zpFYl/955_hinkalnyagrodno_test?type=design&node-id=0%3A1&mode=design&t=39CCbXILMUP80UL8-1

[test.json](https://prod-files-secure.s3.us-west-2.amazonaws.com/853cfcdc-17b3-40c9-8dd0-05ecd897a462/379ab04e-bde5-4dc5-9a1b-107f51da19e5/test.json)

Часть отзывов:

- Отзывы находятся в файле test.json
- Создать store из test.json используя createContext
- Выводить нужно 6 случайных отзывов
- Выводить отзывы только те, у которых reviewIsShowAtHomePage = true
- Количество лайков - reviewLikesCount
- Оценка - reviewRate
- При нажатии на like, значение должно увеличиваться на 1 и сохраняться в Context + при сохранении store, обновлять так же файл test.json
- Респонзив в макете выше отрисован

При нажатии на кнопку “Оставить отзыв”, должно появляться всплывающее окно:

https://www.figma.com/file/rO3SaJO2HwBFhK7c5zpFYl/955_hinkalnyagrodno_test?type=design&node-id=1%3A2&mode=design&t=fhZD0o6vSh3jQK1D-1

В окне у нас имеется несколько шагов:

1 - выбираем адрес

2 - указываем оценку

3 - если оценка выше 3, то мы выводим 3 сервиса для отзыва

4 - если оценка ниже либо равно 3, мы выводим форму для заполнения (Имя, email, телефон дата посещения, отзыв, и возможность загрузить файл)

5 - При отправке добавляем отзыв в store и в test.json

6 - Респонзив на свое усмотрение

# Страница для управления отзывами

https://www.figma.com/file/rO3SaJO2HwBFhK7c5zpFYl/955_hinkalnyagrodno_test?type=design&node-id=4%3A10&mode=design&t=fhZD0o6vSh3jQK1D-1

Создать страницу, в которой будет форма для добавления в стор отзывов, под ней вывести список отзывов

- Данные в этом списке можно изменить или удалить
- При заполнении формы, этот отзыв должен появляться на главной
- Респонзив на свое усмотрение

Как должна выглядеть форма при редактировании отзыва - не важно, на свое усмотрение.
