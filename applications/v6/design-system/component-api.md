# Component API Contract

## Accordion

Base: `gra-accordion`
Modifiers: `alwaysClose`, `alwaysOpen`
Skeleton: `<div class="gra-accordion alwaysClose"><div class="accordion-item"><button class="accordion-header" aria-expanded="false">Label</button><div class="accordion-body">...</div></div></div>`
Rules: children are `accordion-item`, `accordion-header`, `accordion-body`; initial open state uses `aria-expanded="true"`; icon version places an `icon-*` before the label inside the header.

## Avatar

Base: `graAvatarWithFoto`, `graAvatarWithoutFoto`, `graAvatarWithText`
Modifiers: none beyond content type
Skeleton: `<div class="graAvatarWithFoto"><img class="graAvatarFoto" ...></div>`, `<div class="graAvatarWithoutFoto"><i class="icon-user graAvatarLogo"></i></div>`, `<div class="graAvatarWithText">AA</div>`
Rules: choose exactly one avatar base per instance; photo variant requires `graAvatarFoto`; empty/user variant requires `graAvatarLogo`.

## Breadcrumb

Base: `gra-breadcrumb`
Modifiers: `graBcSelected`, `accessibility`
Skeleton: `<div class="gra-breadcrumb"><a class="bc">Step</a><i class="icon-chevron-right"></i><span class="bc graBcSelected">Current</span></div>`
Rules: every crumb item uses `bc`; separators are explicit icon nodes; `graBcSelected` marks the terminal crumb; `accessibility` is applied directly on each crumb node.

## Buttons

Base: text buttons `gra-btn`, icon buttons `icon`, inline action links `gra-link`
Modifiers: `btn-primary`, `btn-primary-accessibility`, `btn-primary-deactivated`, `btn-primary-error`, `btn-secondary`, `btn-secondary-deactivated`, `btn-secondary-error`, `icon-primary`, `icon-primary-accessibility`, `icon-primary-deactivated`, `icon-primary-error`, `icon-secondary`, `icon-secondary-deactivated`, `icon-secondary-error`, shared states `disabled`, `error`, icon placement helpers `iconLeft`, `iconRight`
Skeleton: `<button class="gra-btn btn-primary"><i class="icon-* iconLeft"></i>Label<i class="icon-* iconRight"></i></button>` or `<button class="icon icon-primary"><i class="icon-*"></i></button>` or `<a class="gra-link">Label</a>`
Rules: pair `disabled` with the corresponding deactivated modifier; link-style actions use `gra-link` instead of `gra-btn`; icon placement is additive, not a separate button variant.

## Cards

Base: `gra-card-informative`, `gra-card-feedback`, `gra-card-text`, `gra-card-dashboard`
Modifiers: informative cards `card-horizontal`, `card-vertical`, `card-s`, `card-m`, `disabled`, `neutral`; feedback cards `card-horizontal`, `card-vertical`, `danger`, `info`, `alert`, `success`; text cards `disabled`, `neutral`; dashboard icons `error`, `info`, `alert`, `success`
Skeleton: informative `<div class="gra-card-informative card-horizontal card-m"><div class="image">...</div><div class="details"><div class="title">...</div><div class="badges">...</div><div class="text">...</div><div class="actions">...</div></div></div>`; feedback `<div class="gra-card-feedback card-vertical success"><div class="details"><div class="title"><span>...</span><i class="icon-close card-feedback-close"></i></div>...</div></div>`; text `<div class="gra-card-text"><div class="picture"><i class="icon-*"></i></div><div class="details">...</div></div>`; dashboard `<div class="gra-card-dashboard"><div class="title"><span>...</span><div class="dashboard-icon info"><i class="icon-*"></i></div></div><div class="value">...</div></div>`
Rules: informative cards optionally include `actions`; feedback cards keep close control inside `title`; dashboard cards use exactly one `dashboard-icon` tone modifier.

## Checkbox

Base: `form-check`
Modifiers: `form-check-input-error`, `form-check-accessibility`, `indeterminate-checkbox`
Skeleton: `<div class="form-check"><input class="form-check-input" type="checkbox" id="x"><label class="form-check-label" for="x">Label</label></div>`
Rules: checkbox structure is always input plus label; error styling is on the input; accessibility variant wraps the control with `form-check-accessibility`; state still comes from native `checked` and `disabled`.

