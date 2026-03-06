# 1. Global Design Principles

## Visual hierarchy rules
- Use a clear top-down information hierarchy: page title first, section title second, supporting text last.
- Keep actions visually ordered by priority: primary action, secondary action, tertiary/link action.
- Use semantic emphasis only where needed; avoid multiple competing emphasis points in the same block.
- Group related content into clear containers (cards, sections, fieldsets) and separate groups with spacing, not decorative styling.
- Keep interaction density consistent inside the same region (do not mix compact and spacious patterns without intent).

## Color philosophy
- Use only design-system color tokens; do not introduce ad-hoc hex colors.
- Follow semantic color mapping strictly.
- `success` for successful outcomes.
- `warning` for caution.
- `error` for errors or destructive risk.
- `info` for neutral informational feedback.
- Keep neutral palettes for structure (backgrounds, borders, text hierarchy).
- Keep sufficient foreground/background contrast in every state, including hover/focus/disabled.
- Use status colors for meaning, not decoration.
- Avoid white foreground on light surfaces and low-contrast text on colored backgrounds.

## Structural alignment principles
- Use grid-based placement and consistent alignment lines across the whole layout.
- Respect responsive breakpoints used by the system: `576`, `768`, `992`, `1200`, `1400`.
- Use the system gutter/margin rhythm per breakpoint (mobile, tablet, desktop).
- Align text and form controls to shared vertical columns.
- Keep predictable reading flows: left-to-right scanning, clear start/end anchors.
- Prefer full-width and boxed layouts only as defined by the system templates; do not mix arbitrarily.
- For split layouts, keep stable proportional relationships (for example, content/sidebar patterns like `70/30` when used).

## Border-radius rules
- Use only radius tokens from the system scale.
- Radius scale is constrained to tokenized values, including `4px`, `8px`, `16px`, `24px`, `32px`.
- Apply smaller radii to controls and denser UI, larger radii to containers and expressive surfaces.
- Do not combine conflicting radii in one component family.
- Do not use custom/non-token radii.

## Typography rules
- Use the system type family (`Source Sans Pro`) and approved text styles only.
- Preserve semantic text hierarchy: headings, subheadings, body, labels, captions.
- Keep paragraph readability through controlled line length and line-height.
- Keep text alignment consistent by context; avoid arbitrary center/right alignment for body copy.
- Keep links visually identifiable as links.
- Do not use typography as decoration (random size jumps, excessive uppercase, inconsistent weight usage).
- Do not rely on color alone to encode hierarchy.

## Spacing and layout principles
- Use tokenized spacing increments (system spacing scale) for all paddings, margins, and gaps.
- Separate sections with spacing before introducing dividers.
- Keep consistent internal padding inside components of the same type.
- Preserve layout rhythm across breakpoints; do not collapse spacing inconsistently.
- Keep labels, helper text, controls, and validation messages in stable vertical order.
- Use separators to clarify structure, not to replace spacing.

## Accessibility rules
- Maintain at least WCAG AA contrast requirements for text and UI states.
- Provide visible focus indication for all interactive controls.
- Ensure keyboard operation for menus, tabs, accordions, dialogs, form controls, and pickers.
- Use semantic patterns implied by components.
- Navigation lists for navigational constructs.
- Form labels for inputs/selectors.
- Status/live regions for transient feedback where applicable.
- Never use placeholder text as a label replacement.
- Keep disabled states visually clear while preserving readable context.

## Forbidden patterns
- Using non-token colors, shadows, spacing, or radii.
- Using semantic colors with the wrong meaning.
- Distorting, recoloring, or visually altering institutional brand marks.
- Mixing icon styles/weights arbitrarily in one interface.
- Overusing elevation/shadow to compensate for poor structure.
- Hiding critical information in tooltips only.
- Stacking multiple blocking layers (for example, modal over modal) without strong justification.
- Replacing explicit labels with placeholders.
- Introducing inconsistent component variants outside the documented states.

# 2. Component Rules

## Component: Accordion

### Purpose
- Organize related content into collapsible sections to reduce visual load.

### Structural Rules
- Use repeating items composed of `header trigger` plus `content panel`.
- Header includes a clear label and expansion affordance icon.
- Keep heading order logical when accordions appear inside content hierarchy.
- Allow optional supportive content inside panel body only.

### Visual Rules
- Use tokenized spacing and divider/border treatment between items.
- Keep expansion icon direction/state consistent with expanded/collapsed state.
- Use only system text and neutral/status tokens.
- Respect defined states: default, hover, focus, expanded, disabled.

### Behavioral Rules
- Header click/tap toggles panel visibility.
- Support single-expand or multi-expand behavior consistently within one accordion instance.
- Preserve state predictably when navigating inside the page context.
- Do not place critical one-step actions that are hidden by default unless context justifies it.

### Accessibility Rules
- Header trigger must be keyboard operable (`Enter`/`Space`).
- Associate each trigger with its controlled panel semantics (`aria-expanded`/controlled region behavior).
- Keep focus indicator visible on headers.
- Use meaningful header text.

### Restrictions
- Do not use accordion when all content must be visible at once.
- Do not hide critical warnings/errors in collapsed panels by default.
- Do not create deep nested accordions that harm scanability.

## Component: Alert

### Purpose
- Present inline contextual feedback for status, warnings, errors, or information.

