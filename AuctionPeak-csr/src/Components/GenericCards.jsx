import HorizentalAuctionCard from './HorizentalAuctionCard'
import GridAuctionCard from './GridAuctionCard'
import HorizentalItemCard from './HorizentalItemCard'
import PropTypes from 'prop-types';
import VeritalItemCards from './VeritalItemCards';

const GenericCards = ({ type, data }) => {
  switch (type) {
    case "Auction_Horizental":
      return <HorizentalAuctionCard />
    case "Auction_Vertical":
      return <GridAuctionCard/>
    case "Items_Horizental":
      return <HorizentalItemCard data={data} />
    case "Items_Vertical":
      return <VeritalItemCards data={data} />
  }
}
GenericCards.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object
}
export default GenericCards