import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

import getCloudinaryImage from '../utils/cloudinary';
import media from '../styles/media';
import * as colors from '../styles/colors';
import MainPageIcon from '../components/main-page-icon';
import blogIcon from '../images/blog-icon.svg';
import githubIcon from '../images/github-icon.svg';
import twitterIcon from '../images/twitter-icon.svg';
import emailIcon from '../images/email-icon.svg';

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: multiply;
`;

const StyledName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 68px;
  ${media.screenSmallUp`
    font-size: 72px;
  `}
  color: ${colors.white};
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledIcon = styled(MainPageIcon)`
  margin-right: 16px;
  svg {
    path {
      transition: fill 0.5s ease-in-out;
      fill: ${colors.white};
    }
  }

  &:hover {
    svg {
      path {
        fill: ${colors.gray};
      }
    }
  }
`;

const Navigation = () => (
  <StyledNavigation>
    <StyledName>Nic Young</StyledName>
    <IconsContainer>
      <Link to="/blog">
        <StyledIcon iconName={blogIcon} />
      </Link>
      <a
        href="https://github.com/nryoung"
        rel="noreferrer noopener"
        target="_blank"
      >
        <StyledIcon iconName={githubIcon} />
      </a>
      <a
        href="https://twitter.com/nryoung1011"
        rel="noreferrer noopener"
        target="_blank"
      >
        <StyledIcon iconName={twitterIcon} />
      </a>
      <a href="mailto:nryoung@gmail.com">
        <StyledIcon iconName={emailIcon} />
      </a>
    </IconsContainer>
  </StyledNavigation>
);

export default Navigation;
