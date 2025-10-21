import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const service = [
    'Quality Guaranteed',
    'Secure Checkout',
    'Eco Friendly',
    'Fast Shipping',
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
        {service.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </>
  );
}

export default Header;
