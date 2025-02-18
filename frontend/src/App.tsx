import { Navigate, useRoutes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/LoginPage'
import OpenRoute from './components/openRoutes/OpenRoutes'
import RegisterPage from './pages/RegisterPage'
import DashBoardLayout from './layouts/DashBoardLayout'
import PrivateRoute from './components/privateRoutes/PrivateRoute'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import NotFound from './pages/NotFoundPage'

const App = () => {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { element: <Navigate to={"login"} replace />, index: true },
        {
          path: "login",
          element: (
            <OpenRoute>
              <LoginPage />
            </OpenRoute>
          ),
        },
        {
          path: "register",
          element: (
            <OpenRoute>
              <RegisterPage />
            </OpenRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <DashBoardLayout />,
      children: [
        { element: <Navigate to={"app"} replace />, index: true },
        {
          path: "app",
          element: (
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          ),
        },
        {
          path: "app/profile",
          element: (
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ])
}

export default App