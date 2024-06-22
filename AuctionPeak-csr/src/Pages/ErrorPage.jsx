import image from "../assets/Error.svg"
const ErrorPage = () => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <img src={image} alt='mySvgImage' style={{ "minHeight": "400px" }} />
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-9xl">Something Went Wrong</p>
        <a
          href="/"
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </a>
      </div>
    </div>
  )
}

export default ErrorPage