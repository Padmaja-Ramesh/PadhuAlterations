import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
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

  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || ''
  );

  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem('loggedIn') || false
  );

  useEffect(() => {
    if (!loginStatus) {
      setUserName('');
    }
  }, [loginStatus]);
  const handleLogout = () => {
    localStorage.clear();
    setUserName('');
    setLoginStatus(false);

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
        {userName ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 'bold', color: '#333' }}>
              Hello, {userName}
            </span>
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
            to={'/'}
            className={(isActive) =>
              isActive ? styles.active : styles.inactive
            }
            style={{ margin: '20px', display: 'flex' }}
          >
            Home
          </NavLink>
          <NavLink
            to={'/about'}
            className={(isActive) =>
              isActive ? styles.active : styles.inactive
            }
            style={{ margin: '20px', display: 'flex' }}
          >
            About
          </NavLink>
          <NavLink
            to={'/contact'}
            className={(isActive) =>
              isActive ? styles.active : styles.inactive
            }
            style={{ margin: '20px', display: 'flex' }}
          >
            Contact
          </NavLink>

          <NavLink
            to={'/search'}
            className={(isActive) =>
              isActive ? styles.active : styles.inactive
            }
            style={{ margin: '20px', display: 'flex' }}
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
