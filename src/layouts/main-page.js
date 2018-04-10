import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import '../styles/base';
import getCloudinaryImage from '../utils/cloudinary';
import media from '../styles/media';

const backgroundImageName = 'mountain-background';

const StyledPage = styled.section`
  display: flex;
  flex-flow: column;
  align-items: stretch;
  min-height: 100%;
  height: 100vh;
`;

const StyledMain = styled.main`
  display: flex;
  flex: 1 1 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  background: transparent;
  transition: background-image 550ms ease-in-out;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: multiply;
  animation: fadein ease-in 1.5s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  background-image: url(${getCloudinaryImage(backgroundImageName, 900)});
  ${media.screenMediumUp`
    background-image: url(${getCloudinaryImage(backgroundImageName, 1200)});
  `};
  ${media.screenLargeUp`
    background-image: url(${getCloudinaryImage(backgroundImageName, 1800)});
  `};
  ${media.screenExtraLargeUp`
    background-image: url(${getCloudinaryImage(backgroundImageName, 1920)});
  `};
`;

const Template = ({ children }) => (
  <StyledPage>
    <StyledMain>{children()}</StyledMain>
  </StyledPage>
);

Template.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Template;
