/**
 * SOURCE OF TRUTH for the CityFinance top nav bar, shared across the UI, SSR,
 * and V2 apps. Edit only here (cityfinance-ng-ui-v2), then copy this file
 * verbatim to:
 *   - cityfinance-ng-ui/src/app/shared/components/n-home-header/nav-menu.config.ts
 *   - cf-ui-ssr/src/app/shared/components/template/navbar/nav-menu.config.ts
 *
 * This file has NO imports from app-specific code (no USER_TYPE enum, no
 * Angular, no environment) so it is byte-for-byte copyable into all three
 * repos. Each repo's own navbar component supplies:
 *   - which app it is ('ui' | 'ssr' | 'v2'), to filter `apps`
 *   - its own visibility checks (roles, env, AccessChecker, readonly-allowlist, etc.)
 *   - its own resolveLinks(), turning hostApp/path into a concrete
 *     routerLink or href using THAT repo's own environment base-urls
 *     (e.g. environment.ui.urlV1/urlV2 in UI/V2, environment.v1Url/v2Url in SSR)
 *
 * Last synced: 2026-08-25
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
  nonProdOnly?: boolean;
  readonlyGated?: boolean; // additionally subject to each repo's own isReadonlyUser()
  moduleAccess?: { moduleName: string; action: string }[]; // UI only today
  ocrRouteOnly?: boolean; // V2 only
  showOnMobileOnly?: boolean; // UI only
}

export interface NavMenuItem {
  id: string;
  order: number; // sparse (10, 20, 30…); sorts BOTH top-level and each dropdown's children
  label?: string; // may contain inline HTML, e.g. '15<sup>th</sup> FC Grants'
  icon?: string; // e.g. 'bi bi-rocket-takeoff-fill' or 'material-icons:login'
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

  // Populated by each repo's own resolveLinks(), NOT authored here: hostApp/path
  // is the portable source data, resolvedLink/resolvedHref is what a given repo's
  // template actually binds to ([routerLink] vs [attr.href]).
  resolvedLink?: string;
  resolvedHref?: string;

  children?: NavMenuItem[]; // presence = render as a dropdown

  groupId?: string; // items sharing a groupId collapse into one dropdown when 2+ are visible
  groupDefaultLabel?: string; // dropdown trigger label when no visible item is the "primary"
  isGroupPrimaryLabel?: boolean; // this item's own label becomes the trigger label when visible

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
    // UI-only for now: this is UI's existing image-nav-item today; folding a
    // brand-new visual element into SSR/V2 (which only have the plain text
    // "city finance" logo outside the menu array) wasn't asked for — this
    // item exists here to demonstrate/reuse the imageUrl capability.
    apps: ['ui'],
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
        visibility: { nonProdOnly: true },
      },
      {
        id: 'dashboard.municipal-budgets',
        order: 50,
        label: 'Municipal Budgets',
        hostApp: 'ui',
        path: '/municipal-budgets',
        apps: ['ui', 'ssr', 'v2'],
        visibility: { nonProdOnly: true },
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
  },
  {
    id: 'blog',
    order: 30,
    label: 'Blog',
    hostApp: 'external',
    target: '_blank',
    apps: ['ui', 'ssr', 'v2'],
    // absoluteHref intentionally omitted — each repo resolves this from its
    // own `environment.blogUrl`, same as SSR already does today.
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
    apps: ['ui'], // SSR/V2 addition deferred — needs a Form/Dashboard role-split not yet built there
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
    // excludeRoles carries BOTH exclusions from UI's original nested guard
    // (outer: `role !== STATE_DASHBOARD`, inner else-branch: ULB gets the
    // Form variant instead) — STATE_DASHBOARD must see neither Rankings item.
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

/**
 * Pure, repo-agnostic resolution: recursively drops items `isVisible` rejects
 * (including nested children, e.g. a prod-gated Dashboard child, without
 * dropping the Dashboard parent itself if other children remain), then sorts
 * by `order` and collapses any `groupId` cluster into ONE dropdown when 2+ of
 * its items are visible (a lone visible item in a group renders flat).
 *
 * `isVisible` should already capture BOTH which app you are (item.apps.includes(self))
 * AND your repo's own role/env/access checks — this function knows about neither.
 * Link resolution (routerLink vs href) is NOT done here — that stays per-repo.
 */
export function resolveMenus(
  items: NavMenuItem[],
  isVisible: (item: NavMenuItem) => boolean,
): NavMenuItem[] {
  return groupAndSort(filterVisible(items, isVisible));
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

function groupAndSort(items: NavMenuItem[]): NavMenuItem[] {
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

    const primary = groupItems.find((g) => g.isGroupPrimaryLabel);
    result.push({
      id: `group.${item.groupId}`,
      order: Math.min(...groupItems.map((g) => g.order)),
      label: primary?.label ?? groupItems[0].groupDefaultLabel ?? 'More',
      apps: item.apps,
      children: groupItems,
    });
  }

  return result.sort((a, b) => a.order - b.order);
}
