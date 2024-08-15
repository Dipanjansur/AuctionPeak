import { useState } from 'react';
import image from '../assets/Untitled-2024-06-19-1959.svg';
import axios from 'axios';

const LogInComponent = () => {
  const [loginvalues, setloginvalues] = useState({ "email": "", "password": "" })
  function handleButtonCLick(e) {
    e.preventDefault();
    axios.post('http://localhost:8080/users/login', { ...loginvalues })
      .then(function (response) {
        console.log(response)
        if (response.status == 200 && response.data.jwt != "") {
          localStorage.setItem("authToken", response.data.jwt)
          window.location.href = '/auctions'; // Redirect to login
        }
      })
      // .catch(function (error) {
      //   // TODO:create a Toast and show it 

      // })
      .finally(function () {
        setloginvalues({ "email": "", "password": "" })
      });
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <img src={image} alt='mySvgImage' style={{ "maxHeight": "70px" }} />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to AuctionPeak
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              We are best to Auction Things
            </p>
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <img src={image} alt='mySvgImage' style={{ "maxHeight": "70px" }} />

              </a>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to AuctionPeak
              </h2>

              <p className="mt-4 leading-relaxed text-gray-500">
                We are best to Auction Things
              </p>
            </div>

            <form action="#" className="mt-8 grid grid-cols-6 gap-2">
              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email/UserName </label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  value={loginvalues.email}
                  onChange={(e) => setloginvalues({ ...loginvalues, "email": e.target.value })}
                  className="mt-1 p-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm min-h-5"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Passowrd" className="block text-sm font-medium text-gray-700"> Password </label>

                <input
                  type="Passowrd"
                  id="Passowrd"
                  name="Passowrd"
                  value={loginvalues.password}
                  onChange={(e) => setloginvalues({ ...loginvalues, "password": e.target.value })}
                  className="mt-1 p-2 w-full rounded-md border-gray-800 bg-white text-sm text-gray-700 shadow-sm min-h-5"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button onClick={handleButtonCLick}
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Login
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Dont have an account?
                  <a href="/signup" className="text-gray-700 underline">SignUp</a>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div >
    </section >)
}

export default LogInComponent