### Structural Rules
- Include semantic icon (when defined), title/label, and message text.
- Optional close action is allowed for dismissible alerts.
- Optional inline action/link may be used for recovery guidance.
- Keep alert content concise and action-oriented.

### Visual Rules
- Use semantic color tokens strictly by meaning (`info`, `success`, `warning`, `error`).
- Preserve contrast between text/icon and alert container background.
- Use system radius, border, and spacing tokens.
- Keep icon sizing and alignment consistent with text baseline.

### Behavioral Rules
- Use persistent alerts for important inline states.
- Dismissible alerts must have clear close affordance.
- Alerts should not auto-dismiss when they carry critical information.
- Avoid repeated duplicate alerts for the same condition.

### Accessibility Rules
- Use status semantics (`role="status"` or `role="alert"` according to urgency).
- Ensure close and action controls are keyboard accessible and labeled.
- Provide non-color cues (icon/text) for status meaning.

### Restrictions
- Do not use alert as a page layout container.
- Do not use alert for transient notifications better handled by toast.
- Do not use semantic color outside its status intent.

## Component: Avatar

### Purpose
- Represent a user/entity identity in compact visual form.

### Structural Rules
- Avatar may contain image, initials, or fallback icon.
- Optional status indicator/badge can be attached where supported.
- Use standardized sizes only.

### Visual Rules
- Keep shape and radius according to avatar token definitions.
- Maintain consistent crop/fit behavior for images.
- Use fallback text/icon styles from system tokens only.
- Respect defined states for static/clickable avatars.

### Behavioral Rules
- When clickable, avatar behaves as a standard interactive control.
- Provide deterministic fallback when image is missing.
- Keep identity representation stable across screens.

### Accessibility Rules
- Provide alternative text for meaningful avatar images.
- If decorative, mark accordingly and avoid redundant announcements.
- Ensure focus ring is visible when avatar is interactive.

### Restrictions
- Do not stretch/squash avatar images.
- Do not use long text inside avatar.
- Do not use non-token colors for status indicators.

## Component: Badge

### Purpose
- Display compact status, category, or count metadata.

### Structural Rules
- Badge contains short label or numeric value.
- Optional leading icon may be used in supported variants.
- Keep badge attached to related content/control context.

### Visual Rules
- Use semantic/neutral badge variants only.
- Keep text concise to preserve compact shape.
- Maintain approved contrast and avoid low-contrast foreground/background pairs.
- Keep radius and padding tokenized.

### Behavioral Rules
- Update badge value/status in sync with underlying data.
- Keep count format predictable (including capped values when defined).
- Do not use badge as a primary action.

### Accessibility Rules
- Expose meaningful badge text to assistive tech.
- If badge is purely decorative, do not announce it as standalone content.

### Restrictions
- Do not place long sentences inside badges.
- Do not use badge colors that conflict with semantic meaning.
- Do not use badges as a replacement for full validation or alert messaging.

## Component: Breadcrumb

### Purpose
- Indicate current location within hierarchical navigation.

### Structural Rules
- Render ordered path from root to current page.
- Use separators between items.
- Final/current item is present and visually distinct.
- Preceding items are navigable links.

### Visual Rules
- Use neutral/link tokens for non-current items.
- Keep separators subtle and consistent.
- Apply truncation/collapse rules for long hierarchies where needed.
- Maintain consistent text size and spacing.

### Behavioral Rules
- Clicking a parent item navigates to that level.
- Current page item is not treated as a primary navigation action.
- On small screens, apply compact behavior as defined.

### Accessibility Rules
- Use navigation semantics (`nav` with appropriate labeling).
- Mark current item (`aria-current="page"`).
- Ensure keyboard navigation and visible focus on links.

### Restrictions
- Do not use breadcrumb as the primary menu.
- Do not include non-hierarchical shortcuts in breadcrumb path.
- Do not hide current page context.

## Component: Button

### Purpose
- Trigger explicit user actions.

### Structural Rules
- Button contains concise action label.
- Optional icon allowed in leading/trailing or icon-only variants.
- Use approved size variants only.
- Keep button groups aligned when actions are related.

### Visual Rules
- Apply hierarchy variants consistently (primary, secondary, tertiary/ghost, destructive where defined).
- Use tokenized heights, paddings, radius, typography, and icon sizing.
- Respect full state set: default, hover, pressed/active, focus, disabled.
- Keep one clear primary action per action cluster.

### Behavioral Rules
- Trigger action on activation only once per intent.
- Disabled button must not fire actions.
- Use loading/progress handling where action latency exists.
- Keep action labels verb-based and specific.

### Accessibility Rules
- Ensure keyboard activation (`Enter`/`Space`).
- Preserve visible focus style.
- Provide accessible name; icon-only buttons require explicit label.
- Keep disabled semantics programmatically exposed.

### Restrictions
- Do not place multiple competing primary buttons in one small context.
- Do not use buttons for plain navigation when link semantics are correct.
- Do not use ambiguous labels like generic "OK" when action meaning is unclear.

## Component: Button group

### Purpose
- Present closely related actions/options as a unified control set.

### Structural Rules
- Group contains adjacent buttons with consistent sizing.
- Use horizontal/vertical arrangement as defined by space and context.
- Keep action relationship explicit.

### Visual Rules
- Maintain consistent variant and spacing inside the group.
- Use tokenized borders/radius for grouped adjacency.
- Reflect selected/active state clearly when group acts as segmented control.

