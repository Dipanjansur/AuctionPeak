import PropTypes from 'prop-types';

const HorizentalCardLayout = ({ children }) => {
  return (
    <>
      {children}
    </>
  )
}
HorizentalCardLayout.propTypes = {
  children: PropTypes.node,
}
export default HorizentalCardLayout
