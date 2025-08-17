import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home} from './Pages/Home'
import { FetchOld } from './Pages/FetchOld'
import { FetchRQ } from './Pages/FetchRQ'
import {MainLayout} from './components/Layout/MainLayout'

// Importing QueryClientProvider
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const router = createBrowserRouter([
  {
    path:"/",
    element: <MainLayout />,
    children : [
      {
        path:"/",
        element:<Home />
      }, 
      {
        path:"/trad",
        element:<FetchOld />
      },
      {
        path :"/rq",
        element : <FetchRQ />
      },
    ]
  }
])

export default function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  )
}