### Behavioral Rules
- For selection groups, enforce defined selection mode (single or multiple as specified).
- Keep state synchronization deterministic.
- Preserve keyboard navigation across grouped controls.

### Accessibility Rules
- Use grouping semantics (`role="group"` or equivalent).
- Ensure each control has an accessible name and focus visibility.

### Restrictions
- Do not mix unrelated actions in one group.
- Do not combine conflicting visual priorities inside the same group.
- Do not overfill a group when a dropdown/select is more appropriate.
## Component: Card

### Purpose
- Package related content and actions into a bounded, scannable block.

### Structural Rules
- Card may include header, body, metadata, media, and footer actions.
- Keep internal order consistent across card collections.
- Optional interactive card behavior must be explicit.

### Visual Rules
- Use approved surface, border, radius, and elevation tokens.
- Keep internal spacing consistent by section type.
- Ensure title/body/action hierarchy is visually clear.
- Apply hover/focus/selected states for interactive cards.

### Behavioral Rules
- Entire-card click behavior must not conflict with internal actions.
- Keep action placement predictable.
- Use loading/skeleton placeholders when card content is delayed.

### Accessibility Rules
- Provide semantic heading/landmark context where needed.
- If card is clickable, ensure keyboard interaction and accessible name.
- Keep focus visible for interactive regions.

### Restrictions
- Do not overload cards with dense table-like data.
- Do not mix too many action types in one card.
- Do not use inconsistent card heights without layout intent.

## Component: Checkbox

### Purpose
- Capture zero, one, or many independent selections.

### Structural Rules
- Checkbox includes control and associated label.
- Optional helper/validation text appears below in form flow.
- Support grouped checkbox sets with clear grouping label.
- Indeterminate state is allowed for parent/aggregate selection patterns.

### Visual Rules
- Use tokenized control size, border, fill, and spacing.
- Maintain state visuals: unchecked, checked, indeterminate, hover, focus, disabled, error.
- Keep labels aligned consistently in vertical or horizontal lists.

### Behavioral Rules
- Checkbox toggles independently unless used in parent-child structures.
- Parent checkbox reflects child aggregate state where applicable.
- Validation messaging appears when required by form rules.

### Accessibility Rules
- Link label and control programmatically.
- Use fieldset/legend semantics for related groups.
- Ensure keyboard toggle and visible focus.

### Restrictions
- Do not use checkbox for mutually exclusive options (use radio).
- Do not hide labels.
- Do not use switch when confirmation-on-submit behavior is intended.

## Component: Dropdown

### Purpose
- Show contextual action lists or option menus on demand.

### Structural Rules
- Use trigger control plus floating menu panel.
- Menu may include items, icons, separators, grouped sections, nested items, and selectable items where defined.
- Keep menu item labels concise and scannable.

### Visual Rules
- Use system surface/elevation tokens for floating panel.
- Keep item spacing, icon alignment, and separators consistent.
- Reflect item states: default, hover, focus, active/selected, disabled.
- Use semantic/destructive styling only for destructive actions.

### Behavioral Rules
- Open from trigger; close on outside click, escape, or selection (as configured).
- Keyboard navigation is mandatory through menu items.
- Nested menus must preserve pointer and keyboard predictability.
- Do not block primary workflow with oversized menus.

### Accessibility Rules
- Use menu semantics and labeled trigger.
- Maintain logical focus movement when opening/closing.
- Announce selected/checked states where applicable.

### Restrictions
- Do not use dropdown menu as a substitute for structured form select when form semantics are needed.
- Do not overload menus with long explanatory text.
- Do not include hidden critical actions without clear affordance.

## Component: Footer

### Purpose
- Provide institutional, legal, and supporting navigation at page end.

### Structural Rules
- Include mandatory institutional branding/legal references as defined.
- Support grouped links and optional secondary information blocks.
- Keep consistent order of content groups across pages.

### Visual Rules
- Use approved footer surface and text contrast tokens.
- Preserve spacing rhythm and divider usage from template.
- Keep iconography and link styling consistent with global rules.

### Behavioral Rules
- Footer links behave as standard navigation.
- Keep content stable and predictable across site sections.

### Accessibility Rules
- Use semantic footer landmark.
- Ensure links are keyboard navigable with visible focus.
- Maintain readable contrast across all footer elements.

### Restrictions
- Do not place primary task CTAs as footer substitutes.
- Do not clutter footer with redundant top-navigation content.

## Component: Header

### Purpose
- Provide top-level identity and primary navigation/actions.

### Structural Rules
- Include institutional brand mark and primary navigation region.
- Optional utilities may include search, language, profile, and contextual actions.
- Maintain clear priority between brand, navigation, and utility actions.

### Visual Rules
- Use approved header heights, spacing, and surface styles.
- Keep brand/logo rendering untouched and compliant.
- Use consistent active/hover/focus indication for nav items.

### Behavioral Rules
- Navigation items route to top-level sections.
- Mobile behavior uses collapsed/menu pattern as defined.
- Sticky behavior (if used) must not hide critical content.

### Accessibility Rules
- Use header and navigation landmarks with clear labels.
- Ensure keyboard navigation through menu items and utilities.
- Preserve focus visibility and semantic current-item indication.

