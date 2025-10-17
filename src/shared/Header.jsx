import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const service = [
    'Quality Guaranteed',
    'Secure Checkout',
    'Eco Friendly',
    'Fast Shipping',
  ];
  return (
    <>
      <div
        className="item1"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <h1>Padhu's Alternations</h1>
      </div>
      <div className="item2">
        <nav>
          <NavLink
            to={'/'}
            className={(isActive) => {
              isActive ? styles.active : styles.inactive;
            }}
            style={{ margin: '20px', display: 'flex' }}
          >
            Home
          </NavLink>
          <NavLink
            to={'/contact'}
            className={(isActive) => {
              isActive ? styles.active : styles.inactive;
            }}
            style={{ margin: '20px', display: 'flex' }}
          >
            Contact
          </NavLink>
          <NavLink
            to={'/login'}
            className={(isActive) => {
              isActive ? styles.active : styles.inactive;
            }}
            style={{ margin: '20px', display: 'flex' }}
          >
            Login
          </NavLink>
          <NavLink
            to={'/search'}
            className={(isActive) => {
              isActive ? styles.active : styles.inactive;
            }}
            style={{ margin: '20px', display: 'flex' }}
          >
            Search
          </NavLink>
        </nav>
      </div>
      <div className="item4">
        {service.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
    </>
  );
}

export default Header;
