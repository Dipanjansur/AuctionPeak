import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBids } from "../Slices/BidsSlice";

const BidsPage = () => {
  const filteredList = useSelector((state => state.bids))
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBids())
    console.log(filteredList)
  }, [])
  return (
    <></>
  )
}

export default BidsPage