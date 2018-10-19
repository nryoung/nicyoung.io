import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import Navigation from '../components/navigation';
import * as colors from '../styles/colors';

const BlogBody = styled.div`
  margin: 230px 8px 0;
`;

const StyledLink = styled(Link)`
  position: relative;
  color: ${colors.black};
  font-size: 28px;
  text-decoration: none;
  margin-right: 16px;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${colors.black};
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;

const BlogIndex = ({ data }) => {
  const posts = get(data, 'allMarkdownRemark.edges');
  return (
    <div>
      <Helmet title={get(data, 'site.siteMetadata.title')} />
      <Navigation />
      <BlogBody>
        {posts.map((post) => (
          <div key={post.node.frontmatter.path}>
            <h3>
              <StyledLink to={post.node.frontmatter.path}>
                {post.node.frontmatter.title}
              </StyledLink>
            </h3>
            <small>{post.node.frontmatter.date}</small>
            <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
          </div>
        ))}
      </BlogBody>
    </div>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
