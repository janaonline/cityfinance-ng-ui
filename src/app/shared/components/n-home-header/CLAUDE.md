# Shared Nav Bar Config

## Purpose

One data file — `nav-menu.config.ts` — describes every top-nav item (order, label, icon, destination, and who can see it) for **all three CityFinance frontends**: `cityfinance-ng-ui` ("UI"), `cf-ui-ssr` ("SSR"), and `cityfinance-ng-ui-v2` ("V2"). Each app renders its own template from this same data instead of hand-writing `<li>`s, so a nav change is one edit instead of three, and the three apps can no longer silently drift apart on what's shown to which role.

Today `NAV_MENU_ITEMS` is a plain TypeScript array, hand-copied byte-for-byte into all three repos (see "Sync convention" below). **This is Phase 1.** Phase 2 moves this same data behind a database/admin UI so a non-engineer can edit it without a PR. Nothing in the *shape* of the data should need to change for that move — which is why every visibility rule below is documented with a concrete example: whoever builds that admin UI (or a config-editing LLM) needs to understand what each field does without reading the TypeScript that currently evaluates it.

## Files

```text
cityfinance-ng-ui-v2/src/app/shared/components/navbar/nav-menu.config.ts   ← SOURCE OF TRUTH
cf-ui-ssr/src/app/shared/components/template/navbar/nav-menu.config.ts    ← byte-for-byte copy
cityfinance-ng-ui/src/app/shared/components/n-home-header/nav-menu.config.ts ← byte-for-byte copy
```

**Sync convention**: edit only the V2 copy, then copy the file verbatim over the other two. After editing, `diff` all three (ignoring nothing — they must be byte-identical) before considering the change done. This file (`CLAUDE.md`) follows the same convention: one canonical copy in this folder, copied verbatim into the other two repos' navbar folders, so whichever repo you're in, the docs next to the code match what all three actually do.

Each repo additionally owns:
- Its own navbar component (`navbar.component.ts` in V2, `navbar.ts` in SSR, `n-home-header.component.ts` in UI) — supplies `isMenuItemVisible()`, `isActiveGroupChild()`, and `resolveLinks()`. These read the shared data; they are **not** copied between repos, because each one needs that repo's own auth service, role check, and environment base-URLs.
- Its own template (`navbar.component.html`, `navbar.html`, `n-home-header.component.html`) — renders the resolved list. Structurally equivalent across repos, but not byte-identical (see "Per-repo notes").

`nav-menu.config.ts` itself imports nothing app-specific — no Angular, no `USER_TYPE` enum, no `environment` — specifically so it stays copy-paste-safe. Don't add an import to it; add a plain string/boolean field instead.

## What's in the array vs. what isn't

**In `NAV_MENU_ITEMS`**: Home, Dashboard (+children), Resources, Blog, 15th/16th FC Grants, XVI FC Data Collection, State Dashboard, Review XVI FC, Rankings'22 (Form/Dashboard), Users, OCR (+children, V2 only), the CFR ranking image logo.

**Deliberately NOT in this array** — still hand-implemented per repo, out of scope for this doc's "one source of truth" claim:
- The **Login** button + its dropdown (which role/grant-type to log in as)
- The **Logout** menu (profile link, sign-out)
- **Request a Demo**
- The notification bell (V2, ULB only)

These sit in the *persistent top bar* (see "Mobile drawer" below), not the sliding drawer, and each repo currently points them at different destinations. Unifying them is a real, separate piece of work — deferred, not forgotten.

## `NavMenuItem` fields

