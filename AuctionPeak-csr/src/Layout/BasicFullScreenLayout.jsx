import Footer from "../Components/Footer"
import Header from "../Components/Header"
import { Outlet } from "react-router-dom"

const BasicFullScreenLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default BasicFullScreenLayout
