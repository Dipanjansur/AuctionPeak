import { useParams } from 'react-router-dom'
const ItemDetails = () => {
  let { ItemId } = useParams();

  return (
    <div>ItemDetails{ItemId}</div>
  )
}

export default ItemDetails