## Cookies

Base: `gra-cookies-consent`
Modifiers: none
Skeleton: `<div class="gra-cookies-consent"><div class="text"><p>...</p></div><div class="actions"><button class="gra-btn btn-secondary">...</button><button class="gra-btn btn-primary">...</button></div></div>`
Rules: consent copy lives in `.text`; action area is `.actions`; examples use secondary configuration plus primary accept action.

## Date Picker

Base: wrapper `gra-daterangepicker-container`, input `daterangepickerInput`
Modifiers: `rangeDatePicker`, `simpleDatePicker`, `required-field`, `disabled`, `readonly`, `form-error`, `form-accessibility`
Skeleton: `<div class="gra-daterangepicker-container"><input class="form form-control daterangepickerInput simpleDatePicker" data-format-date="YYYY-MM-DD"></div>`
Rules: choose exactly one picker mode per input, `rangeDatePicker` or `simpleDatePicker`; labels may add `required-label`; informational/error copy uses `graInfoField` or `graRequiredField`; date format is configured with `data-format-date`.

## Divider

Base: divider utility class only
Modifiers: `gra-hr-horizontal-dark-s|m|l|xl`, `gra-hr-horizontal-light-s|m|l|xl`, `gra-hr-vertical-dark-s|m|l|xl`, `gra-hr-vertical-light-s|m|l|xl`
Skeleton: `<hr class="gra-hr-horizontal-dark-s">` or `<div class="gra-hr-vertical-light-m"></div>`
Rules: divider is standalone; pick exactly one orientation plus one tone/size token.

## Dropdown

Base: single select `gra-select gra-simple-select form-select`, multi select `gra-select gra-multiple-select form-select`
Modifiers: single select `required-field`, `disabled`, `form-accessibility`, `with-search`; multi select `with-checkbox`, `with-radiobox`
Skeleton: `<select class="gra-select gra-simple-select form-select"><option>Selecione</option></select>` or `<select class="gra-select gra-multiple-select with-checkbox form-select" multiple>...</select>`
Rules: keep native `<select>` markup; JS enhances `gra-select`; readonly single-select is represented as disabled in examples; validation and helper copy use the same `required-label`, `graRequiredField`, `graInfoField` conventions as text inputs.

## Feedback Messages

Base: `gra-feedback-msg`
Modifiers: `error`, `info`, `success`, `alert`
Skeleton: `<div class="gra-feedback-msg error"><span class="text">...</span><span class="closeIcon"></span></div>`
Rules: every message contains `.text` and `.closeIcon`; tone is exclusive.

## File Upload

Base: `gra-upload-files`
Modifiers: popup companion `filesUploaded`
Skeleton: `<div class="gra-upload-files" id="fUpload1"><div class="fuTop">...</div><div class="dropContainer" data-id-upload="fUpload1"><div class="dropContainerContent"><a class="gra-link ...">...</a><input class="fileInput" type="file"></div></div><div class="fuBottom"></div></div>`
Rules: upload shell uses `fuTop`, `dropContainer`, `dropContainerContent`, `fileInput`, `fuBottom`; file constraints use input data attrs like `data-max-files` and `data-max-size`; uploaded-file list is rendered in a standard `gra-popup.filesUploaded`.

## Filters

Base: `gra-filter`
Modifiers: `open`, `inlineFilter`
Skeleton: `<div class="gra-filter"><div class="gra-filter-content"><div class="gra-filter-input"><input class="gra-input-filter"><div class="suggestions"></div><a class="gra-link openFilter">...</a><a class="gra-link closeFilter">...</a><button class="gra-btn btn-primary searchBtn">...</button></div></div><div class="gra-filter-box"><form class="gra-form-filter">...</form><div class="actions"><a class="gra-link clearFilter">...</a><button class="gra-btn btn-primary submitFilter">...</button></div></div></div>`
Rules: filter trigger bar and filter panel are separate siblings; `.gra-filter-box` is the collapsible content; counter badges use `countFilters`, `countFiltersMobile`, `gra-badge error`; inline variant keeps the trigger row inside the layout instead of using a search field as the lead element.

## Footer

