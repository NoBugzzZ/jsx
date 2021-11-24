import { useRoutes } from 'hookrouter';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import DataModel from './pages/DataModel';
import Business from './pages/Business';
import CreateBusiness from './pages/CreateBusiness';

const routes = {
    '/': () => <HomePage />,
    '/datamodel/:schemaId': ({ schemaId }) => <DataModel schemaId={schemaId} />,
    '/business/:schemaId/:id': ({ schemaId,id }) => <Business schemaId={schemaId} id={id} />,
    '/createbusiness/:schemaId': ({ schemaId }) => <CreateBusiness schemaId={schemaId}/>
};

const Route = () => {
    const routeResult = useRoutes(routes);

    return routeResult || <NotFoundPage />;
}

export default Route