import { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { ENDPOINT, NOTIFICATIONS } from '@constants'

// Importing the pages
const HomePage = lazy(() => import('@pages/HomePage'))
const MainLayout = lazy(() => import('@layouts/MainLayout'))
const ProductDetailPage = lazy(() => import('@pages/ProductDetailPage'))
const EmptyProduct = lazy(() => import('@components/common/EmptyProduct'))
const Loading = lazy(() => import('@components/common/Loading'))

// Router configuration
export const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <EmptyProduct errorMessage={NOTIFICATIONS.API_ERROR} />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ENDPOINT.PRODUCTS,
        children: [
          {
            path: ':id',
            element: (
              <Suspense fallback={<Loading />}>
                <ProductDetailPage />
              </Suspense>
            ),
            errorElement: (
              <EmptyProduct errorMessage={NOTIFICATIONS.API_ERROR} />
            ),
          },
        ],
      },
    ],
  },
]
