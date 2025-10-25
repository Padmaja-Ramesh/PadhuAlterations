import { Outlet } from 'react-router-dom';
import Services from '../features/Services';
import ServiceDetails from '../features/ServiceDetails';

function Home() {
  return (
    <div className="item3">
      <div>
        <h2>List of Alterations</h2>
      </div>
      <Services />
      <ServiceDetails />
    </div>
  );
}

export default Home;
