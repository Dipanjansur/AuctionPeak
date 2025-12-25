import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchItems } from "../Slices/ItemsSlice";
import { useEffect } from "react";
import ImageCarousel from "./ImageCarousel";

const VeritalItemCards = ({ itemsData }) => {
  const reduxItems = useSelector((state) => state.item.Items);
  const items = itemsData ? itemsData : reduxItems;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);



  if (!items || items.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] w-full mt-8">
      </div>
    );
  }

  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {items?.map((item) => {
        const activityColor = (active) => {
          if (item.active || item.Status === 'LISTED') return 'bg-gradient-to-tl from-green-300 to-green-500 text-white rounded-xl';
          return 'bg-gradient-to-tl from-slate-300 to-slate-500 text-white rounded-xl';
        }

        const handleDetails = (e) => {
          e.stopPropagation();
          navigate(`/items/${item.ItemId}`);
        };

        const handleUpdate = (e) => {
          e.stopPropagation();
          navigate(`/items/update/${item.ItemId}`);
        };

        const handleDelete = (e) => {
          e.stopPropagation();
          // Add delete logic here
          console.log("Delete item", item.ItemId);
        };

        return (
          <li
            key={item.ItemId}
            onClick={() => {
              navigate(`/items/${item.ItemId}`);
            }}
            className="group relative bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col"
          >
            {/* Image Section */}
            <div className="w-full h-[250px] overflow-hidden relative">
              <ImageCarousel
                images={item?.Pics}
                altText={item?.ItemName}
              />
              <div className="absolute top-3 right-3 z-10">
                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow-sm text-white ${item.active ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gray-400'}`}>
                  {item.Status || (item.active ? 'Active' : 'Inactive')}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-1">
                  {item.ItemName}
                </h3>
                <p className="text-lg font-semibold text-indigo-600 shrink-0 ml-2">
                  £{item.CurrentPrice?.toLocaleString()}
                </p>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                {item.ItemDescription || "No description available."}
              </p>

              <div className="pt-4 mt-auto flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <div className={`${activityColor(item.active)} flex items-center gap-2 text-sm text-gray-500 font-medium p-2 rounded-lg`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white">{item.activeTime || "Time not available"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-end mt-2">
                  {(item.permission?.includes("view_items") || item.permission?.includes("all_items")) && (
                    <UserActionButton text="Details" color="bg-gray-600" action={handleDetails} />
                  )}
                  {(item.permission?.includes("update_items") || item.permission?.includes("all_items")) && (
                    <UserActionButton text="Update" color="bg-gray-600" action={handleUpdate} />
                  )}
                  {(item.permission?.includes("delete_items") || item.permission?.includes("all_items")) && (
                    <UserActionButton text="Delete" color="bg-gray-600" action={handleDelete} />
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const UserActionButton = ({ text, color, action }) => {
  return (
    <button
      className={`${color} hover:bg-gray-800 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 z-20 relative`}
      onClick={action}
    >
      {text}
    </button>
  );
};

export default VeritalItemCards;