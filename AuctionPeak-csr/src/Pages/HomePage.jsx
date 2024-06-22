
export const HomePage = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto text-center">
          <p className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-9xl font-extrabold text-transparent">AuctionTop</p>
          <h3 className=" text-6xl sm:block">We are best in Auctions</h3>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Best place and best Auctions are done here
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>)
}
