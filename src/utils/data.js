import carteLogo from '../img/Carte.png';
import yandexLogo from '../img/Yandex.png';
import googleLogo from '../img/Google.png';

const aggregatorsData = [
  {
    name: 'carte',
    totalRate: 5.0,
    reviewsAmount: 152,
    logo: { yandexLogo },
    ref: 'https://carte.by',
  },
  {
    name: 'yandex',
    totalRate: 4.9,
    reviewsAmount: 439,
    logo: { carteLogo },
    ref: 'https://ya.ru',
  },
  {
    name: 'google',
    totalRate: 4.5,
    reviewsAmount: 700,
    logo: { googleLogo },
    ref: 'https://google.ru',
  },
];

const restaurantAddresses = [
  'Хинкальня на ул. Урицкого, 5',
  'Хинкальня на ул. Я.Купалы, 87 (ТРК Тринити)',
];

const starsCount = [1, 2, 3, 4, 5];
const tableColumns = ['Имя', 'Email', 'Телефон', 'Дата', 'Рейтинг', 'Отзыв'];

export { aggregatorsData, starsCount, restaurantAddresses, tableColumns };
