import { Navigate } from "react-router-dom"

const HorizentalItemCard = ({ data }) => (
  <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" >
    {
      data?.message?.map((item) => (
        <li key={item.ItemId} onClick={() => { Navigate(`/items/${item.ItemId}`) }}>
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt=""
            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
          />
          <div className="relative bg-white pt-3">
            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
              {item.ItemName}
            </h3>
            <p className="mt-2">
              <span className="sr-only">{item.ItemDescription}</span>
              <span className="tracking-wider text-gray-900">{`£ ${item.CurrentPrice} GBP`}</span>
            </p>
          </div>
        </li>
      ))
    }
  </ul >
);

export default HorizentalItemCard