### Restrictions
- Do not alter institutional logo proportions/colors.
- Do not overload header with secondary content.
- Do not mix unrelated action priorities in top bar.

## Component: Input

### Purpose
- Capture short textual and structured textual input.

### Structural Rules
- Required order: label, input control, helper text/validation (when present).
- Optional elements: prefix/suffix, icons, counter, clear action, password reveal, chips/tags patterns where supported.
- Use predefined variants only.

### Visual Rules
- Use tokenized height, border, radius, text style, and spacing.
- Keep state visuals explicit: default, hover, focus, filled, disabled, readonly, error, success, warning.
- Keep placeholder styling secondary to label.

### Behavioral Rules
- Validate according to field rules; show message near field.
- Preserve input value and cursor behavior across state changes.
- Use masks/format hints only when necessary and consistent.
- Do not rely on placeholder for mandatory instructions.

### Accessibility Rules
- Label is mandatory and associated with control.
- Helper and error text must be programmatically linked where needed.
- Keyboard and screen-reader interaction must remain consistent for prefixes/suffix actions.

### Restrictions
- Do not replace label with placeholder.
- Do not create custom state colors outside token system.
- Do not use multiline content in single-line input (use textarea).

## Component: Link

### Purpose
- Provide textual navigation or secondary navigation-style action.

### Structural Rules
- Link text should be descriptive and context-specific.
- Inline links remain in text flow; standalone links can include optional icon.

### Visual Rules
- Keep recognizable link styling across states.
- Respect state set: default, hover, focus, active/visited (where applicable), disabled.
- Maintain sufficient contrast and avoid button-like styling unless variant explicitly defines it.

### Behavioral Rules
- Links navigate; they do not submit forms unless explicit link-button pattern is defined.
- External links use expected external-navigation behavior conventions.

### Accessibility Rules
- Provide meaningful accessible text.
- Ensure keyboard focus and activation.
- Avoid ambiguous repeated labels without context.

### Restrictions
- Do not use "click here" style generic labels.
- Do not use link component as primary destructive action.
- Do not remove visual affordance that identifies it as a link.

## Component: Modal

### Purpose
- Present a focused, blocking dialog for high-priority decisions or tasks.

### Structural Rules
- Use overlay plus dialog container.
- Dialog includes title, content, and action area.
- Optional close control must be clearly placed.
- Use approved modal sizes and responsive behavior.

### Visual Rules
- Apply designated elevation/surface tokens for layered context.
- Keep content spacing and action alignment consistent.
- Preserve clear primary/secondary action hierarchy.

### Behavioral Rules
- Open over current context and block background interaction.
- Trap focus within modal while open.
- Close via explicit action, escape, or backdrop only when allowed by flow criticality.
- Avoid nested modal stacks.

### Accessibility Rules
- Use dialog semantics (`role="dialog"`/`aria-modal` pattern).
- Move focus into modal on open and return it on close.
- Ensure accessible title and control labels.

### Restrictions
- Do not use modal for routine non-critical information.
- Do not overload modal with long, multi-screen flows that require full page.
- Do not remove obvious close path unless legally/process-critical.
## Component: Popover

### Purpose
- Show contextual, anchored supplementary content without full blocking behavior.

### Structural Rules
- Popover is anchored to a trigger element.
- Content may include title, body text, and lightweight actions where defined.
- Keep content compact and contextual.

### Visual Rules
- Use floating surface/elevation tokens and approved radius.
- Maintain pointer/arrow and placement consistency when used.
- Respect open/hover/focus states.

### Behavioral Rules
- Open on defined trigger interaction (click/focus/hover per pattern).
- Close on outside interaction or escape.
- Reposition to stay visible in viewport.

### Accessibility Rules
- Trigger must indicate expanded/controlled relationship when applicable.
- Ensure keyboard access to open content and close behavior.
- Preserve focus visibility on trigger and popover interactions.

### Restrictions
- Do not place critical workflow content exclusively in popovers.
- Do not overload popover with long forms or complex multi-step logic.
- Do not use popover where modal confirmation is required.

## Component: Radio

### Purpose
- Capture exactly one choice from a known set.

### Structural Rules
- Radio options belong to a clearly labeled group.
- Each option includes control and label; helper text optional.
- Use vertical or horizontal arrangement as defined by content length and layout.

### Visual Rules
- Use tokenized control size, spacing, and typography.
- Support states: unselected, selected, hover, focus, disabled, error.
- Keep option alignment consistent across group.

### Behavioral Rules
- Selecting one option deselects others in the same group.
- Default selection can be pre-set only when justified by known context.
- Validation appears at group level when mandatory.

### Accessibility Rules
- Use fieldset/legend or equivalent group semantics.
- Provide keyboard navigation among options.
- Keep focus ring visible and label association explicit.

### Restrictions
- Do not use for multi-select cases.
- Do not create ambiguous option labels.
- Do not split one logical option group across disconnected layouts.

## Component: Side menu

### Purpose
- Provide persistent section-level navigation, especially in complex areas.

### Structural Rules
- Use vertical list structure with optional nested levels.
- Include clear active item indication.
- Support permanent and temporary/collapsible variants depending on viewport.

### Visual Rules
- Use consistent indentation and hierarchy markers for nesting.
- Maintain tokenized spacing, typography, and state colors.
- Keep icons optional and consistent when used.

### Behavioral Rules
- Nested groups expand/collapse predictably.
- Active route remains visually persistent.
- Temporary menu closes on selection/background interaction as defined.