```ts
interface NavMenuItem {
  id: string;                    // stable key, e.g. 'fc-16th-grant', 'group.ulb-forms'
  order: number;                 // sparse (10, 20, 30…) — sorts this item among its siblings,
                                  // whether that's the top-level bar or one dropdown's children
  label?: string;                // may contain real HTML: '16<sup>th</sup> FC Grants'
  icon?: string;                 // 'bi bi-rocket-takeoff-fill' (Bootstrap Icons) or a Material icon name
  imageUrl?: string;              // renders an <img> instead of a text label
  imageAlt?: string;

  hostApp?: 'ui' | 'ssr' | 'v2' | 'external';  // which app OWNS this page
  path?: string;                 // that app's own route, e.g. '/xvifc-form'
  absoluteHref?: string;         // only when hostApp === 'external'
  target?: '_self' | '_blank';

  renderAs?: 'link' | 'button';  // default 'link'
  buttonVariant?: 'bootstrap' | 'material';
  buttonClass?: string;
  size?: 'sm' | 'md' | 'lg';

  children?: NavMenuItem[];      // presence = renders as a dropdown

  groupId?: string;               // see "Grouping" below
  groupDefaultLabel?: string;
  isGroupPrimaryLabel?: boolean;
  activePathPrefix?: string;      // see "Active-route highlighting" below

  apps: Array<'ui' | 'ssr' | 'v2'>;  // which repo(s) even consider this item
  visibility?: NavMenuVisibility;     // omitted = always visible (subject to `apps`)

  // Computed at render time — never author these two in NAV_MENU_ITEMS:
  resolvedLink?: string;    // or resolvedHref?: string — filled in by each repo's resolveLinks()
  isActiveRoute?: boolean;  // filled in by resolveMenus()'s stampActive()
}
```

### `hostApp` / `path` — cross-app links, worked example

`hostApp` says which of the three apps actually implements the page; every repo turns that into a real link via its **own** `resolveLinks()`, using its own base-URL constants:

| Item | `hostApp` | `path` | Rendered in V2 as | Rendered in SSR/UI as |
|---|---|---|---|---|
| `xvi-fc-data-collection` | `'v2'` | `/xvifc-form` | `[routerLink]` (same app) | `<a href>` to `environment.ui.urlV2 + '/xvifc-form'` |
| `dashboard.national-performance` | `'ssr'` | `/municipal-data/national` | `<a href>` to `environment.v2Url/v1Url` equivalent | `[routerLink]` inside SSR |
| `blog` | `'external'` | *(none)* | `<a href>` to `environment.blogUrl`, `target="_blank"` | same |

If a page doesn't exist in a given repo yet, just don't list that repo in `apps` — the item is filtered out for that app entirely, never rendered as a broken link.

## `NavMenuVisibility` — every field, with a real example

All set fields on one item are ANDed together (every one must pass for the item to show). `roles`/`excludeRoles`, `showOnlyOnRoutePrefixes`/`hideOnRoutePrefixes`, and `hideWhenRoleOnRoute` are three **independent gating dimensions** — see the note at the end of this section for exactly how they interact.

