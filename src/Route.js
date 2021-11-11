import { useRoutes } from 'hookrouter';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import DataModel from './pages/DataModel';
import Deposit from './pages/Deposit';
import Business from './pages/Business';
import CreateBusiness from './pages/CreateBusiness';

const routes = {
    '/': () => <HomePage />,
    '/datamodel/:id': ({ id }) => <DataModel id={id} />,
    '/business/:id': ({ id }) => <Business id={id} />,
    '/createbusiness/:id': ({ id }) => <CreateBusiness id={id} />
};

const Route = () => {
    const routeResult = useRoutes(routes);

    return routeResult || <NotFoundPage />;
}

export default Route