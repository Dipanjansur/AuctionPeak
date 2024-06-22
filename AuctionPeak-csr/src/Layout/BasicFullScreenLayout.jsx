import Footer from "../Components/Footer"
import Header from "../Components/Header"
import { Outlet } from "react-router-dom"

const BasicFullScreenLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default BasicFullScreenLayout
