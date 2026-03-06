# Layout Guidelines Contract

## Global Conventions

- Primary page shell pattern in examples: `body.pageContent gra-padding-bottom-7xl` or `body.gra-padding-bottom-7xl`, then `main.gra-container.gra-padding-top-l`.
- Theme/state classes are applied on `body`: `theme-marca-servicos`, `dark-mode`, `templateDetailsBackoffice`.
- Interactive components rely on stable DOM hooks in addition to classes. Preserve data attributes such as `data-id-popup`, `data-gra-tab`, `data-element-id`, `data-items-per-page`, `data-is-external-content`, `data-progress-default`, `data-format-date`, `data-nav`, and `data-step`.
- Shared semantic state classes recur across components: `disabled`, `error`, `readonly`, `active`, `neutral`, `new`, `open`, `backoffice`, `header-primary`.

## Container System

- `gra-container`: primary content container; constrained width with centered layout.
- `gra-container-bo`: full-width backoffice container with horizontal padding and overflow clipping.
- `gra-container-fluid`: full-width general container with horizontal padding.
- `gra-container.withSideMenu`: wider page-content variant used beside sticky side navigation.
- `templateDetailsBackoffice .gra-container`: special content-width rule for backoffice detail layouts.
- Responsive convention: container padding tightens on smaller screens; use the provided container classes instead of hard-coded wrapper widths.

## Grid System

- Grid row base: `gra-row-bs`
- Column base: `gra-col-bs`
- Breakpoint column families: `gra-col-bs-sm-*`, `gra-col-bs-md-*`, `gra-col-bs-ld-*`, `gra-col-bs-xl-*`
- Breakpoint names: `sm`, `md`, `ld`, `xl`
- Numbering convention is inverse of typical 12-column naming. `gra-col-bs-*-1` is full width, `...-2` is half width, `...-3` is one third, continuing until `...-12` which is one twelfth.
- Column utilities are additive. Typical usage is `gra-col-bs` plus one or more breakpoint-specific column classes.

## Spacing Rules

- Use the shared spacing scale from the foundations contract through utility generators, not component-specific margin overrides.
- Section rhythm in demos is built with `gra-margin-top-xl`, `gra-margin-bottom-l|m|s`, `gra-margin-y-l`, and container padding utilities like `gra-padding-top-l`.
- Axis and edge utilities are first-class. Prefer `gra-margin-x-*`, `gra-margin-y-*`, `gra-padding-left-*`, `gra-padding-bottom-*`, and similar directional classes when layout needs asymmetry.
- Component internals often rely on spacing helpers inline with semantic classes. Keep both when reproducing structures.

## Structural Composition Rules

- Desktop/mobile component pairs are explicit markup variants, not the same DOM reshaped by CSS. Preserve paired structures for `gra-desktop-header`/`gra-mobile-header`, notification counters, pagination result summaries, and carousel layouts when present.
- Nested menus and recursive navigation are rendered as literal nested lists. Do not flatten `menu`, `menu-mobile`, `submenu_1`, `submenu_2`, `subUl`, or `withSub` structures.
- Form compositions are wrapper-driven: grouped fields use `gra-input-group`, OTP uses `gra-input-group-code`, search uses `gra-search-container`, date pickers use `gra-daterangepicker-container`, dropdowns use `gra-select`, and popups/filter panels nest full form layouts inside their content shells.
- Cards, lists, notifications, and tables use repeated child-slot naming like `title`, `details`, `text`, `actions`, `description`, `dateTime`, `options`. These slots are part of the component contract.
- Where helper copy exists, it is rendered as sibling nodes after the control: `graRequiredField`, `graRequiredFieldGroup`, `graInfoField`, `graCounterWords`.

## Utility Layout Helpers

- Display helpers used by components: `gra-d-block`, `gra-d-none`, `gra-d-flex`, `gra-d-flex-center`
- Flex helpers used by components: `gra-flex-row`, `gra-flex-grow`
- Text alignment helpers: `gra-text-start`, `gra-text-center`, `gra-text-end`
- Size/position helpers: `gra-width-100`, `gra-height-100`, `gra-pos-relative`

## Responsive Conventions

- Breakpoint names only: `sm`, `md`, `ld`, `xl`
- Many components also expose semantic mobile/desktop variants without a class scale: `desktop`, `mobile`, `resultsMobile`, `menu_mobile`, `gra-mobile-header`, `gra-desktop-header`, `carousel-mobile`
- Use component-provided mobile variants where they exist instead of inventing alternate wrappers.

## Restrictions

- Keep class names exact. Many hooks are consumed by bundled behavior in `assets/main.js`.
- Do not rename generated utility families, even when they appear redundant with generic framework classes.
- Preserve indicator order where JS maps items by index: wizard steps/lines, carousel nav cards, pagination controls, sortable table headers, notification shells, popup triggers.
