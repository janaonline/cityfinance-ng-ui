/**
 * SOURCE OF TRUTH for the CityFinance top nav bar, shared across UI, SSR, and
 * V2. Edit only here, then copy verbatim to:
 *   - cityfinance-ng-ui/src/app/shared/components/n-home-header/nav-menu.config.ts
 *   - cf-ui-ssr/src/app/shared/components/template/navbar/nav-menu.config.ts
 *
 * No app-specific imports (Angular, environment, USER_TYPE) — keeps this file
 * copy-paste safe. Full schema reference and worked examples: ./CLAUDE.md.
 */

export type NavRoleName =
  | 'USER'
  | 'ULB'
  | 'ADMIN'
  | 'MoHUA'
  | 'STATE'
  | 'XVIFC_STATE'
  | 'STATE_DASHBOARD'
  | 'XVIFC'
  | 'PARTNER'
  | 'PMU';

export type NavAppKey = 'ui' | 'ssr' | 'v2';
export type NavHostApp = NavAppKey | 'external';

export interface NavMenuVisibility {
  requiresAuth?: boolean;
  loggedOutOnly?: boolean;
  roles?: NavRoleName[]; // allow-list
  excludeRoles?: NavRoleName[]; // deny-list
  isHiddenInProd?: boolean;
  readonlyGated?: boolean; // + each repo's own isReadonlyUser()
  moduleAccess?: { moduleName: string; action: string }[]; // UI only
  ocrRouteOnly?: boolean; // V2 only
  showOnMobileOnly?: boolean; // UI only

  // Route-based gating, independent of role/auth. Before combining more than
  // one of these three fields on one item, see CLAUDE.md ("How the three
  // role/route dimensions actually combine") — they don't compose the way
  // you'd expect.
  showOnlyOnRoutePrefixes?: string[]; // allow-list
  hideOnRoutePrefixes?: string[]; // deny-list
  hideWhenRoleOnRoute?: { roles: NavRoleName[]; routePrefixes: string[] }; // AND of role + route
}

export interface NavMenuItem {
  id: string;
  order: number; // sparse (10, 20, 30…); sorts siblings, top-level or within a dropdown
  label?: string; // may contain inline HTML, e.g. '15<sup>th</sup> FC Grants'
  icon?: string; // Bootstrap Icons class or Material icon name
  imageUrl?: string; // renders an <img> in place of the label
  imageAlt?: string;

  hostApp?: NavHostApp;
  path?: string;
  absoluteHref?: string; // only when hostApp === 'external'
  target?: '_self' | '_blank';

  renderAs?: 'link' | 'button'; // default 'link'
  buttonVariant?: 'bootstrap' | 'material'; // default per-repo when renderAs === 'button'
  buttonClass?: string;
  size?: 'sm' | 'md' | 'lg';

  resolvedLink?: string; // computed per-repo in resolveLinks() — not authored here
  resolvedHref?: string;

  children?: NavMenuItem[]; // presence = renders as a dropdown

  groupId?: string; // shared groupId collapses into one dropdown once 2+ members are visible
  groupDefaultLabel?: string; // dropdown trigger label when no member is the "primary"
  isGroupPrimaryLabel?: boolean;

  // Active-route match root, if different from `path` — see CLAUDE.md, "activePathPrefix — why it exists".
  activePathPrefix?: string;

  // Computed by resolveMenus() — not authored here. Bind template "active"
  // state to this, not routerLinkActive — see CLAUDE.md, "Active-route highlighting".
  isActiveRoute?: boolean;

  apps: NavAppKey[]; // which repo(s) even consider this item
  visibility?: NavMenuVisibility; // omitted/empty = always visible (subject to `apps`)
}

