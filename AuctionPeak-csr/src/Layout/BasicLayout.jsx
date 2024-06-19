import { Children } from "react"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import { Outlet } from "react-router-dom"

const BasicLayout = () => {
  return (
    <>
      <Header />
      <Outlet>{Children}</Outlet>
      <Footer />
    </>
  )
}

export default BasicLayout