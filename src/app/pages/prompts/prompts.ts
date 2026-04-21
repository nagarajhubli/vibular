import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

interface PromptEntry {
  step: number;
  tag: 'scaffold' | 'feature' | 'polish' | 'fix' | 'review';
  text: string;
  outcome: string;
}

@Component({
  selector: 'app-prompts',
  imports: [MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './prompts.html',
  styleUrl: './prompts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Prompts {
  entries: PromptEntry[] = [
    {
      step: 1,
      tag: 'scaffold',
      text: 'bootstrap latest version of angular project in this folder, and add angular material library as a dependency, will be customizing the material library later',
      outcome: 'Scaffolded Angular 21 with `npx @angular/cli@latest new` and added Angular Material 21 via `ng add @angular/material` with the Azure/Blue M3 palette.',
    },
    {
      step: 2,
      tag: 'scaffold',
      text: 'Detect my project\'s dev servers and save all their configurations to .claude/launch.json, then ask which ones to start.',
      outcome: 'Wrote `.claude/launch.json` with Angular Dev Server (port 4200) and Vitest (port 51204) configs.',
    },
    {
      step: 3,
      tag: 'scaffold',
      text: 'angular dev server',
      outcome: 'Started the Angular dev server on port 4200.',
    },
    {
      step: 4,
      tag: 'feature',
      text: 'let\'s create a home and about pages',
      outcome: 'Generated `Home` and `About` standalone components with router configuration and a sticky Material toolbar with brand + nav links.',
    },
    {
      step: 5,
      tag: 'feature',
      text: 'In the about page add documentation about how this site was created and what frameworks were used',
      outcome: 'Populated About with a `mat-list` "How It Was Created" section and a grid of framework cards (Angular 21, Material 21, TypeScript, SCSS, Vitest).',
    },
    {
      step: 6,
      tag: 'polish',
      text: 'add some padding to the body section of the pages and make them more prettier',
      outcome: 'Centered the app content with max-width 1200px + 2.5rem padding; added a gradient hero on Home and hover-lift feature cards.',
    },
    {
      step: 7,
      tag: 'feature',
      text: 'create another page called components, and add demos for all components of angular material library',
      outcome: 'Built the Components gallery with 26 live demos wrapped in a reusable `DemoBlock` component.',
    },
    {
      step: 8,
      tag: 'feature',
      text: 'for each of the demo in the components page, provide an option for user to copy the code for the respective component, so they can use it like a styleguide',
      outcome: 'Added a "Copy" button and a toggleable code view per demo, driven by a `SNIPPETS` dictionary.',
    },
    {
      step: 9,
      tag: 'feature',
      text: 'syntax highlight the code which is shown when user clicks on show code button',
      outcome: 'Integrated highlight.js core with typescript + xml languages and the github-dark theme; language picked automatically from snippet content.',
    },
    {
      step: 10,
      tag: 'feature',
      text: 'add a footer stating this site was vibe coded with love by Nagaraj & Claude',
      outcome: 'Added a centered footer with a pink heart Material icon below the router outlet.',
    },
    {
      step: 11,
      tag: 'feature',
      text: 'add a theme switcher, and introduce 2 new themes, use pastel colors and make them look pleasing',
      outcome: 'Added a palette menu to the toolbar with Azure Sky / Rose Petal / Mint Breeze themes, each scoped via `mat.theme()` on an `html.theme-*` class and persisted in localStorage.',
    },
    {
      step: 12,
      tag: 'fix',
      text: 'the theme switcher icon color contrast is not matching with the toolbar background color, please fix it',
      outcome: 'Forced icon buttons inside the toolbar to use `--mat-sys-on-primary` for icon + ripple color.',
    },
    {
      step: 13,
      tag: 'polish',
      text: 'customize the angular material form element components like input and select to be of less height, may be 32px would be good? or what do you suggest?',
      outcome: 'Applied `density: -3` across all themes — ~44px form fields, compact but still meeting touch-target guidance.',
    },
    {
      step: 14,
      tag: 'polish',
      text: 'can we add some spacing between the menu items in toolbar',
      outcome: 'Added `gap: 0.5rem` on `.app-toolbar` for breathing room between nav items and the theme picker.',
    },
    {
      step: 15,
      tag: 'review',
      text: 'review the entire project\'s source code and see if it can be optimized or refined to ensure best standards are followed',
      outcome: 'Lazy-loaded all routes, added OnPush to every component, fixed an autocomplete subscription leak with `takeUntilDestroyed`, modernized `DemoBlock` to the `input()` signal API, typed the table sort, and deduped SCSS. Initial bundle dropped from ~136 kB to ~14 kB.',
    },
    {
      step: 16,
      tag: 'feature',
      text: 'add page titled prompts, and document all the prompts that were used in building this site',
      outcome: 'You\'re looking at it.',
    },
    {
      step: 17,
      tag: 'polish',
      text: 'let\'s use montserrat font',
      outcome: 'Swapped Roboto for Montserrat via Google Fonts + `mat.theme()` typography.',
    },
    {
      step: 18,
      tag: 'polish',
      text: 'let\'s use lato font for body text, and montserrat for headings',
      outcome: 'Split the font stack using Material 3\'s `plain-family` (Lato) and `brand-family` (Montserrat) typography map — headings read display, body reads humanist.',
    },
    {
      step: 19,
      tag: 'feature',
      text: 'let\'s rename the site from myapp, to something like "angular vibe" or something more sneaky',
      outcome: 'Renamed to <strong>Vibular</strong> across toolbar brand, home hero, and browser title.',
    },
    {
      step: 20,
      tag: 'polish',
      text: 'let\'s make the text in home and about pages bit sneaky and witty, and also explain why the name "Vibular"',
      outcome: 'Rewrote the hero tagline, feature cards, and framework blurbs with a lighter voice, and added a "Why Vibular?" section to the About page explaining the Vibe + Angular etymology.',
    },
    {
      step: 21,
      tag: 'feature',
      text: 'can we make this as a progressive web app, so that when user visits this site in mobile browser and adds to home screen, they see a proper logo, and upon relaunching from home screen it opens as a app without address bar',
      outcome: 'Installed `@angular/pwa`: manifest with `display: standalone`, service worker (prod-only), theme-color + apple-touch-icon meta tags, 8 icon sizes.',
    },
    {
      step: 22,
      tag: 'feature',
      text: 'Instead of the Angular A icon, can we use the rocket icon from the header?',
      outcome: 'Generated all 8 PWA icons from the Material `rocket_launch` SVG on a blue gradient via a reusable `scripts/generate-icons.mjs` sharp pipeline.',
    },
    {
      step: 23,
      tag: 'fix',
      text: 'is the fav icon updated as well? as I still see the angular A icon',
      outcome: 'Replaced the default <code>favicon.ico</code> with a rocket <code>favicon.png</code> generated from the same SVG, and updated the <code>&lt;link rel="icon"&gt;</code> accordingly.',
    },
    {
      step: 24,
      tag: 'feature',
      text: 'can we update the prompts page to include all the prompts that were asked since the page was created?',
      outcome: 'Self-referential bookkeeping: added entries 17–24 so the timeline catches its own tail.',
    },
  ];
}
