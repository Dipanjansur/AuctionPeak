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
import Pricing from "./Pages/Pricing";
import SignUpPage from "./Pages/SignUpPage";
import BasicFullScreenLayout from "./Layout/BasicFullScreenLayout";
import ErrorPage from "./Pages/ErrorPage";
import NotFoundPage from "./Pages/NotFoundPage";
import AuctionDetails from "./Components/AuctionDetails";
import ItemDetails from "./Components/ItemDetails";
import CreateAuction from "./Components/CreateAuction";
//TODO: make this a context state
const isloggedIn = true
export const router = createBrowserRouter([
  {
    path: '/',
    element: isloggedIn ? <BasicFullScreenLayout /> : < LoggedOutLayout />,
    errorElement: <ErrorPage />,
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
        path: '/auctions/:auctionId',
        element: <AuctionDetails />
      },
      {
        path: "/auctions/create-auction",
        element: <CreateAuction />
      },
      {
        path: "/auctions/edit/:id",
        element: <CreateAuction />
      },
      {
        path: '/items',
        element: <ItemsPage />
      }, {
        path: '/items/:ItemId',
        element: <ItemDetails />
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
        path: '/pricing',
        element: <Pricing />,
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
      {
        path: '*',
        element: <NotFoundPage />,
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
