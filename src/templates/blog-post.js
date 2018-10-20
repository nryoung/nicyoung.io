import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import get from 'lodash/get';

import Navigation from '../components/navigation';

const Page = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const BlogBody = styled.div`
  margin: 230px 8px 0;
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');

    return (
      <Page>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <Navigation />
        <BlogBody>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr />
        </BlogBody>
      </Page>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
