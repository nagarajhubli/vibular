export interface Command {
  id: string;
  label: string;
  hint?: string;
  path: string;
  group: 'Pages' | 'Components';
  icon: string;
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const demoTitles = [
  'Buttons',
  'Button Toggle',
  'Badge',
  'Icon',
  'Progress Indicators',
  'Ripple',
  'Form Field & Input',
  'Select',
  'Autocomplete',
  'Checkbox & Radio',
  'Slide Toggle & Slider',
  'Datepicker',
  'Chips',
  'Card',
  'Tabs',
  'Expansion Panel',
  'Stepper',
  'List',
  'Grid List',
  'Tree',
  'Toolbar',
  'Menu',
  'Sidenav',
  'Tooltip',
  'Dialog, Snackbar & Bottom Sheet',
  'Table with Sort & Paginator',
];

export const COMMANDS: Command[] = [
  { id: 'home', label: 'Home', path: '/home', group: 'Pages', icon: 'home' },
  { id: 'components', label: 'Components', path: '/components', group: 'Pages', icon: 'widgets' },
  { id: 'prompts', label: 'Prompts', path: '/prompts', group: 'Pages', icon: 'forum' },
  { id: 'about', label: 'About', path: '/about', group: 'Pages', icon: 'info' },
  { id: 'playground', label: 'Playground', path: '/playground', group: 'Pages', icon: 'tune' },
  { id: 'stats', label: 'Stats', path: '/stats', group: 'Pages', icon: 'insights' },
  { id: 'changelog', label: 'Changelog', path: '/changelog', group: 'Pages', icon: 'history' },
  ...demoTitles.map<Command>((t) => ({
    id: slug(t),
    label: t,
    hint: 'Components demo',
    path: `/components#${slug(t)}`,
    group: 'Components',
    icon: 'view_module',
  })),
];