### Accessibility Rules
- Use navigation semantics with clear labeling.
- Ensure full keyboard operation for expand/collapse and item activation.
- Maintain focus visibility throughout nested navigation.

### Restrictions
- Do not mix unrelated navigation levels in one side menu.
- Do not hide current-location indicator.
- Do not use side menu as a dense action toolbar.

## Component: Skeleton

### Purpose
- Communicate loading state by previewing approximate content structure.

### Structural Rules
- Match placeholder layout to eventual content blocks.
- Use appropriate placeholder shapes (text lines, avatar/media, actions).
- Keep skeleton count representative of expected content.

### Visual Rules
- Use neutral loading tokens and approved shimmer/animation style where defined.
- Keep radii and spacing aligned with final component geometry.
- Avoid strong semantic colors in skeleton state.

### Behavioral Rules
- Show skeleton only while content is loading.
- Replace skeleton promptly with real content.
- For long/unknown waits, combine or switch to progress/status messaging as needed.

### Accessibility Rules
- Mark loading regions appropriately for assistive technologies.
- Avoid announcing decorative placeholder details.

### Restrictions
- Do not display skeleton after data is available.
- Do not mismatch skeleton structure and final layout.
- Do not use skeleton as permanent empty-state representation.

## Component: Slider

### Purpose
- Select numeric values or ranges through direct manipulation.

### Structural Rules
- Include track, thumb(s), optional marks, and optional value labels.
- Optional min/max labels and step indicators may be used.
- Range variant uses two thumbs.

### Visual Rules
- Use tokenized sizing for track, thumb, and labels.
- Support states: default, hover, focus, active/dragging, disabled.
- Keep selected range and unselected track visually distinct.

### Behavioral Rules
- Values honor min/max/step constraints.
- Keyboard adjustment must be supported.
- Value feedback should be visible during interaction when precision is needed.

### Accessibility Rules
- Provide accessible name and current value semantics.
- Support keyboard controls and visible focus.
- Ensure value announcements update during interaction.

### Restrictions
- Do not use slider for highly precise text/numeric entry without fallback input.
- Do not use with unclear scale or missing units.
- Do not hide current value when value visibility is critical.

## Component: Stepper

### Purpose
- Indicate progress and position in multi-step processes.

### Structural Rules
- Render ordered steps with labels and connectors.
- Support horizontal/vertical forms where defined.
- One step is active at a time; completed and pending states are explicit.

### Visual Rules
- Use tokenized step indicators and connectors.
- Support semantic state indications including error when applicable.
- Keep labels concise and consistent.

### Behavioral Rules
- Reflect progression state in sync with form/process logic.
- Allow backward navigation where process permits.
- Keep non-linear access explicit if enabled.

### Accessibility Rules
- Expose ordered progress semantics.
- Ensure keyboard access for navigable steps.
- Keep active step clearly announced/identified.

### Restrictions
- Do not use stepper for unrelated navigation categories.
- Do not include excessive step count without chunking strategy.
- Do not mark incomplete steps as completed.

## Component: Switch

### Purpose
- Toggle immediate binary settings.

### Structural Rules
- Include switch control and clear label.
- Optional helper text may explain effect.
- Use one switch per setting.

### Visual Rules
- Distinguish `on` and `off` states clearly.
- Use tokenized size, track/thumb shapes, and spacing.
- Support hover, focus, active, disabled visuals.

### Behavioral Rules
- Toggle applies instantly (not deferred submission behavior).
- Avoid hidden side effects; communicate impactful changes.
- Keep state persistence consistent after interaction.

### Accessibility Rules
- Use switch semantics with exposed checked state.
- Ensure keyboard operation and visible focus.
- Label must describe controlled setting clearly.

### Restrictions
- Do not use switch for multi-option choices.
- Do not use when change requires separate explicit confirmation (use checkbox + submit flow).
- Do not omit text label.
## Component: Table

### Purpose
- Display structured, comparable data in rows and columns.

### Structural Rules
- Include header row with clear column labels.
- Body rows follow consistent cell structure.
- Optional features: sorting, row selection, expandable rows, pagination, row actions.
- Keep column count within readable limits for target viewport.

### Visual Rules
- Use approved table variants (including zebra/neutral patterns where defined).
- Align data by type (text, numbers, actions) consistently.
- Use tokenized spacing, borders/dividers, and typography.
- Support states: hover, selected, focus, disabled rows/cells, loading, empty.

### Behavioral Rules
- Sorting behavior must be explicit and reversible.
- Selection behavior must reflect single/multi rules clearly.
- Preserve context during pagination and filtering.
- Provide fallback responsive behavior for small viewports.

### Accessibility Rules
- Use semantic table structure (`table`, `th`, scope/headers associations).
- Ensure keyboard access for interactive cells/controls.
- Announce sort direction and selection states programmatically.

### Restrictions
- Do not force dense, wide tables without responsive strategy.
- Do not mix unrelated data types in one column.
- Do not hide critical row actions behind ambiguous affordances.

## Component: Tabs

### Purpose
- Switch between peer content sections within the same context.

### Structural Rules
- Use tab list and associated tab panels.
- Each tab controls exactly one panel.
- Keep labels short and comparable.
- Use horizontal/vertical orientation as defined.