| Field | Meaning | Real example in this file |
|---|---|---|
| `requiresAuth` | Hidden unless logged in | `fc-15th-grants`: `{ requiresAuth: true, excludeRoles: [...] }` |
| `loggedOutOnly` | Hidden once logged in (inverse of above) | not currently used by any item — Login/Request-a-Demo would use this if they joined the array |
| `roles` | **Allow-list.** Visible only to these roles | `state-dashboard`: `{ roles: ['STATE_DASHBOARD', 'STATE'] }` — nobody else ever sees "State Dashboard" |
| `excludeRoles` | **Deny-list.** Hidden from these roles, visible to every other role *and to logged-out users* | `resources`... *(see `hideWhenRoleOnRoute` below — this item has since moved to that field)* — still used by `fc-15th-grants`: `{ excludeRoles: ['PMU', 'STATE_DASHBOARD', 'XVIFC_STATE'] }` |
| `isHiddenInProd` | Hidden when `environment.isProduction` is true; visible in every dev/staging/local build | `dashboard.municipal-bonds`, `dashboard.municipal-budgets`: `{ isHiddenInProd: true }` — features still being tested |
| `readonlyGated` | Additionally checked against each repo's own read-only-account allowlist (a fixed 3-email list today) | `rankings-22-form`: `{ readonlyGated: true, roles: ['ULB'] }` |
| `moduleAccess` | Checked against UI's `AccessChecker` module/action system. **UI only** | `users`: `{ moduleAccess: [{ moduleName: 'USERLIST', action: 'VIEW' }, ...] }` |
| `ocrRouteOnly` | Visible only while the current URL is under `/ocr`. **V2 only** | `ocr`: `{ ocrRouteOnly: true }` |
| `showOnMobileOnly` | Visible only inside the sliding mobile drawer. **UI only** | `home`: `{ showOnMobileOnly: true }` — the drawer covers the logo, so mobile users need an explicit way back |
| `showOnlyOnRoutePrefixes` | **Route allow-list.** Visible only while the current URL is on/under one of these paths | not yet used by a live item — available for e.g. "only show this inside the XVI FC module" |
| `hideOnRoutePrefixes` | **Route deny-list.** Hidden while on/under one of these paths, visible everywhere else | not yet used by a live item alone (see `hideWhenRoleOnRoute`, which combines this with a role check) |
| `hideWhenRoleOnRoute` | **Compound AND of role + route**, not an independent OR'd gate like the two above — see next section | `resources` and `blog`: hidden for ULB/STATE/MoHUA/ADMIN/XVIFC_STATE/XVIFC *only* while inside `/xvifc` or `/xvifc-form`; visible to those same roles everywhere else, and visible on those routes to every other role |

### How the three role/route dimensions actually combine

This is the part a future DB-editing UI absolutely has to get right, so spelling it out precisely:

- `roles` and `excludeRoles` are each independently OR'd into "hide if this fires." So are `showOnlyOnRoutePrefixes` and `hideOnRoutePrefixes`. Setting **either** `excludeRoles: ['ULB']` **or** `hideOnRoutePrefixes: ['/xvifc']` on the same item hides it if role matches, *or* if route matches — either one alone is enough to hide it.
- `hideWhenRoleOnRoute: { roles, routePrefixes }` is different on purpose: it only hides the item when **both** the role check *and* the route check are true **at the same time**. This is the only way to express "hidden here, but only for these people" — the two independent fields above can't express that combination; they can only express "hidden for these people, everywhere" or "hidden here, for everyone."

Concretely: if you wanted "hide Resources for ULB users on the XVI FC pages, but ALSO hide it for ULB everywhere else," you'd use `excludeRoles: ['ULB']` (unconditional). If you wanted "hide Resources for ULB only while they're on those specific pages, visible to them everywhere else," you need `hideWhenRoleOnRoute` — using `excludeRoles` + `hideOnRoutePrefixes` together on the same item would be wrong, because that ORs the two conditions (hides ULB *everywhere*, AND hides *everyone* on those routes) instead of ANDing them.

### Role resolution when logged out

All three repos resolve a logged-out user's role to the **empty string `''`** (never a real role name) — e.g. V2/SSR: `this.user ? this.user.role : ''`. Since `''` is never in any `roles`/`excludeRoles` list, this is what makes `excludeRoles: ['ULB']` alone mean "hidden for logged-in ULB, visible to logged-out visitors and every other role" with no extra `requiresAuth` flag needed.

## Boundary-safe route matching

Every route-based check (`activePathPrefix`, `showOnlyOnRoutePrefixes`, `hideOnRoutePrefixes`, `hideWhenRoleOnRoute.routePrefixes`) goes through one shared helper:

```ts
function matchesAnyRoutePrefix(url: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => url === prefix || url.startsWith(prefix + '/'));
}
```

A prefix of `/xvifc` matches `/xvifc`, `/xvifc/year`, and `/xvifc/2024-25/anything` — but never `/xvifc-form`, which merely shares the same characters without a `/` boundary. A naive `url.startsWith(prefix)` would wrongly match that last case; this is why the helper exists instead of an inline string check.

## `activePathPrefix` — why it exists

