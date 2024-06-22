import PropTypes from 'prop-types';

const GridCardsLayout = ({ children }) => {
  return (
    <>
      {children}
    </>
  )
}
GridCardsLayout.propTypes = {
  children: PropTypes.node,
}
export default GridCardsLayout