Base: `gra-footer-backoffice`, `gra-footer-opt-1`, `gra-footer-opt-2`, `gra-footer-opt-3`
Modifiers: companion `gra-back-to-top`
Skeleton: `<div class="gra-back-to-top gra-container"><button class="icon icon-primary backToTop">...</button></div><div class="gra-footer-opt-1"><div class="footer-row first-row"><div class="footer-content gra-container">...</div></div>...</div>`
Rules: footer variants are separate root classes, not mixins; shared child patterns include `footer-row`, `footer-content`, `logo-description`, `gra-logos`, `logosLeft`, `links`, `columnFooter`, `contactsContent`, `contacts`, `iconContent`, `socialIcons`, `socialIcon`; back-to-top is rendered as a sibling block.

## Header

Base: desktop `gra-desktop-header`, mobile `gra-mobile-header`
Modifiers: `large`, `notFixed`, `header-primary`, `backoffice`
Skeleton: desktop `<div class="gra-desktop-header large notFixed"><div class="header-content gra-container"><a class="logo_a">...</a><div class="menus_desktop"><ul class="menu"><li class="menu-first-level">...</li></ul></div></div></div>`; mobile `<div class="gra-mobile-header notFixed"><div class="mobile-header">...</div><div class="menu_mobile display-all-menu"><div class="display-menu"><ul class="menu-mobile">...</ul></div></div></div>`
Rules: desktop and mobile markup are separate; nested navigation uses literal nested `<ul>` trees plus `withChilds`, `withSubmenu`, `submenu_1`, `submenu_2`, `back-option`; optional action areas include search, theme toggle, notification badge, settings, avatar, credentials, logout; `header-primary` and `backoffice` are theme/layout modifiers on the root header block.

## Homepage Carousel

Base: `gra-carousel-homepage`
Modifiers: `data-nav="true"`, inner carousel modifiers `onlyImg`, `with-filter`
Skeleton: `<div class="gra-carousel-homepage" data-nav="true"><div class="owl-carousel onlyImg|with-filter"><div class="item">...</div></div><div class="custom-nav"><div class="nav-card gra-background-blue-900" data-slide="0">...</div></div><div class="carousel-message"><div class="contentText">...</div></div></div>`
Rules: slide body may be image-only, image plus `.text-content`, or image plus overlay `.content`; nav cards are separate from Owl items and use `data-slide`; option 3 embeds a full `gra-filter` inside `contentFilter`.

## Images Carousel

Base: `gra-carousel-container`
Modifiers: `carousel-l`, `carousel-m`, `carousel-s`, `carousel-mobile`
Skeleton: `<div class="gra-carousel-container carousel-l"><div class="active-image"><img ...></div><div class="carousel-navigation"><div class="nav-left"><button class="icon icon-secondary owl-nav left-nav">...</button></div><div id="image-carousel" class="owl-carousel"><div class="item"><img ...></div></div><div class="nav-right"><button class="icon icon-secondary owl-nav right-nav">...</button></div></div></div>`
Rules: every carousel has one active image area plus one thumbnail track; controls are explicit left/right button wrappers; size is selected by exactly one root modifier.

## Inputs

Base: field controls `form form-control`
Modifiers: `required-label`, `required-field`, `required-field-group`, `form-error`, `gra-counter-field`, `gra-phone-number`, `input-code`, `gra-password`, state classes `disabled`, `readonly`, `error`
Skeleton: text `<label>...</label><input class="form form-control">`; textarea `<textarea class="form form-control"></textarea>`; contact `<div class="gra-input-group"><select class="gra-select gra-simple-select form-select"></select><input class="form form-control gra-phone-number"></div>`; code `<div class="gra-input-group-code gra-input-group"><input class="form form-control input-code" maxlength="1">...</div>`; password `<div class="gra-password-container"><input class="form form-control gra-password" type="password"></div>`
Rules: helper copy uses `graRequiredField`, `graRequiredFieldGroup`, `graInfoField`, `graCounterWords`; grouped inputs put validation state on both select and field when required; OTP/code uses repeated one-character `input-code` fields.

## Lists

Base: `gra-list`
Modifiers: none
Skeleton: `<div class="gra-list"><div class="headerList"><div class="title">...</div><div class="status">...</div></div><div class="bodyList"><p>...</p></div></div>`
Rules: header is split between title and optional status cluster; status cluster reuses `gra-status`.

## Loader

Base: `gra-spinner`
Modifiers: `small`, `medium`, `large`, `xLarge`
Skeleton: `<div class="gra-spinner medium"></div>`
Rules: size is selected by one modifier; same spinner class is reused inside file upload and modal states.

