import { IRouterConfig, lazy } from 'ice';

// const Home = lazy(() => import('@/pages/Home'));
import Home from '@/pages/Home';

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: Home,
  },
];

export default routerConfig;