export const NAV_MENU_ITEMS: NavMenuItem[] = [
  {
    id: 'home',
    order: 1,
    label: 'Home',
    hostApp: 'ui',
    path: '/home',
    apps: ['ui'],
    visibility: { showOnMobileOnly: true },
  },
  {
    id: 'brand-cfr-image',
    order: 5,
    imageUrl: './assets/M FIGMA/city-finance-ranking.png',
    imageAlt: 'City Finance Ranking',
    hostApp: 'ui',
    path: '/rankings/home',
    apps: ['ui'], // UI-only existing image nav item; demonstrates imageUrl
  },
  {
    id: 'dashboard',
    order: 10,
    label: 'Dashboard',
    apps: ['ui', 'ssr', 'v2'],
    children: [
      {
        id: 'dashboard.national-performance',
        order: 10,
        label: 'National Performance',
        hostApp: 'ssr',
        path: '/municipal-data/national',
        apps: ['ui', 'ssr', 'v2'],
      },
      {
        id: 'dashboard.own-revenue-performance',
        order: 20,
        label: 'Own Revenue Performance',
        hostApp: 'ui',
        path: '/own-revenue-dashboard',
        apps: ['ui', 'ssr', 'v2'],
      },
      {
        id: 'dashboard.slb-performance',
        order: 30,
        label: 'Service Level Benchmarks Performance',
        hostApp: 'ui',
        path: '/dashboard/slb',
        apps: ['ui', 'ssr', 'v2'],
      },
      {
        id: 'dashboard.municipal-bonds',
        order: 40,
        label: 'Municipal Bonds',
        hostApp: 'ui',
        path: '/municipal-bonds',
        apps: ['ui', 'ssr', 'v2'],
        visibility: { isHiddenInProd: true },
      },
      {
        id: 'dashboard.municipal-budgets',
        order: 50,
        label: 'Municipal Budgets',
        hostApp: 'ui',
        path: '/municipal-budgets',
        apps: ['ui', 'ssr', 'v2'],
        visibility: { isHiddenInProd: true },
      },
      {
        id: 'dashboard.market-readiness-assessment',
        order: 60,
        label: 'Market Readiness Assessment',
        hostApp: 'ssr',
        path: '/municipal-data/market-readiness',
        apps: ['ui', 'ssr', 'v2'], // known gap: no matching page in UI/V2 yet
      },
    ],
  },
  {
    id: 'resources',
    order: 20,
    label: 'Resources',
    hostApp: 'ui',
    path: '/resources-dashboard/data-sets/income_statement',
    apps: ['ui', 'ssr', 'v2'],
    // Hidden for these roles only inside the XVI FC flow — see CLAUDE.md, "NavMenuVisibility — every field, with a real example".
    visibility: {
      hideWhenRoleOnRoute: {
        roles: ['ULB', 'STATE', 'MoHUA', 'ADMIN', 'XVIFC_STATE', 'XVIFC'],
        routePrefixes: ['/xvifc', '/xvifc-form'],
      },
    },
  },
  {
    id: 'blog',
    order: 30,
    label: 'Blog',
    hostApp: 'external',
    target: '_blank',
    apps: ['ui', 'ssr', 'v2'], // absoluteHref omitted — each repo resolves from its own environment.blogUrl
    visibility: {
      // Same rule as Resources above.
      hideWhenRoleOnRoute: {
        roles: ['ULB', 'STATE', 'MoHUA', 'ADMIN', 'XVIFC_STATE', 'XVIFC'],
        routePrefixes: ['/xvifc', '/xvifc-form'],
      },
    },
  },
  {
    id: 'fc-15th-grants',
    order: 40,
    label: '15<sup>th</sup> FC Grants',
    hostApp: 'ui',
    path: '/fc-home-page',
    apps: ['ui', 'ssr', 'v2'],
    groupId: 'ulb-forms',
    groupDefaultLabel: 'My Forms',
    visibility: {
      requiresAuth: true,
      excludeRoles: ['PMU', 'STATE_DASHBOARD', 'XVIFC_STATE'],
    },
  },
  {
    id: 'fc-16th-grant',
    order: 35, // lowest among 'ulb-forms' siblings, sorts first — see CLAUDE.md, "Grouping — the My Forms dropdown"
    label: '16<sup>th</sup> FC Grants',
    hostApp: 'v2',
    path: '/xvifc/year',
    apps: ['ui', 'ssr', 'v2'],
    groupId: 'ulb-forms',
    groupDefaultLabel: 'My Forms',
    activePathPrefix: '/xvifc', // '/xvifc/year' is just the entry point into the whole module
    visibility: { requiresAuth: true, roles: ['ULB', 'STATE', 'MoHUA', 'ADMIN'] },
  },
  {
    id: 'xvi-fc-data-collection',
    order: 50,
    label: 'XVI FC Data Collection',
    hostApp: 'v2',
    path: '/xvifc-form',
    apps: ['ui', 'ssr', 'v2'],
    groupId: 'ulb-forms',
    groupDefaultLabel: 'My Forms',
    visibility: { requiresAuth: true, roles: ['ULB'] },
  },
  {
    id: 'state-dashboard',
    order: 60,
    label: 'State Dashboard',
    hostApp: 'ui',
    path: '/state-dashboard',
    apps: ['ui', 'ssr', 'v2'],
    visibility: { requiresAuth: true, roles: ['STATE_DASHBOARD', 'STATE'] },
  },
  {
    id: 'review-xvi-fc',
    order: 70,
    label: 'Review XVI FC',
    hostApp: 'v2',
    path: '/admin/xvi-fc-review',
    apps: ['ui', 'ssr', 'v2'],
    visibility: { requiresAuth: true, roles: ['XVIFC', 'XVIFC_STATE'] },
  },
  {
    id: 'rankings-22-form',
    order: 80,
    label: "Rankings'22 Form",
    hostApp: 'ui',
    path: '/rankings/ulb-form',
    apps: ['ui', 'ssr', 'v2'],
    groupId: 'ulb-forms',
    groupDefaultLabel: 'My Forms',
    visibility: { requiresAuth: true, readonlyGated: true, roles: ['ULB'] },
  },
  {
    id: 'rankings-22-dashboard',
    order: 81,
    label: "Rankings'22 Dashboard",
    hostApp: 'ui',
    path: '/rankings/review-rankings-ulbform',
    apps: ['ui'],
    visibility: { requiresAuth: true, readonlyGated: true, excludeRoles: ['ULB', 'STATE_DASHBOARD'] },
  },
  {
    id: 'users',
    order: 90,
    label: 'Users',
    hostApp: 'ui',
    path: '/user/list/ULB',
    apps: ['ui', 'ssr'], // V2 deferred — needs a net-new isReadonlyUser() there
    visibility: {
      requiresAuth: true,
      excludeRoles: ['PMU'],
      readonlyGated: true,
      moduleAccess: [
        { moduleName: 'USERLIST', action: 'VIEW' },
        { moduleName: 'ULB_SIGNUP_REQUEST', action: 'VIEW' },
      ],
    },
  },
  {
    id: 'ocr',
    order: 100,
    label: 'OCR',
    apps: ['v2'],
    visibility: { ocrRouteOnly: true },
    children: [
      {
        id: 'ocr.job-details',
        order: 10,
        label: 'Job Details',
        hostApp: 'v2',
        path: '/ocr/details',
        apps: ['v2'],
      },
      {
        id: 'ocr.validation',
        order: 20,
        label: 'Validation',
        hostApp: 'v2',
        path: '/ocr/validation',
        apps: ['v2'],
      },
      {
        id: 'ocr.validation-list',
        order: 30,
        label: 'Validation List',
        hostApp: 'v2',
        path: '/ocr/validation-list',
        apps: ['v2'],
      },
      {
        id: 'ocr.eval-benchmarks',
        order: 40,
        label: 'Eval Benchmarks',
        hostApp: 'v2',
        path: '/ocr/eval-benchmarks',
        apps: ['v2'],
      },
      {
        id: 'ocr.eval-run-compare',
        order: 50,
        label: 'Compare Runs',
        hostApp: 'v2',
        path: '/ocr/eval-run-compare',
        apps: ['v2'],
      },
    ],
  },
];

