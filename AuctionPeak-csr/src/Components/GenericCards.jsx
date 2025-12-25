import HorizentalAuctionCard from './HorizentalAuctionCard'
import GridAuctionCard from './GridAuctionCard'
import HorizentalItemCard from './HorizentalItemCard'
import PropTypes from 'prop-types';
import VeritalItemCards from './VeritalItemCards';
import HorizentalBidsCard from './HorizentalBidsCard';
import VerticalBidsCard from './VerticalBidsCard';
//TODO:improve the usage maybe remove the use of type in GenericCards if possible
// const GenericCards = ({ component: Component, data, ...props }) => {
//   return <Component itemsData={data} {...props} />;
// };

const GenericCards = ({ type, itemsData }) => {
  switch (type) {
    case "Auction_Horizental":
      return <HorizentalAuctionCard />
    case "Auction_Vertical":
      return <GridAuctionCard />
    case "Items_Horizental":
      return <HorizentalItemCard itemsData={itemsData} />
    case "Items_Vertical":
      return <VeritalItemCards itemsData={itemsData} />
    case "Bids_Horizental":
      return <HorizentalBidsCard />
    case "Bids_Vertical":
      return <VerticalBidsCard />
  }
}
GenericCards.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object
}

export default GenericCards