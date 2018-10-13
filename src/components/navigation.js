import React from 'react';
import styled from 'styled-components';

import getCloudinaryImage from '../utils/cloudinary';
import media from '../styles/media';

const backgroundImageName = 'mountain-background';

const StyledNavigation = styled.nav`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 220px;
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
  background-repeat: no-repeat;
  background-position: 50% 33%;
  background-size: cover;
`;

const Navigation = () => <StyledNavigation />;

export default Navigation;