### Visual Rules
- Clearly distinguish active tab from inactive tabs.
- Keep indicator, spacing, and typography tokenized.
- Support hover, focus, active, disabled states.

### Behavioral Rules
- Only one tab panel is active/visible at a time.
- Keyboard navigation between tabs is required.
- Panel content switching should be immediate and predictable.

### Accessibility Rules
- Use tab semantics (`role="tablist"`, `tab`, `tabpanel` pattern).
- Ensure proper selected state announcements and keyboard support.
- Keep focus visibility in both tab and panel regions.

### Restrictions
- Do not use tabs for strict step-by-step processes (use stepper).
- Do not create too many tabs that exceed scannability.
- Do not hide tab labels behind ambiguous icons only.

## Component: Textarea

### Purpose
- Capture longer, multi-line textual input.

### Structural Rules
- Follow input field structure: label, control, helper/validation text.
- Optional counter and resize behavior may be enabled where defined.
- Keep control width aligned with form grid.

### Visual Rules
- Use tokenized border/radius/spacing/typography.
- Support full state set: default, hover, focus, disabled, readonly, error, success, warning.
- Keep text area height strategy consistent (fixed, min/max, or autosize variant).

### Behavioral Rules
- Preserve entered text and cursor behavior during validation/state changes.
- Apply character limits and messaging when configured.
- Use scrolling/resizing behavior as defined by variant.

### Accessibility Rules
- Label association is mandatory.
- Error/helper/counter messaging should be accessible.
- Ensure keyboard focus visibility and predictable text editing behavior.

### Restrictions
- Do not use textarea for short single-line values.
- Do not rely on placeholder text for required instructions.
- Do not remove validation feedback when field is invalid.

## Component: Toast

### Purpose
- Provide transient, non-blocking system feedback.

### Structural Rules
- Include concise message, optional status icon, optional action, and optional dismiss control.
- Toast stack/order follows defined placement logic.
- Keep content short and immediately understandable.

### Visual Rules
- Use semantic variants for info/success/warning/error.
- Preserve readable contrast and tokenized spacing/radius/elevation.
- Keep icon and action alignment consistent.

### Behavioral Rules
- Auto-dismiss timing follows variant severity rules.
- Critical toasts may require manual dismiss where specified.
- Action handling must be explicit and non-ambiguous.

### Accessibility Rules
- Use appropriate live region behavior by urgency.
- Ensure dismiss/action controls are keyboard accessible and labeled.
- Avoid excessive repeated announcements.

### Restrictions
- Do not use toast for confirmations requiring deliberate decision.
- Do not place long-form guidance in toasts.
- Do not spam repeated toasts for the same event.

## Component: Tooltip

### Purpose
- Provide brief contextual help for a control or element.

### Structural Rules
- Tooltip is anchored to a trigger element.
- Content is short (brief explanatory text).
- Keep tooltip copy compact (system guidance favors very short text).

### Visual Rules
- Use approved floating surface and text tokens.
- Keep consistent spacing, radius, and pointer treatment.
- Maintain high contrast for small text readability.

### Behavioral Rules
- Show on hover/focus and hide on blur/exit/escape.
- Position adaptively to remain visible.
- Keep show/hide timing subtle and predictable.

### Accessibility Rules
- Trigger remains keyboard focusable.
- Tooltip content is associated to trigger as supplemental description.
- Do not trap focus in tooltip.

### Restrictions
- Do not store essential instructions only in tooltip.
- Do not include complex interactive content in tooltip.
- Do not use lengthy multi-paragraph text.

## Component: Progress circle

### Purpose
- Communicate task progress in circular/radial form.

### Structural Rules
- Include circular track and progress indicator.
- Optional center/adjacent label shows percentage or status text.
- Support determinate and indeterminate variants where defined.

### Visual Rules
- Use tokenized stroke width, size, and semantic/brand color mappings.
- Ensure progress vs background track contrast.
- Keep text readable at supported sizes.

### Behavioral Rules
- Determinate variant reflects actual progress value (`0-100`).
- Indeterminate variant indicates ongoing unknown completion time.
- Update smoothly without erratic jumps.

### Accessibility Rules
- Expose progress semantics and current value for determinate state.
- Provide accessible label/context for what is progressing.

### Restrictions
- Do not use determinate indicator without real value source.
- Do not use overly small sizes where value/context becomes unreadable.

## Component: Progress bar

### Purpose
- Communicate linear task progression.

### Structural Rules
- Include label/context, bar track, and fill indicator.
- Optional percentage/value text may be shown.
- Support determinate and indeterminate forms.

### Visual Rules
- Use tokenized bar height, radius, and color.
- Preserve strong contrast between track and fill.
- Keep semantic coloring aligned with context.

### Behavioral Rules
- Determinate progress must map to real completion data.
- Indeterminate used only when exact completion is unknown.
- Keep update cadence stable and understandable.

### Accessibility Rules
- Provide programmatic progress semantics and values.
- Include descriptive label identifying operation.

### Restrictions
- Do not show fake precision values.
- Do not leave indeterminate bar running after completion/error without status update.

## Component: Date picker

### Purpose
- Capture date values through guided calendar interaction.

### Structural Rules
- Combine date input field with calendar overlay/panel.
- Calendar includes month/year navigation and day grid.
- Support configured selection mode (single date or range where enabled).
- Optional quick controls may be used only in approved variants.

