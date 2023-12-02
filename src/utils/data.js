import carteLogo from '../img/Carte.png';
import yandexLogo from '../img/Yandex.png';
import googleLogo from '../img/Google.png';

const aggregatorsData = [
  { name: 'carte', totalRate: 5.0, reviewsAmount: 152, logo: { yandexLogo } },
  { name: 'yandex', totalRate: 4.9, reviewsAmount: 439, logo: { carteLogo } },
  { name: 'google', totalRate: 4.5, reviewsAmount: 700, logo: { googleLogo } },
];

const draftStars = [5, 4, 3, 2, 1];

export { aggregatorsData, draftStars };