## Menu Backoffice

Base: `gra-menuBackoffice`
Modifiers: recursive item modifier `withSub`
Skeleton: `<div class="gra-menuBackoffice"><div class="hamburgers"><i class="icon-menu hamburgerBackoffice"></i><i class="icon-times hamburgerBackoffice hamburger_close"></i></div><ul class="scrollUl"><li class="liOption"><a>...</a></li><li class="withSub"><div class="uldiv"><div class="setinha liOption"><div class="menuBckitem subitem"><span class="spanoption">...</span></div><i class="icon-chevron-down-small image-down"></i></div></div><ul class="subUl">...</ul></li></ul></div>`
Rules: top-level items use `liOption`; badge counters are `count1` and `count2` with `gra-badge`; recursive submenus reuse the same `withSub > uldiv + subUl` pattern.

## Notifications

Base: item `gra-notification`, shell `gra-notifications-box`
Modifiers: item `new`; shell `readOne`
Skeleton: item `<div class="gra-notification new"><div class="titleNotif">...</div><div class="description">...</div><div class="dateTime"><div class="date">...</div><div class="time">...</div></div></div>`; shell `<div class="gra-notifications-box"><div class="maskNotif"></div><div class="gra-notification-container"><div class="header">...</div>...</div></div>`
Rules: item tone indicator is composed by nesting `gra-status secondary ...Icon` inside `titleNotif`; list shell includes `optionsClose`, `moreOptions`, `moreOptionsBox`, `option markRead`, `option deleteAll`, `close`; detail view is a separate `gra-notifications-box readOne` block with `goBack`.

## Pagination

Base: `gra-pagination`
Modifiers: none
Skeleton: `<div class="gra-pagination" data-is-external-content="false" data-items-per-page="4" data-element-id="tableId"><div class="results"><span class="fromIndex"></span>...</div><div class="resultsMobile">...</div><div class="navigation"><button class="prev icon icon-secondary">...</button><div class="page-numbers"></div><button class="next icon icon-secondary">...</button></div></div>`
Rules: JS reads `data-is-external-content`, `data-items-per-page`, `data-element-id`, and optional `data-total-items`; desktop and mobile result counters are separate DOM nodes.

## Popup

Base: `gra-popup`
Modifiers: `no-border`, `with-avatar`, `align-center`
Skeleton: `<div class="gra-popup" id="popupId"><div class="popupMask"></div><div class="popupContainer"><div class="popupHeader no-border">...</div><div class="popupContent">...</div><div class="popupFooter"><div class="gra-hr-horizontal-dark-s gra-padding-bottom-xs"></div><div>...</div></div></div></div>`
Rules: open triggers use `.openPopup[data-id-popup]`; close controls use `.closePopup`; optional pieces are `.popupGradient`, `.popupImg`, avatar block in header, and arbitrary form content in `.popupContent`.

## Progress Bar

Base: `gra-progress-bar`
Modifiers: `.error` on `progress-bar-container`
Skeleton: `<div class="gra-progress-bar" data-progress-default="50"><span class="progressPercentage"></span><div class="progress-bar-container"><div class="progress-bar"></div></div><label>...</label><input class="form form-control progressInput"></div>`
Rules: percentage text and bar track are required; initial value is set by `data-progress-default`; the example input is a behavior demo hook, not required presentation chrome.

## Radio Button

Base: `form-check`
Modifiers: `custom-radiobox`, `error`, `form-check-accessibility`, `radiobox`
Skeleton: `<div class="form-check"><input class="form-check-input custom-radiobox" type="radio" id="x"><label class="form-check-label" for="x">Label</label></div>`
Rules: radio appearance depends on `custom-radiobox`; error state is applied to the input; accessibility variant keeps the same markup with an extra container modifier.

## Search Input

Base: `gra-search-container`
Modifiers: `required-field`, `error`
Skeleton: `<label>...</label><div class="gra-search-container"><input class="form form-control" type="search"></div>`
Rules: search field still uses the generic `form form-control` input; required and info/error messaging reuse `required-label`, `graRequiredField`, and `graInfoField`.

## Star Validation

