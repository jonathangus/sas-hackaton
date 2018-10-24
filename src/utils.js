import t from './locale';

// Fix for pageres
export const isScreenshotPage = () =>
  typeof window !== 'undefined' && window.location.search === '?screenshot';

export const getTitleFromProblem = problem =>
  `${problem.text} - ${t('meta.title')}`;

export const getDescriptionFromProblem = problem =>
  'Are you brace enough to share your thoughts?';

export const b = (breakpoint, value) => `@media (max-width: ${breakpoint}px) {
   ${value}
  }`;
