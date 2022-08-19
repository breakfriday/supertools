import { IRouterConfig, lazy } from 'ice';

// const Home = lazy(() => import('@/pages/Home'));
import Home from '@/pages/Home';
import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';
import NotFound from './components/NotFound';

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/scence',
        component: Home,
      }],
  },
  {
    component: NotFound,
    pageConfig: {
      title: '',
    },
  },


];

export default routerConfig;