Base: `gra-rate`
Modifiers: `half`
Skeleton: `<fieldset class="gra-rate"><input type="radio" id="rating10"><label for="rating10"></label><input type="radio" id="rating9"><label class="half" for="rating9"></label>...</fieldset>`
Rules: stars are alternating `input + label` pairs; half-step ratings are expressed on the label with `half`.

## Status

Base: `gra-status`
Modifiers: `primary`, `secondary`, tone markers `alertIcon`, `infoIcon`, `dangerIcon`, `successIcon`
Skeleton: primary `<div class="gra-status primary dangerIcon"><i class="icon-circle-minus"></i><span>Perigo</span></div>`; secondary `<div class="gra-status secondary dangerIcon"><span class="icon"></span><span>Perigo</span></div>`
Rules: tone marker is required with both primary and secondary variants; primary status uses an actual `icon-*`; secondary status uses an empty `.icon` marker element.

## Switch

Base: `gra-switch`
Modifiers: `disabled`, `error`
Skeleton: `<label class="gra-switch"><input type="checkbox"><span class="slider round"></span></label>`
Rules: switch markup is always label > input + `.slider.round`; disabled/error live on the root label; surrounding text is external content and may sit before or after the switch.

## Tab

Base: `gra-tabs`, item `gra-tab`
Modifiers: `active`, `disabled`, `iconText`, `textNotif`
Skeleton: header-only `<div class="gra-tabs"><a class="gra-tab iconText textNotif active"><i class="icon-files"></i>Label<span class="gra-badge danger">1</span></a></div>`; content `<div class="gra-tab-container" id="tabs1"><div class="gra-tabs"><a class="gra-tab" data-gra-tab="tab1">...</a></div><div id="tabs1-tab1" class="tab-content">...</div></div>`
Rules: content tabs need `data-gra-tab` on the trigger and a matching pane id `${containerId}-${data-gra-tab}`; JS adds active state to the selected trigger and pane.

## Table

Base: `gra-table-wrapper > table.gra-table`
Modifiers: `responsive-vertical`, `sortable`, `numeric`, `asc`, `desc`
Skeleton: `<div class="gra-table-wrapper"><table class="gra-table responsive-vertical" id="tableId"><thead><tr><th class="sortable numeric asc">...</th></tr></thead><tbody><tr><td data-header="Header"><span class="withIcon">...</span></td><td class="numericValue">...</td><td class="options">...</td></tr></tbody></table></div>`
Rules: vertical responsive mode requires `data-header` on each data cell; sortable columns mark the `<th>` directly; options/actions live in a terminal `.options` cell; status pills inside cells reuse `gra-tag`.

## Tag

Base: `gra-tag`, companion `gra-badge`
Modifiers: style `primary`, `secondary`; tone `alert`, `info`, `danger`, `success`; optional `withIcon`
Skeleton: `<span class="gra-tag primary alert">Alerta</span>` or `<div class="gra-tag secondary success withIcon"><i class="icon-circle-success"></i><span>Sucesso</span></div>` or `<span class="gra-badge danger">1</span>`
Rules: choose one style modifier and one tone modifier; `withIcon` requires icon plus text children; badges are standalone count markers, not tabular tags.

## Tooltip

Base: `gra-tooltip`
Modifiers: `.tooltiptext` position classes `topCenter`, `topLeft`, `topRight`, `bottomCenter`, `bottomLeft`, `bottomRight`, `left`, `right`
Skeleton: `<span class="gra-tooltip"><span class="tooltiptext topCenter">Lorem ipsum</span><b>trigger</b></span>`
Rules: tooltip content lives in `.tooltiptext`; position is chosen by exactly one modifier on that node.

## Wizard

Base: `gra-wizard-container`
Modifiers: `wizard-vertical`; step states `active`, `completed`, `disabled`, `error`; line states `active-green`, `active-line`, `error`; optional label helpers `withLabelBottom`, `withDesc`
Skeleton: `<div class="gra-wizard-container"><div class="steps-indicator"><div class="withLabelBottom"><div class="step active" data-step="0"><span>1</span></div><div class="withDesc">Lorem</div></div><div class="line active-line"></div>...</div><form class="wizard-form"><div class="wizard-step active" data-step="0">...</div>...</form></div>`
Rules: indicator order and `.wizard-step[data-step]` order must match; button hooks are `.nextStep` and `.prevStep`; form-based wizards use `.wizard-form`, info-only flows may use `.wizard-steps-content`; required validation relies on `input.required-field` inside the active step.
