import HorizentalAuctionCard from './HorizentalAuctionCard'
import GridAuctionCard from './GridAuctionCard'
import HorizentalItemCard from './HorizentalItemCard'
import VeritalItmeCards from './VeritalItmeCards'
import PropTypes from 'prop-types';

const GenericCards = ({ type, data }) => {
  switch (type) {
    case "Auction_Horizental":
      return <HorizentalAuctionCard data={data} />
    case "Auction_Vertical":
      return <GridAuctionCard data={data} />
    case "Items_Horizental":
      return <HorizentalItemCard data={data} />
    case "Items_Vertical":
      return <VeritalItmeCards data={data} />
  }
}
GenericCards.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object
}
export default GenericCards