import { IRouterConfig, lazy } from 'ice';

// const Home = lazy(() => import('@/pages/Home'));
import Home from '@/pages/Home';
import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        component: Home,
      }],
  },

];

export default routerConfig;