By default, an item is considered "active" only on its own `path`. That's wrong for an item that's really an *entry point* into a whole flow living under a different URL root. Example: `fc-16th-grant`'s `path` is `/xvifc/year` (the year-picker page), but after picking a year the real flow continues at `/xvifc/:yearId/...` — a **sibling** of `/xvifc/year`, not a child of it, so the default check would stop matching the moment you leave the picker page. `activePathPrefix: '/xvifc'` widens the match to the whole module.

## Grouping — the "My Forms" dropdown

Items sharing a `groupId` collapse into **one** synthetic dropdown, but only once **2 or more** of them are visible to the current user — a single visible member renders as a plain flat link, no dropdown wrapper.

```ts
{ id: 'fc-15th-grants',          groupId: 'ulb-forms', groupDefaultLabel: 'My Forms', order: 40, ... }
{ id: 'fc-16th-grant',           groupId: 'ulb-forms', groupDefaultLabel: 'My Forms', order: 35, ... }
{ id: 'xvi-fc-data-collection',  groupId: 'ulb-forms', groupDefaultLabel: 'My Forms', order: 50, ... }
{ id: 'rankings-22-form',        groupId: 'ulb-forms', groupDefaultLabel: 'My Forms', order: 80, ... }
```

- **Dropdown's own position** in the top-level bar = the **lowest `order` among its visible members** (here, 35). Raising or lowering one member's `order` can move the *whole group* if it becomes the new minimum — this bit us once already (see git history: setting 16th FC Grant's order too low accidentally dragged "My Forms" ahead of Dashboard/Resources/Blog). To reorder *within* the dropdown without moving the group, keep every member's `order` inside the same numeric gap the group already occupies relative to its neighbors.
- **Dropdown's trigger label** — not static. It shows, in priority order: (1) whichever member's page you're currently on, e.g. "XVI FC Data Collection" while on `/xvifc-form`; else (2) whichever member has `isGroupPrimaryLabel: true`; else (3) `groupDefaultLabel` ("My Forms"); else (4) the literal string `'More'`.
- A **lone** visible member (e.g. a STATE user who can't see `xvi-fc-data-collection` or `rankings-22-form`, ULB-only) renders flat — no dropdown, no "My Forms" label at all, just that one link.

## Active-route highlighting (`isActiveRoute`)

Every item — flat, grouped-child, or a dropdown parent like Dashboard — gets an `isActiveRoute: boolean` stamped on it by `resolveMenus()`, and every template binds the "active" CSS class to that field directly: `[class.active]="menu.isActiveRoute"`.

This deliberately does **not** use Angular's built-in `routerLinkActive` directive, for three concrete reasons found the hard way:
1. A dropdown/mat-menu **trigger** has no `[routerLink]` of its own — its menu content lives in a separate `<mat-menu>` template (portaled elsewhere in V2/SSR) or a sibling `<ul>` (UI), never physically nested inside the trigger `<a>`. `routerLinkActive` can only see `RouterLink`s nested inside its own host element, so on a trigger it's structurally inert — it never lights up, no matter the route.
2. Angular's own active-matching has no concept of `activePathPrefix`, so an item like 16th FC Grant (see above) would stop showing active the moment you leave its own literal `path`.
3. It never applies at all to an `href`-rendered cross-app item (e.g. Rankings'22 Form viewed from V2/SSR, where `hostApp: 'ui'` means no `[routerLink]` exists to begin with).

A dropdown parent (Dashboard, or a `groupId` group) is active whenever **any** of its children are — so the trigger gets the same highlighted look a flat link gets on its own page, not just the child row inside the opened dropdown.

## Resolution pipeline

```text
NAV_MENU_ITEMS
  → filterVisible(isMenuItemVisible)      // drops anything the current app/role/route/env can't see,
                                           // recursing into children so a Dashboard child being
                                           // isHiddenInProd doesn't drop Dashboard itself
  → groupAndSort(isActiveGroupChild)      // sorts by order; collapses 2+ same-groupId items into
                                           // one synthetic dropdown; picks that dropdown's trigger label
  → stampActive(isActiveGroupChild)       // stamps isActiveRoute on every item, recursively
  → resolvedLinks per item                // each repo's OWN resolveLinks(): hostApp/path → routerLink or href
  → template renders `menus`
```

`isMenuItemVisible`, `isActiveGroupChild`, and `resolveLinks` are the three functions every repo must implement itself (they need that repo's own auth/role/environment); everything else (`resolveMenus`, `filterVisible`, `groupAndSort`, `stampActive`, `matchesAnyRoutePrefix`) lives once in `nav-menu.config.ts` and is pure data transformation with zero app-specific knowledge.

Recomputed on every login/logout (`sessionState$` subscription) **and** every route change (`NavigationEnd`) in all three repos — so both role-based and route-based visibility, and the active-highlight state, update live without a page reload.

## Per-repo notes

### V2 — `src/app/shared/components/navbar/`
- Template syntax: Angular `@for`/`@if` control flow.
- Dropdowns render via Angular Material `mat-menu` (`[matMenuTriggerFor]`) — menu content is portaled to the CDK overlay, outside this component's normal DOM subtree, so styling it needs `::ng-deep` in `navbar.component.scss`.
- Only repo with the `ocr` item (`ocrRouteOnly`) and the ULB notification bell.
- `readonlyGated`/`isReadonlyUser()` was added here specifically when `rankings-22-form` first became visible in V2 — before that, no V2 item used the flag, so the check didn't exist yet. If you add another `readonlyGated` item, this is already wired.
- Mobile drawer: `#primary-navigation`, CSS `translateX`, toggled by `showMobileNav`.

### SSR — `src/app/shared/components/template/navbar/`
- Template syntax: same `@for`/`@if` control flow as V2.
- Also uses Angular Material `mat-menu` for dropdowns — same `::ng-deep` requirement in `navbar.scss`.
- Zoneless change detection app-wide — after any RxJS-driven state change (auth, route), an explicit `this.cdr.markForCheck()` is required or the view won't update.
- `readonlyGated` here predates this session's work — SSR's `isReadonlyUser()` is the original inverted-3-email-allowlist check; `moduleAccess`/`AccessChecker` deliberately isn't consulted here even though the field exists, to preserve SSR's pre-existing "Users" behavior exactly (email allowlist only).
- Has its own unrelated `/auth/login` (no `:type`) route for a "municipal-data" login flow — not part of anything described in this file.

### UI — `src/app/shared/components/n-home-header/`
- Template syntax: `*ngFor`/`*ngIf` (older Angular; no `@for`/`@if` here).
- Dropdowns render via a plain Bootstrap `dropdown-menu` (`data-bs-toggle="dropdown"`) — a real sibling `<ul>` in the DOM, not portaled, but Angular's `routerLinkActive` still can't reach across from the trigger `<a>` into that sibling `<ul>`, which is exactly why `isActiveRoute` exists instead.
- Only repo with `showOnMobileOnly` (the `home` item) and `moduleAccess` (the `users` item, via `AccessChecker`).
- Only repo with a second, standalone `imageUrl` nav item (the CFR ranking logo) rendered outside the menu's link/button branches.
- This repo's `environment.ts` predates the `ui: { urlV1, urlV2 }` base-URL structure the other two repos have; `resolveLinks()`'s `case 'v2'` here falls back to a hardcoded `/fc/` prefix instead.

## Verification after any change

1. `diff` all three `nav-menu.config.ts` copies — must be byte-identical (ignoring nothing).
2. `npx tsc --noEmit` in each repo.
3. `npx ng build --configuration=production` in each repo — `tsc` alone does not type-check templates; only a real Angular build catches a bad `[class.active]`/`[routerLink]` binding.
4. Manually re-check the specific role × route combination you changed — a `hideWhenRoleOnRoute` change especially, since its whole point is behaving differently in two different contexts (the role, on vs. off the listed routes) that are easy to only test one of.
