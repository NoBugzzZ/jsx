import { useRoutes } from 'hookrouter';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import DataModel from './pages/DataModel';
import Business from './pages/Business';
import CreateBusiness from './pages/CreateBusiness';
import DataModelList from './pages/DataModelList';
import FlowModelList from './pages/FlowModelList';
import DataModelPreview from './pages/DataModelPreview';
import FlowModelMPreview from './pages/FlowModelPreview';

const routes = {
    '/': () => <HomePage />,
    '/datamodel/:schemaId': ({ schemaId }) => <DataModel schemaId={schemaId} />,
    '/business/:schemaId/:id': ({ schemaId, id }) => <Business schemaId={schemaId} id={id} />,
    '/createbusiness/:schemaId': ({ schemaId }) => <CreateBusiness schemaId={schemaId} />,
    '/datamodellist': () => <DataModelList />,
    '/flowmodellist': () => <FlowModelList />,
    '/datamodelpreview/:id': ({ id }) => <DataModelPreview id={id} />,
    '/flowmodelpreview/:id': ({ id }) => <FlowModelMPreview id={id} />,
};

const Route = () => {
    const routeResult = useRoutes(routes);

    return routeResult || <NotFoundPage />;
}

export default Route