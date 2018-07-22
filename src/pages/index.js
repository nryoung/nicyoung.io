import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

import MainPageIcon from '../components/main-page-icon';
import blogIcon from '../images/blog-icon.svg';
import githubIcon from '../images/github-icon.svg';
import twitterIcon from '../images/twitter-icon.svg';
import emailIcon from '../images/email-icon.svg';
import * as colors from '../styles/colors';
import media from '../styles/media';

const StyledInfo = styled.div`
  opacity: 0;
  animation: fadein ease-in 1.5s forwards;
  animation-delay: 1.5s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledName = styled.div`
  font-size: 68px;
  ${media.screenSmallUp`
    font-size: 72px;
  `}
  color: ${colors.white};
`;

const StyledByline = styled.div`
  display: flex;
  justify-content: center;
  font-style: italic;
  color: ${colors.white};
  margin-bottom: 8px;
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

const MainPage = () => (
  <StyledInfo>
    <StyledName>Nic Young</StyledName>
    <StyledByline>Engineer, Developer and Drinker of Beer</StyledByline>
    <IconsContainer>
      <Link
        to="/blog"
      >
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
      <a
        href="mailto:nryoung@gmail.com"
      >
        <StyledIcon iconName={emailIcon} />
      </a>
    </IconsContainer>
  </StyledInfo>
);

export default MainPage;
