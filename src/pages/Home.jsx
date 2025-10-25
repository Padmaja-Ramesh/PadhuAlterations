import { Outlet } from 'react-router-dom';
import Services from '../features/Services';
import ServiceDetails from '../features/ServiceDetails';

function Home() {
  return (
    <div className="item3">
      <div>
        <h3>List of Alterations</h3>
      </div>
      <Services />
      <ServiceDetails />
    </div>
  );
}

export default Home;
