import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import styled from 'styled-components';

const Page = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const Template = ({ children }) => (
  <Page>
    <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
    {children()}
  </Page>
);

Template.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Template;
