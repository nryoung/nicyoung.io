import { css } from 'styled-components';

const breakpoints = [
  {
    name: 'screenExtraLarge',
    value: 1799,
  },
  {
    name: 'screenLarge',
    value: 1199,
  },
  {
    name: 'screenMedium',
    value: 899,
  },
  {
    name: 'screenSmall',
    value: 599,
  },
];

const max = (breakpoint, compiledCss) => css`
  @media (max-width: ${breakpoint - 1}px) {
    ${compiledCss};
  }
`;

const min = (breakpoint, compiledCss) => css`
  @media (min-width: ${breakpoint}px) {
    ${compiledCss};
  }
`;

const breakpointsReducer = (media, { name, value }) =>
  Object.assign(media, {
    [`${name}Down`]: (...args) => max(value, css(...args)),
    [`${name}Up`]: (...args) => min(value, css(...args)),
  });

export default {
  ...breakpoints.reduce(breakpointsReducer, {}),
};
