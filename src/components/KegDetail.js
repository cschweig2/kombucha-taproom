import React from 'react';
import PropTypes from 'prop-types';

function KegDetail(props) {
  const { keg, onClickingDelete } = props;

  return (
    <>
      <h1>Keg Details</h1>
      <h2>{keg.brand} - {keg.name}</h2>
      <h3>flavor profile: {keg.flavor}</h3>
      <h4>price: {keg.price}</h4>
      <h4>pints left: {keg.pintsLeft}</h4>
      <button onClick={ () => onClickingDelete(keg.id) }>Delete Keg</button>
      <hr />
    </>
  );
}

KegDetail.propTypes = {
  keg: PropTypes.object,
  onClickingDelete: PropTypes.func
}

export default KegDetail;