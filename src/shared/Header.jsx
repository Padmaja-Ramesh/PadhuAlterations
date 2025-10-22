import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../utils/services';

function Header() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') === 'true' ? true : false
  );

  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || ''
  );

  const [cartItem, setCartItem] = useState(getCart() || 0);

  useEffect(() => {
    function checkModeChange() {
      console.log('storage changed');
      const loginStatus = window.localStorage.getItem('loggedIn');
      const loginName = window.localStorage.getItem('userName');
      const cartVal = window.localStorage.getItem('cart');
      setLoggedIn(loginStatus);
      setUserName(loginName);
      setCartItem(cartVal);
    }

    checkModeChange();
    window.addEventListener('storage', checkModeChange);

    return () => {
      window.removeEventListener('storage', checkModeChange);
    };
  }, []);

  const navigate = useNavigate();
  const service = [
    {
      image:
        '//tmtailor.com/cdn/shop/files/TMTailor-Icon-Guaranteed_1.svg?v=1729982256',
      text: 'Quality Guaranteed',
    },
    {
      image:
        '//tmtailor.com/cdn/shop/files/TMTailor-Icon-SecureCheckout_1.svg?v=1729982340',
      text: 'Secure Checkout',
    },
    {
      image:
        '//tmtailor.com/cdn/shop/files/TMTailor-Icon-EcoFriendly_1.svg?v=1729982372',
      text: 'Eco Friendly',
    },
    {
      image:
        '//tmtailor.com/cdn/shop/files/TMTailor-Icon-FastShipping_1.svg?v=1729982401',
      text: 'Fast Shipping',
    },
  ];

  useEffect(() => {
    if (!loggedIn) {
      setUserName('');
    }
  }, [loggedIn]);
  const handleLogout = () => {
    localStorage.clear();
    setUserName('');

    window.dispatchEvent(new Event('logout'));
    navigate('/');
  };
  return (
    <>
      <div
        className="item1"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 40px',
        }}
      >
        <h1>Padhu&apos;s Alterations</h1>

        {/* Username display when logged in */}
        {loggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 'bold', color: '#333' }}>
              Hello, {userName}
            </span>
            {cartItem > 0 ? <span className="cart">{cartItem}</span> : null}
            <button
              onClick={handleLogout}
              style={{
                background: '#f44336',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            to={'/login'}
            className={(isActive) =>
              isActive ? styles.active : styles.inactive
            }
            style={{ margin: '20px', display: 'flex' }}
          >
            Login
          </NavLink>
        )}
      </div>
      <div className="item2">
        <nav>
          <NavLink
            to={'/home'}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Home
          </NavLink>
          <NavLink
            to={'/about'}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            About
          </NavLink>
          <NavLink
            to={'/contact'}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Contact
          </NavLink>

          <NavLink
            to={'/search'}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Search
          </NavLink>
        </nav>
      </div>
      <div className="item4">
        {service.map((item, index) => (
          <div className="icon-box" key={index}>
            {item.image && (
              <img
                src={item.image}
                alt={item.text || 'icon'}
                className="icon-image"
              />
            )}
            <p className="icon-text">{item.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Header;
