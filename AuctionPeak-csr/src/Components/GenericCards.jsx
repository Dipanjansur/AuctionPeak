import HorizentalAuctionCard from './HorizentalAuctionCard'
import GridAuctionCard from './GridAuctionCard'
import HorizentalItemCard from './HorizentalItemCard'
import PropTypes from 'prop-types';
import VeritalItemCards from './VeritalItemCards';
import HorizentalBidsCard from './HorizentalBidsCard';
import VerticalBidsCard from './VerticalBidsCard';

const GenericCards = ({ type}) => {
  switch (type) {
    case "Auction_Horizental":
      return <HorizentalAuctionCard />
    case "Auction_Vertical":
      return <GridAuctionCard/>
    case "Items_Horizental":
      return <HorizentalItemCard />
    case "Items_Vertical":
      return <VeritalItemCards />
    case "Bids_Horizental":
      return <HorizentalBidsCard/>
    case "Bids_Vertical":
      return <VerticalBidsCard/>
  }
}
GenericCards.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object
}
export default GenericCards