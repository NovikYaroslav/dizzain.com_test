import { useNavigate } from 'react-router-dom';
import Reviews from '../../components/Reviews/Reviews';
import Popup from '../../components/Popup/Popup';
import './main.css';

export default function Main() {
  const navigate = useNavigate();

  function handleSetupClick() {
    navigate('/setup');
  }

  return (
    <main className='main'>
      <button className='main__setup-button' onClick={handleSetupClick} type='button'></button>
      <Reviews />
      <Popup />
    </main>
  );
}
