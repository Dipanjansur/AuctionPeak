import { Children } from 'react'
import { Outlet } from 'react-router-dom'

const LoggedOutLayout = () => {
  return (
    <>
      <Outlet>{Children}</Outlet>
    </>
  )
}

export default LoggedOutLayout