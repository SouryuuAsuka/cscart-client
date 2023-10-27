import { useEffect } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { Home } from '@/pages/Home';
import { useAppDispatch, useAppSelector } from './utils/hooks';
import { setAppNotLoading } from './redux/sagas';
import { Loading } from './components';

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.app.loading)
  useEffect(() => {
    dispatch(setAppNotLoading())
  }, [])
  const router = createBrowserRouter([
    {
      path: "",
      element: <Home />,
    }
  ]);

  return (
    <>
      {
        loading
          ? <Loading />
          :
          <main>
            <RouterProvider router={router} />
          </main>
      }
    </>
  )
}
export default App;