export type CrosswordTheme = 'all' | 'html' | 'css' | 'js' | 'react' | 'tools';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CrosswordWord {
  word: string;
  row: number;
  col: number;
  dir: 'across' | 'down';
  num: number;
  clue: string;
}

export interface Puzzle {
  grid: string[];
  words: CrosswordWord[];
}

export const THEMES: { id: CrosswordTheme; label: string }[] = [
  { id: 'all', label: 'All topics' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'js', label: 'JavaScript' },
  { id: 'react', label: 'React' },
  { id: 'tools', label: 'Dev tools' },
];

export const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
];

export const WIN_MSGS = [
  '// all tests passed',
  '// merged to main',
  '// 100% coverage',
  '// ship it!',
  '// no console.log left behind',
];

export const PUZZLES: Record<CrosswordTheme, Record<Difficulty, Puzzle>> = {
  all: {
    easy: {
      grid: ['DOM__', 'I____', 'VAR__', '_____', '__SRC'],
      words: [
        { word: 'DOM', row: 0, col: 0, dir: 'across', num: 1, clue: "The browser's document object — front-end's playground" },
        { word: 'DIV', row: 0, col: 0, dir: 'down', num: 1, clue: 'The most used HTML container element' },
        { word: 'VAR', row: 2, col: 0, dir: 'across', num: 2, clue: 'Old-school JS variable keyword (avoid these days)' },
        { word: 'SRC', row: 4, col: 2, dir: 'across', num: 3, clue: "Attribute that points to a file's location" },
      ],
    },
    medium: {
      grid: ['FETCH__', 'L_GRID_', 'E______', 'X______', 'PROMISE', '_______', '__MODAL'],
      words: [
        { word: 'FETCH', row: 0, col: 0, dir: 'across', num: 1, clue: 'Modern browser API for making HTTP requests' },
        { word: 'FLEX', row: 0, col: 0, dir: 'down', num: 1, clue: 'CSS display value for one-dimensional layout' },
        { word: 'GRID', row: 1, col: 2, dir: 'across', num: 2, clue: 'CSS display value for two-dimensional layout' },
        { word: 'PROMISE', row: 4, col: 0, dir: 'across', num: 3, clue: 'JS object representing an eventual async value' },
        { word: 'MODAL', row: 6, col: 2, dir: 'across', num: 4, clue: 'Overlay UI that blocks interaction with the page' },
      ],
    },
    hard: {
      grid: [
        'MUTATIONS__',
        '__R________',
        '__E________',
        '__E________',
        '__S________',
        '__HYDRATION',
        '__A________',
        '__K________',
        '__I________',
        '__N________',
        '__G________',
      ],
      words: [
        { word: 'MUTATIONS', row: 0, col: 0, dir: 'across', num: 1, clue: 'Direct state changes to be avoided in functional React' },
        { word: 'TREESHAKING', row: 0, col: 2, dir: 'down', num: 2, clue: 'Build-time removal of unused JS code' },
        { word: 'HYDRATION', row: 5, col: 2, dir: 'across', num: 3, clue: 'Attaching React event handlers to server-rendered HTML' },
      ],
    },
  },
  css: {
    easy: {
      grid: ['COLOR', 'L____', 'A_REM', 'M____', 'PIVOT'],
      words: [
        { word: 'COLOR', row: 0, col: 0, dir: 'across', num: 1, clue: 'CSS property for text color' },
        { word: 'CLAMP', row: 0, col: 0, dir: 'down', num: 1, clue: 'CSS function that constrains a value between min and max' },
        { word: 'REM', row: 2, col: 2, dir: 'across', num: 2, clue: 'CSS unit relative to the root font size' },
        { word: 'PIVOT', row: 4, col: 0, dir: 'across', num: 3, clue: 'transform-origin sets this point for CSS transforms' },
      ],
    },
    medium: {
      grid: ['FLEXBOX_', 'L_______', 'OPACITY_', 'A_______', 'T_______', 'VIEWPORT'],
      words: [
        { word: 'FLEXBOX', row: 0, col: 0, dir: 'across', num: 1, clue: 'CSS layout module for flexible one-dimensional arrangement' },
        { word: 'FLOAT', row: 0, col: 0, dir: 'down', num: 1, clue: 'CSS property that makes elements flow beside text' },
        { word: 'OPACITY', row: 2, col: 0, dir: 'across', num: 2, clue: 'CSS property controlling element transparency (0–1)' },
        { word: 'VIEWPORT', row: 5, col: 0, dir: 'across', num: 3, clue: 'Visible area of the browser window' },
      ],
    },
    hard: {
      grid: ['SPECIFICITY', '_P_________', 'KEYFRAMES__', '_E_________', '_D_________', '_O_________'],
      words: [
        { word: 'SPECIFICITY', row: 0, col: 0, dir: 'across', num: 1, clue: 'CSS cascade rule that determines which declaration wins' },
        { word: 'PSEUDO', row: 0, col: 1, dir: 'down', num: 2, clue: '___ -class like :hover or :focus targeting element states' },
        { word: 'KEYFRAMES', row: 2, col: 0, dir: 'across', num: 3, clue: 'CSS @rule defining the steps of an animation' },
      ],
    },
  },
  html: {
    easy: {
      grid: ['FORM__', 'I_____', 'GMETA_', 'U_____', 'RULE__', 'E_____'],
      words: [
        { word: 'FORM', row: 0, col: 0, dir: 'across', num: 1, clue: 'HTML element that wraps user input fields' },
        { word: 'FIGURE', row: 0, col: 0, dir: 'down', num: 1, clue: 'Semantic HTML element for self-contained media' },
        { word: 'META', row: 2, col: 1, dir: 'across', num: 2, clue: 'HTML tag for page metadata like charset or viewport' },
        { word: 'RULE', row: 4, col: 0, dir: 'across', num: 3, clue: 'Horizontal ___ — the <hr> element' },
      ],
    },
    medium: {
      grid: ['SEMANTIC', '________', 'C_______', 'A_______', 'NOSCRIPT', 'V_______', 'A_______', 'S_______'],
      words: [
        { word: 'SEMANTIC', row: 0, col: 0, dir: 'across', num: 1, clue: 'HTML that describes meaning, not just appearance' },
        { word: 'CANVAS', row: 2, col: 0, dir: 'down', num: 2, clue: 'HTML element for drawing 2D/3D graphics with JS' },
        { word: 'NOSCRIPT', row: 4, col: 0, dir: 'across', num: 3, clue: 'HTML tag shown when JS is disabled in the browser' },
      ],
    },
    hard: {
      grid: ['ACCESSIBILITY', 'S____________', 'I____________', 'DATALIST_____', 'E____________'],
      words: [
        { word: 'ACCESSIBILITY', row: 0, col: 0, dir: 'across', num: 1, clue: 'Practice of making web content usable for everyone' },
        { word: 'ASIDE', row: 0, col: 0, dir: 'down', num: 1, clue: 'Semantic HTML element for tangentially related content' },
        { word: 'DATALIST', row: 3, col: 0, dir: 'across', num: 2, clue: 'HTML element providing autocomplete suggestions for inputs' },
      ],
    },
  },
  js: {
    easy: {
      grid: ['VAR_LET', 'O______', 'I__MAP_', 'D______'],
      words: [
        { word: 'VAR', row: 0, col: 0, dir: 'across', num: 1, clue: 'Old-school JS variable declaration' },
        { word: 'VOID', row: 0, col: 0, dir: 'down', num: 1, clue: 'JS operator that returns undefined' },
        { word: 'LET', row: 0, col: 4, dir: 'across', num: 2, clue: 'Block-scoped variable declaration keyword' },
        { word: 'MAP', row: 2, col: 3, dir: 'across', num: 3, clue: 'Array method that transforms each element' },
      ],
    },
    medium: {
      grid: ['CLOSURE_', 'A_______', 'L_______', 'L_______', 'B_______', 'A_______', 'C_______', 'K_______', 'PROMISE_'],
      words: [
        { word: 'CLOSURE', row: 0, col: 0, dir: 'across', num: 1, clue: 'Function that retains access to its outer scope' },
        { word: 'CALLBACK', row: 0, col: 0, dir: 'down', num: 1, clue: 'Function passed as argument to be invoked later' },
        { word: 'PROMISE', row: 8, col: 0, dir: 'across', num: 2, clue: 'JS object representing an eventual async value' },
      ],
    },
    hard: {
      grid: ['PROTOTYPE', '_______R_', '_______O_', '_______X_', '_______Y_', 'GENERATOR'],
      words: [
        { word: 'PROTOTYPE', row: 0, col: 0, dir: 'across', num: 1, clue: 'JS inheritance mechanism — every object has one' },
        { word: 'PROXY', row: 0, col: 7, dir: 'down', num: 2, clue: 'JS object that intercepts and redefines operations' },
        { word: 'GENERATOR', row: 5, col: 0, dir: 'across', num: 3, clue: 'Function that can pause and resume using yield' },
      ],
    },
  },
  react: {
    easy: {
      grid: ['HOOK__', 'Y_____', 'D_PROP', 'R_____', 'A__KEY', 'T_____', 'E_____'],
      words: [
        { word: 'HOOK', row: 0, col: 0, dir: 'across', num: 1, clue: "React function starting with 'use' (e.g. useState)" },
        { word: 'HYDRATE', row: 0, col: 0, dir: 'down', num: 1, clue: 'To attach React to server-rendered HTML' },
        { word: 'PROP', row: 2, col: 2, dir: 'across', num: 2, clue: 'Data passed from a parent to a child component' },
        { word: 'KEY', row: 4, col: 3, dir: 'across', num: 3, clue: 'Required React attribute when rendering lists' },
      ],
    },
    medium: {
      grid: ['USESTATE_', '_________', 'USEMEMO__', 'S________', 'E________', 'E________', 'F________', 'F________', 'E________', 'C________', 'T________'],
      words: [
        { word: 'USESTATE', row: 0, col: 0, dir: 'across', num: 1, clue: 'React hook for managing local component state' },
        { word: 'USEMEMO', row: 2, col: 0, dir: 'across', num: 2, clue: 'React hook to memoize expensive computed values' },
        { word: 'USEEFFECT', row: 2, col: 0, dir: 'down', num: 2, clue: 'React hook for running side effects after render' },
      ],
    },
    hard: {
      grid: ['RECONCILIATION', 'E_____________', 'N_____________', 'D_____________', 'E_____________', 'R_____________', 'SUSPENSE______', '______________', 'CONCURRENT____'],
      words: [
        { word: 'RECONCILIATION', row: 0, col: 0, dir: 'across', num: 1, clue: "React's process of diffing and updating the DOM" },
        { word: 'RENDER', row: 0, col: 0, dir: 'down', num: 1, clue: 'The process of React producing UI output from components' },
        { word: 'SUSPENSE', row: 6, col: 0, dir: 'across', num: 2, clue: 'React component that shows a fallback while content loads' },
        { word: 'CONCURRENT', row: 8, col: 0, dir: 'across', num: 3, clue: 'React rendering mode enabling interruptible updates' },
      ],
    },
  },
  tools: {
    easy: {
      grid: ['GIT__', 'U_NPM', 'L____', 'PNPM_'],
      words: [
        { word: 'GIT', row: 0, col: 0, dir: 'across', num: 1, clue: 'Version control system every dev uses' },
        { word: 'GULP', row: 0, col: 0, dir: 'down', num: 1, clue: 'JS task runner for automating build workflows' },
        { word: 'NPM', row: 1, col: 2, dir: 'across', num: 2, clue: 'Node package manager — npm install' },
        { word: 'PNPM', row: 3, col: 0, dir: 'across', num: 3, clue: 'Fast, disk-efficient alternative package manager to npm' },
      ],
    },
    medium: {
      grid: ['WEBPACK_', 'A_A_____', 'T_B_____', 'C_E_____', 'H_L_____', 'PRETTIER'],
      words: [
        { word: 'WEBPACK', row: 0, col: 0, dir: 'across', num: 1, clue: 'Module bundler that processes JS and assets' },
        { word: 'WATCH', row: 0, col: 0, dir: 'down', num: 1, clue: 'Build mode that rebuilds on file changes' },
        { word: 'BABEL', row: 0, col: 2, dir: 'down', num: 2, clue: 'JS transpiler converting modern code for older browsers' },
        { word: 'PRETTIER', row: 5, col: 0, dir: 'across', num: 3, clue: 'Opinionated code formatter for consistent style' },
      ],
    },
    hard: {
      grid: ['LIGHTHOUSE_', 'I__________', 'N__________', 'TREESHAKING', 'E__________', 'R__________', '_SOURCEMAP_'],
      words: [
        { word: 'LIGHTHOUSE', row: 0, col: 0, dir: 'across', num: 1, clue: 'Chrome DevTools audit tool for performance and a11y' },
        { word: 'LINTER', row: 0, col: 0, dir: 'down', num: 1, clue: 'Tool that statically analyzes code for errors and style' },
        { word: 'TREESHAKING', row: 3, col: 0, dir: 'across', num: 2, clue: 'Dead code elimination during the JS bundling process' },
        { word: 'SOURCEMAP', row: 6, col: 1, dir: 'across', num: 3, clue: 'File mapping minified code back to its original source' },
      ],
    },
  },
};
