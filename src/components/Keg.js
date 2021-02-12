import React from 'react';
import PropTypes from 'prop-types';

function Keg(props) {
  return (
    <>
      <div onClick = {() => props.whenKegClicked(props.id)}>
        <h2>{props.brand} - {props.name}</h2>
        <h3>{props.flavor}</h3>
        <h4>{props.price}</h4>
        <hr />
      </div>
    </>
  );
}

Keg.propTypes = {
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  flavor: PropTypes.string.isRequired,
  pintsLeft: PropTypes.number,
  price: PropTypes.number.isRequired,
  whenKegClicked: PropTypes.func
};

export default Keg;