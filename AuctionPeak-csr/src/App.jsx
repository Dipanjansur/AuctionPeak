import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoggedOutLayout from "./Layout/LoggedOutLayout";
import { HomePage } from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import AuctionPage from "./Pages/AuctionPage";
import ItemsPage from "./Pages/ItemsPage";
import BidsPage from "./Pages/BidsPage";
import AboutUs from "./Pages/AboutUs";
import Pricing from "./Pages/Pricing";
import Goals from "./Pages/Goals";
import SignUpPage from "./Pages/SignUpPage";
import BasicFullScreenLayout from "./Layout/BasicFullScreenLayout";
//TODO: make this a context state
const isloggedIn = false
export const router = createBrowserRouter([
  {
    path: '/',
    element: isloggedIn ? <BasicFullScreenLayout /> : < LoggedOutLayout />,
    children: [
      {
        path: '/',
        element: isloggedIn ? <HomePage /> : <LoginPage />,
      },
      {
        path: '/auctions',
        element: <AuctionPage />
      },
      {
        path: '/items',
        element: <ItemsPage />
      },
      {
        path: '/bids',
        element: <BidsPage />
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/aboutus',
        element: <AboutUs />,
      },
      {
        path: '/pricing',
        element: <Pricing />,
      },
      {
        path: '/goals',
        element: <Goals />,
      },
      {
        path: '/signUp',
        element: <SignUpPage />,
        children: [
          {
            path: '', // Assuming you have a details page or content here
            element: <div>Details Page</div>, // Replace with your actual component
          },
        ],
      },
    ]
  }
]);
function App() {
  return (
    <>
      <RouterProvider router={router}>
        <h1>hello there</h1>
      </RouterProvider>
    </>
  )
}

export default App
