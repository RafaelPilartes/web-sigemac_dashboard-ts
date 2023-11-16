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
import Permission from '../pages/main/permission'
import News from '../pages/main/news'
import Videos from '../pages/main/videos'
import Categories from '../pages/main/categories'
import Tags from '../pages/main/tag'
import Authors from '../pages/main/authors'
import Advertising from '../pages/main/advertising'
import Newsletters from '../pages/main/newsletters'
import DownloadPermissions from '../pages/main/downloadPermissions'
import Comments from '../pages/main/comments'
import Newspapers from '../pages/main/newspapers'
import { useAdminStore } from '../stores/adminStore'
import Opinions from '../pages/main/opinions'

// const Home = React.lazy(() => import('../pages/main/home'))

type Props = {
  children: JSX.Element
}

function Private({ children }: Props) {
  const { currentAdminData } = useAdminStore()

  if (!currentAdminData) {
    return <Navigate to={'/login'} />
  }

  return children
}
function PrivateLogin({ children }: Props) {
  const { currentAdminData } = useAdminStore()

  if (currentAdminData) {
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
                <Private>
                  <Home />
                </Private>
              </React.Suspense>
            }
          />
          {/* Admins */}
          <Route
            path={routsNameMain.admins}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Admins />
                </Private>
              </React.Suspense>
            }
          />
          {/* permissions */}
          <Route
            path={routsNameMain.permissions}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Permission />
                </Private>
              </React.Suspense>
            }
          />
          {/* news */}
          <Route
            path={routsNameMain.news}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <News />
                </Private>
              </React.Suspense>
            }
          />
          {/* categories */}
          <Route
            path={routsNameMain.categories}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Categories />
                </Private>
              </React.Suspense>
            }
          />
          {/* tags */}
          <Route
            path={routsNameMain.tags}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Tags />
                </Private>
              </React.Suspense>
            }
          />
          {/* authors */}
          <Route
            path={routsNameMain.authors}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Authors />
                </Private>
              </React.Suspense>
            }
          />
          {/* Advertising */}
          <Route
            path={routsNameMain.advertising}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Advertising />
                </Private>
              </React.Suspense>
            }
          />
          {/* opinions */}
          <Route
            path={routsNameMain.opinions}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Opinions />
                </Private>
              </React.Suspense>
            }
          />
          {/* videos */}
          <Route
            path={routsNameMain.videos}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Videos />
                </Private>
              </React.Suspense>
            }
          />
          {/* download_permissions */}
          <Route
            path={routsNameMain.download_permissions}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <DownloadPermissions />
                </Private>
              </React.Suspense>
            }
          />
          {/* newsletter */}
          <Route
            path={routsNameMain.newsletter}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Newsletters />
                </Private>
              </React.Suspense>
            }
          />
          {/* comments */}
          <Route
            path={routsNameMain.comments}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Comments />
                </Private>
              </React.Suspense>
            }
          />
          {/* newspapers */}
          <Route
            path={routsNameMain.newspapers}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Newspapers />
                </Private>
              </React.Suspense>
            }
          />

          {/* Users */}
          <Route
            path={routsNameMain.users}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Users />
                </Private>
              </React.Suspense>
            }
          />

          {/* Messages */}
          <Route
            path={routsNameMain.messages}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Messages />
                </Private>
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
