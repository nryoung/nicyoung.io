import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

const MainPageIcon = ({ className, iconName }) => (
  <SVG className={className} src={iconName} />
);

MainPageIcon.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
};

MainPageIcon.defaultProps = {
  className: '',
};

export default MainPageIcon;
