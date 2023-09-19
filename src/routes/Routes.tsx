import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { routsNameMain } from '../data/routsName'
import RootLayout from '../Layout/RootLayout'
import FourOhFour from '../pages/404'
import Loading from '../pages/loading'
import Home from '../pages/main/home'
import Admins from '../pages/main/admins'
import Users from '../pages/main/users'
import Messages from '../pages/main/messages'
import Login from '../pages/main/login'
import Experts from '../pages/main/experts'
import Markings from '../pages/main/markings'
import Patient from '../pages/main/patient'
import Queries from '../pages/main/queries'
import Services from '../pages/main/services'
import Specialty from '../pages/main/specialty'

// const Home = React.lazy(() => import('../pages/main/home'))

type Props = {
  children: JSX.Element
}

function PrivateLogin({ children }: Props) {
  const user = null

  if (user != null) {
    return <Navigate to={'/'} />
  }

  return children
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Home */}
          <Route
            index
            element={
              <React.Suspense fallback={<Loading />}>
                <Home />
              </React.Suspense>
            }
          />
          {/* Admins */}
          <Route
            path={routsNameMain.admins}
            element={
              <React.Suspense fallback={<Loading />}>
                <Admins />
              </React.Suspense>
            }
          />

          {/* Users */}
          <Route
            path={routsNameMain.users}
            element={
              <React.Suspense fallback={<Loading />}>
                <Users />
              </React.Suspense>
            }
          />

          {/* Services */}
          <Route
            path={routsNameMain.services}
            element={
              <React.Suspense fallback={<Loading />}>
                <Services />
              </React.Suspense>
            }
          />
          {/* Specialty */}
          <Route
            path={routsNameMain.specialty}
            element={
              <React.Suspense fallback={<Loading />}>
                <Specialty />
              </React.Suspense>
            }
          />
          {/* Experts */}
          <Route
            path={routsNameMain.experts}
            element={
              <React.Suspense fallback={<Loading />}>
                <Experts />
              </React.Suspense>
            }
          />
          {/* Patient */}
          <Route
            path={routsNameMain.patient}
            element={
              <React.Suspense fallback={<Loading />}>
                <Patient />
              </React.Suspense>
            }
          />
          {/* Markings */}
          <Route
            path={routsNameMain.markings}
            element={
              <React.Suspense fallback={<Loading />}>
                <Markings />
              </React.Suspense>
            }
          />
          {/* Queries */}
          <Route
            path={routsNameMain.queries}
            element={
              <React.Suspense fallback={<Loading />}>
                <Queries />
              </React.Suspense>
            }
          />

          {/* Messages */}
          <Route
            path={routsNameMain.messages}
            element={
              <React.Suspense fallback={<Loading />}>
                <Messages />
              </React.Suspense>
            }
          />
        </Route>

        {/* Login */}
        <Route
          path={routsNameMain.login}
          element={
            <React.Suspense fallback={<Loading />}>
              <PrivateLogin>
                <Login />
              </PrivateLogin>
            </React.Suspense>
          }
        />

        <Route
          path="*"
          element={
            <React.Suspense fallback={<Loading />}>
              <FourOhFour />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
