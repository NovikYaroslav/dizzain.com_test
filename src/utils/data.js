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
  'Hinkalnaya at 5 Uritskogo Street.',
  'Hinkalnaya at 87 Y. Kupala Street (Trinity Shopping Mall).',
];

const starsCount = [1, 2, 3, 4, 5];
const tableColumns = ['Name', 'Email', 'Phone', 'Date', 'Rating', 'Review'];

export { aggregatorsData, starsCount, restaurantAddresses, tableColumns };
