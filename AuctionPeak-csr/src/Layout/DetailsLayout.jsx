import { Children } from "react"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import { Outlet } from "react-router-dom"

const DetailsLayout = () => {
  return (
    <>
      <Header />
      <Outlet>{Children}</Outlet>
      <Footer />
    </>
  )
}

export default DetailsLayout