### Visual Rules
- Use input visual system for field states.
- Use tokenized calendar cell sizing, spacing, and state colors.
- Distinguish day states clearly: today, selected, range boundaries, in-range, disabled, out-of-month.

### Behavioral Rules
- Enforce valid date ranges and disabled dates.
- Keep format and locale behavior consistent.
- Support keyboard day navigation and month traversal.
- Commit/clear behavior must be explicit.

### Accessibility Rules
- Input requires explicit label.
- Calendar grid must be keyboard navigable with clear focus.
- Announce selected date and navigation context appropriately.

### Restrictions
- Do not accept invalid/manual formats without validation feedback.
- Do not hide date constraints from user.
- Do not use date picker for non-date data types.

## Component: Pagination

### Purpose
- Navigate segmented multi-page result sets.

### Structural Rules
- Include previous/next controls and page indicators.
- Highlight current page explicitly.
- Optional page-size and total-count helpers may be used.
- Use truncation (ellipsis) patterns for long page ranges.

### Visual Rules
- Use tokenized spacing, control sizes, and state styles.
- Maintain clear active vs inactive page contrast.
- Keep controls aligned with associated content area.

### Behavioral Rules
- Prev/next disable at boundaries.
- Page change updates content and preserves consistent context handling.
- Keep URL/state synchronization predictable when applicable.

### Accessibility Rules
- Use navigation semantics with label for pagination region.
- Ensure all controls are keyboard reachable and clearly named.
- Mark current page programmatically.

### Restrictions
- Do not use pagination for single-page datasets.
- Do not hide current page state.
- Do not provide inaccessible tiny touch targets.

## Component: Search

### Purpose
- Enable content/query discovery through text input.

### Structural Rules
- Search field includes label or clear accessible name.
- Optional elements: search icon, clear control, submit control, suggestions/autocomplete, filters.
- Results area should be structurally connected to query control.

### Visual Rules
- Reuse input visual rules and state tokens.
- Keep query and filter controls visually grouped.
- Use clear feedback styles for loading, no-results, and results states.

### Behavioral Rules
- Trigger search by explicit submit and/or configured live query behavior.
- Clear/reset behavior must be explicit.
- Debounce live search where needed.
- Keep result updates synchronized with query term.

### Accessibility Rules
- Provide labeled search region/control semantics.
- Ensure keyboard operation for suggestions and result navigation.
- Announce result count/status changes where appropriate.

### Restrictions
- Do not rely solely on placeholder as search label.
- Do not auto-run expensive searches on every keystroke without control.
- Do not hide no-results feedback.

## Component: Select

### Purpose
- Choose option(s) from a predefined list.

### Structural Rules
- Include label, trigger field, options panel, and optional helper/validation text.
- Support single-select and multi-select variants where defined.
- Optional search-in-list and chips/tags are allowed only in approved variant.
- Keep option grouping and ordering meaningful.

### Visual Rules
- Reuse input field tokens for closed state.
- Options panel uses dropdown surface/elevation tokens.
- Support complete state set: default, hover, focus, open, selected, disabled, error.
- Keep selected value/chip display compact and readable.

### Behavioral Rules
- Single-select typically closes on selection; multi-select behavior follows variant rules.
- Keyboard navigation across options is mandatory.
- Clear behavior and placeholder handling must be deterministic.
- Enforce disabled and validation logic.

### Accessibility Rules
- Label association required.
- Expose expanded/selected states and option semantics.
- Ensure focus management between trigger and options panel.

### Restrictions
- Do not use select for free-form text entry.
- Do not overload with excessively long ungrouped option sets without search.
- Do not hide selected state.

## Component: Uploader

### Purpose
- Ingest file(s) with visible progress, validation, and status feedback.

### Structural Rules
- Include upload trigger/drag-drop zone, file list, and per-file status area.
- Show constraints (accepted formats, size limits, quantity limits) near control.
- Provide remove/retry actions where needed.

### Visual Rules
- Use tokenized dropzone, border, icon, and status styles.
- Distinguish states clearly: idle, drag-over, uploading, success, error, disabled.
- Use semantic colors for status outcomes only.

### Behavioral Rules
- Validate files before/while uploading according to configured constraints.
- Show deterministic progress for active uploads.
- Handle failures with clear error messaging and recovery action.
- Keep file state synchronized with backend outcome.

### Accessibility Rules
- Upload control requires explicit label/instructions.
- Keyboard-accessible file selection and file-item actions are required.
- Error/success feedback must be exposed textually, not color-only.

### Restrictions
- Do not hide upload constraints until after failure.
- Do not auto-discard failed files without user feedback.
- Do not use uploader for unsupported secure/regulated file workflows without explicit safeguards.

# 3. Foundations (Quick Reference)

> This section complements the rules above with a practical reference of what exists in the GRA Design System (tokens/classes and base decisions), to support UI/UX work and design-to-development handoff.

## 3.1 Typography (Font and Classes)

- **Primary font family:** Lato (Google Fonts)
- **Used variations:** Regular, Bold, Light
- **Utility classes (examples):**
  - Sizes: `.gra-font-6xl`, `.gra-font-5xl`, `.gra-font-4xl`, `.gra-font-3xl`, `.gra-font-2xl`, `.gra-font-xl`, `.gra-font-l`, `.gra-font-m`, `.gra-font-s`, `.gra-font-xs`
  - Weights/styles: `.gra-font-bold`, `.gra-font-light`, `.gra-font-underline`