/** Boundary-safe route-prefix match (`/xvifc` matches `/xvifc/year`, never `/xvifc-form`). See CLAUDE.md, "Boundary-safe route matching". */
export function matchesAnyRoutePrefix(url: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => url === prefix || url.startsWith(prefix + '/'));
}

/**
 * Pure, repo-agnostic resolution: filter → sort/group → stamp active state.
 * `isVisible` must already capture app + role/env/access; `isActiveGroupChild`
 * (optional) marks the current route's group member, driving both a group's
 * trigger label and every item's `isActiveRoute`. Link resolution stays
 * per-repo. Full pipeline: CLAUDE.md, "Resolution pipeline".
 */
export function resolveMenus(
  items: NavMenuItem[],
  isVisible: (item: NavMenuItem) => boolean,
  isActiveGroupChild?: (item: NavMenuItem) => boolean,
): NavMenuItem[] {
  const resolved = groupAndSort(filterVisible(items, isVisible), isActiveGroupChild);
  return isActiveGroupChild ? resolved.map((item) => stampActive(item, isActiveGroupChild)) : resolved;
}

/** Stamps `isActiveRoute` on `item` and every descendant; a parent is active if any child is. */
function stampActive(
  item: NavMenuItem,
  isActiveRoute: (item: NavMenuItem) => boolean,
): NavMenuItem {
  const children = item.children?.map((child) => stampActive(child, isActiveRoute));
  return {
    ...item,
    ...(children ? { children } : null),
    isActiveRoute: isActiveRoute(item) || (children?.some((c) => c.isActiveRoute) ?? false),
  };
}

function filterVisible(
  items: NavMenuItem[],
  isVisible: (item: NavMenuItem) => boolean,
): NavMenuItem[] {
  return items
    .filter(isVisible)
    .map((item) =>
      item.children?.length ? { ...item, children: filterVisible(item.children, isVisible) } : item,
    )
    .filter((item) => !item.children || item.children.length > 0);
}

function groupAndSort(
  items: NavMenuItem[],
  isActiveGroupChild?: (item: NavMenuItem) => boolean,
): NavMenuItem[] {
  const groups = new Map<string, NavMenuItem[]>();
  for (const item of items) {
    if (!item.groupId) continue;
    const bucket = groups.get(item.groupId);
    if (bucket) bucket.push(item);
    else groups.set(item.groupId, [item]);
  }

  const consumed = new Set<string>();
  const result: NavMenuItem[] = [];

  for (const item of items) {
    if (!item.groupId) {
      result.push(item);
      continue;
    }
    if (consumed.has(item.groupId)) continue;
    consumed.add(item.groupId);

    const groupItems = (groups.get(item.groupId) ?? [item]).sort((a, b) => a.order - b.order);
    if (groupItems.length < 2) {
      result.push(groupItems[0]);
      continue;
    }

    // Trigger label priority: active member > primary member > groupDefaultLabel > 'More'.
    const activeChild = isActiveGroupChild ? groupItems.find(isActiveGroupChild) : undefined;
    const primary = groupItems.find((g) => g.isGroupPrimaryLabel);
    result.push({
      id: `group.${item.groupId}`,
      order: Math.min(...groupItems.map((g) => g.order)),
      label: activeChild?.label ?? primary?.label ?? groupItems[0].groupDefaultLabel ?? 'More',
      apps: item.apps,
      children: groupItems,
    });
  }

  return result.sort((a, b) => a.order - b.order);
}
