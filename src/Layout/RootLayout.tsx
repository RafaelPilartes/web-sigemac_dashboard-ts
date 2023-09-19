import { Outlet } from 'react-router-dom'
import { Header } from '../components/main/Header'
import { useContext } from 'react'
import { AppContext } from '../provider/AppProvider'
import { Slide } from '../components/main/Slide'

function RootLayout() {
  const { isDarkMode, menuIsVisible } = useContext(AppContext)

  return (
    <>
      <div className={`${isDarkMode && 'dark'} w-full h-full `}>
        <div className="w-full h-full text-baseTxtDark dark:text-baseTxtLight bg-baseBgLight dark:bg-baseBgDark">
          <Header />
          <div className="relative h-full z-0 mt-20 flex flex-row items-start justify-center">
            <Slide />
            <div
              className={`w-full h-screen flex-1 p-8 transition-all duration-300 ${
                menuIsVisible ? 'ml-64' : 'ml-14'
              }`}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RootLayout