> Handoff note: when specifying sizes/styles in design files, try to map directly to these classes to reduce translation effort during development.

## 3.2 Colors (System and Semantic)

- The GRA Design System documentation defines usage through **utility classes**:
  - Background: `.gra-background-(color)-(scale)` (e.g., `.gra-background-blue-600`)
  - Text: `.gra-text-(color)-(scale)` (e.g., `.gra-text-gray-800`)

- **Color families referenced in the documentation:**
  - Primary: `blue-100 … blue-900`
  - Secondary: `lime-100 … lime-900`
  - Tertiary: `yellow-100 … yellow-900`
  - Neutral: `white`, `black`, `gray-100 … gray-900`
  - Semantic (feedback): `alert-*`, `error-*`, `info-*`, `success-*`

> Practical rule: in UI design, use semantic colors (alert/error/info/success) for messages and states; use neutrals for structure; use primary/secondary/tertiary for hierarchy and emphasis.

## 3.3 Breakpoints and Grid

- The GRA Design System defines breakpoints and grid patterns for responsiveness.
- Maintain consistent alignment, column structure, and visual rhythm across pages.

## 3.4 Spacing

- The GRA Design System defines a spacing scale for padding, margin, and gaps.
- Handoff recommendation: avoid arbitrary values and align designs to consistent spacing increments.

## 3.5 Borders

- There are specific classes for borders and state indicators (dividers, separators).
- Use borders to structure and separate content, not as decorative elements.

## 3.6 Shadows (Elevation)

- A defined elevation/shadow scale exists.
- Use shadows moderately: for contextual layering (cards, overlays), not to compensate for poor layout structure.

## 3.7 Containers and Layouts

- The GRA Design System defines container widths and responsive behavior.
- During handoff, clearly specify:
  - layout type (full-width vs container)
  - grid (number of columns)
  - horizontal and vertical spacing

## 3.8 Iconography

- The GRA Design System includes iconography guidelines and usage rules.
- Maintain consistent style (weight, size, alignment) per screen.

# 4. Templates (When Applicable)

- The GRA Design System website provides templates (e.g., homepages, detail pages, login, backoffice).
- For maximum consistency, start from a Design System template whenever the page type fits the use case.

# 5. Typography (GRA Design System)

## Font Family
- **System font:** **Lato** (Google Fonts)
- **Usage:** headings, subheadings, highlighted text, body text, captions, and buttons
- **Supported weights:** **Bold**, **Regular**, and **Light**

## Typography Utility Classes (CSS)

The GRA Design System provides utility classes to apply typography styles:

- **Font sizes:**  
  `.gra-font-6xl`, `.gra-font-5xl`, `.gra-font-4xl`, `.gra-font-3xl`, `.gra-font-2xl`, `.gra-font-xl`, `.gra-font-l`, `.gra-font-m`, `.gra-font-s`, `.gra-font-xs`

- **Font weight:**  
  `.gra-font-bold`, `.gra-font-light`  
  (Regular is the default when no weight class is applied)

- **Underline:**  
  `.gra-font-underline`

# 6. Colors (GRA Design System)

## Primary (Blue)

- `blue-100`: `#F5F9FB`
- `blue-200`: `#E1ECF2`
- `blue-300`: `#B0CCDD`
- `blue-400`: `#74A6C4`
- `blue-500`: `#3980AA`
- `blue-600`: `#327196`
- `blue-700`: `#2C6485`
- `blue-800`: `#25536F`
- `blue-900`: `#173344`

## Secundary

### Lime

- `lime-100`: `#F7F8F3`
- `lime-200`: `#E8EBDC`
- `lime-300`: `#C3CAA1`
- `lime-400`: `#95A35B`
- `lime-500`: `#687B14`
- `lime-600`: `#5C6C12`
- `lime-700`: `#516010`
- `lime-800`: `#44500D`
- `lime-900`: `#2A3108`

### Yellow

- `yellow-100`: `#FFFCF3`
- `yellow-200`: `#FFF6DA`
- `yellow-300`: `#FFE69C`
- `yellow-400`: `#FFD451`
- `yellow-500`: `#FFC107`
- `yellow-600`: `#E0AA06`
- `yellow-700`: `#C79705`
- `yellow-800`: `#A67D05`
- `yellow-900`: `#664D03`

## Neutral

- `white`: `#FFFFFF`
- `gray-100`: `#F7F7F7`
- `gray-200`: `#E8E8E8`
- `gray-300`: `#C2C2C2`
- `gray-400`: `#949494`
- `gray-500`: `#666666`
- `gray-600`: `#5A5A5A`
- `gray-700`: `#505050`
- `gray-800`: `#424242`
- `gray-900`: `#292929`
- `black`: `#000000`

## Feedback

- `alert-200`: `#FCF5DE`
- `alert-400`: `#F7CA64`
- `alert-600`: `#FFCF27`
- `error-200`: `#FFE8E3`
- `error-400`: `#FF927B`
- `error-600`: `#A0291A`
- `info-200`: `#E5EEF6`
- `info-400`: `#195893`
- `info-600`: `#103960`
- `success-200`: `#E5F0E0`
- `success-400`: `#346122`
- `success-600`: `#294C1B`

## Contour

- `contour`: `#FFCB2D`
