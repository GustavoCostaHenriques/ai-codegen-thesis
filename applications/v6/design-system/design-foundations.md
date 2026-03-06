# Design Foundations Contract

## Themes

- Default theme tokens live in `:root`.
- Alternate theme: `body.theme-marca-servicos` overrides the blue and gray scales and inherits the remaining default tokens.
- Dark mode is applied with `body.dark-mode`; most dark-mode changes are component overrides, not a second root token file.

## Color Tokens

- Blue: `--color_blue_100 = #F5F9FB`, `--color_blue_200 = #E1ECF2`, `--color_blue_300 = #B0CCDD`, `--color_blue_400 = #74A6C4`, `--color_blue_500 = #3980AA`, `--color_blue_600 = #327196`, `--color_blue_700 = #2C6485`, `--color_blue_800 = #25536F`, `--color_blue_900 = #173344`
- Electric: `--color_electric_100 = #ECFEFF`, `--color_electric_200 = #D4FCFF`, `--color_electric_300 = #BDF9FF`, `--color_electric_400 = #8EF4FF`, `--color_electric_500 = #76F2FF`, `--color_electric_600 = #75F2FF`, `--color_electric_700 = #5DEFFF`, `--color_electric_800 = #33EBFF`, `--color_electric_900 = #00E6FF`
- Lime: `--color_lime_100 = #F7F8F3`, `--color_lime_200 = #E8EBDC`, `--color_lime_300 = #C3CAA1`, `--color_lime_400 = #95A35B`, `--color_lime_500 = #687B14`, `--color_lime_600 = #5C6C12`, `--color_lime_700 = #516010`, `--color_lime_800 = #44500D`, `--color_lime_900 = #2A3108`
- Yellow: `--color_yellow_100 = #FFFCF3`, `--color_yellow_200 = #FFF6DA`, `--color_yellow_300 = #FFE69C`, `--color_yellow_400 = #FFD451`, `--color_yellow_500 = #FFC107`, `--color_yellow_600 = #E0AA06`, `--color_yellow_700 = #C79705`, `--color_yellow_800 = #A67D05`, `--color_yellow_900 = #664D03`
- Gray: `--color_gray_100 = #F7F7F7`, `--color_gray_200 = #E8E8E8`, `--color_gray_300 = #C2C2C2`, `--color_gray_400 = #949494`, `--color_gray_500 = #666666`, `--color_gray_600 = #5A5A5A`, `--color_gray_700 = #505050`, `--color_gray_800 = #424242`, `--color_gray_900 = #292929`
- Semantic / neutrals: `--color_white = #FFFFFF`, `--color_black = #000000`, `--color_alert_200 = #FCF5DE`, `--color_alert_400 = #F7CA64`, `--color_alert_600 = #FFCF27`, `--color_error_200 = #FFE8E3`, `--color_error_400 = #FF927B`, `--color_error_600 = #A0291A`, `--color_info_200 = #E5EEF6`, `--color_info_400 = #195893`, `--color_info_600 = #103960`, `--color_success_200 = #E5F0E0`, `--color_success_400 = #346122`, `--color_success_600 = #294C1B`, `--color_contour = #FFCB2D`
- Utility families mirror token names exactly: `gra-background-*`, `gra-text-*`, `gra-border-*`; special aliases also exist for `...-white`, `...-black`, and `...-contour`.

## Alternate Theme Overrides

- `body.theme-marca-servicos` blue scale: `--color_blue_100 = #EFF6FF`, `--color_blue_200 = #D7E6FB`, `--color_blue_300 = #B1CBF1`, `--color_blue_400 = #A7C6F2`, `--color_blue_500 = #8FB6EE`, `--color_blue_600 = #78A7EA`, `--color_blue_700 = #6097E6`, `--color_blue_800 = #3077DD`, `--color_blue_900 = #0057D5`
- `body.theme-marca-servicos` gray scale: `--color_gray_100 = #F7F7F7`, `--color_gray_200 = #E8E8E8`, `--color_gray_300 = #919090`, `--color_gray_400 = #6D6B6B`, `--color_gray_500 = #4D4C4C`, `--color_gray_600 = #303030`, `--color_gray_700 = #212121`, `--color_gray_800 = #171717`, `--color_gray_900 = #000000`

## Typography

- Base font family: `Lato`
- Icon font family: `gra`
- Size scale: `gra-font-xs = 12/100%`, `gra-font-s = 14/100%`, `gra-font-m = 16/24`, `gra-font-l = 18/24`, `gra-font-xl = 24/28.8`, `gra-font-2xl = 32/100%`, `gra-font-3xl = 40/100%`, `gra-font-4xl = 48/100%`, `gra-font-5xl = 56/100%`, `gra-font-6xl = 80/100%`
- Weight / decoration utilities: `gra-font-light`, `gra-font-bold`, `gra-font-underline`
- Shared small-text aliases use the same sizing as `gra-font-xs`: `graCounterWords`, `graInfoField`, `graRequiredFieldGroup`, `graRequiredField`

## Spacing Scale

- Scale values: `0 = 0`, `5xs = 2px`, `4xs = 4px`, `3xs = 8px`, `2xs = 12px`, `xs = 16px`, `s = 24px`, `m = 32px`, `l = 40px`, `xl = 48px`, `2xl = 56px`, `3xl = 64px`, `4xl = 72px`, `5xl = 80px`, `6xl = 96px`, `7xl = 120px`
- Margin generators: `gra-margin-*`, `gra-margin-x-*`, `gra-margin-y-*`, `gra-margin-top-*`, `gra-margin-right-*`, `gra-margin-bottom-*`, `gra-margin-left-*`
- Padding generators: `gra-padding-*`, `gra-padding-x-*`, `gra-padding-y-*`, `gra-padding-top-*`, `gra-padding-right-*`, `gra-padding-bottom-*`, `gra-padding-left-*`

## Radius Scale

- `gra-rounded-s = 4px`
- `gra-rounded-m = 8px`
- `gra-rounded-l = 12px`
- `gra-rounded-xl = 16px`
- `gra-rounded-xxl = 32px`

## Shadow Scale

- Box shadows: `gra-box-shadow-xs = 0 1px 2px #0c494f1a`, `gra-box-shadow-s = 0 2px 4px #0c494f1a`, `gra-box-shadow-m = 0 4px 6px #0c494f1a`, `gra-box-shadow-l = 0 6px 8px #0c494f1a`, `gra-box-shadow-xl = 0 8px 10px #0c494f1a`, `gra-box-shadow-xxl = 0 4px 40px #0c494f1a`
- Text shadows: `gra-text-shadow-xs = 0px 1px 2px rgba(12,73,79,.1)`, `gra-text-shadow-s = 0px 2px 4px rgba(12,73,79,.1)`, `gra-text-shadow-m = 0px 4px 6px rgba(12,73,79,.1)`, `gra-text-shadow-l = 0px 6px 8px rgba(12,73,79,.1)`, `gra-text-shadow-xl = 0px 8px 10px rgba(12,73,79,.1)`, `gra-text-shadow-xxl = 0px 4px 40px rgba(12,73,79,.1)`

## Divider Token Groups

- Horizontal dark: `gra-hr-horizontal-dark-s`, `gra-hr-horizontal-dark-m`, `gra-hr-horizontal-dark-l`, `gra-hr-horizontal-dark-xl`
- Horizontal light: `gra-hr-horizontal-light-s`, `gra-hr-horizontal-light-m`, `gra-hr-horizontal-light-l`, `gra-hr-horizontal-light-xl`
- Vertical dark: `gra-hr-vertical-dark-s`, `gra-hr-vertical-dark-m`, `gra-hr-vertical-dark-l`, `gra-hr-vertical-dark-xl`
- Vertical light: `gra-hr-vertical-light-s`, `gra-hr-vertical-light-m`, `gra-hr-vertical-light-l`, `gra-hr-vertical-light-xl`

## Utility Tokens

- Width / height / position: `gra-width-100`, `gra-height-100`, `gra-pos-relative`
- Display / alignment helpers used by components: `gra-d-block`, `gra-d-none`, `gra-d-flex`, `gra-d-flex-center`, `gra-flex-row`, `gra-flex-grow`, `gra-text-start`, `gra-text-center`, `gra-text-end`

## Iconography

- Icon API is one class per glyph on the `gra` icon font.
- Glyph classes: `icon-accessibility`, `icon-app`, `icon-archive`, `icon-arrow-circle-down`, `icon-arrow-circle-left`, `icon-arrow-circle-right`, `icon-arrow-circle-up`, `icon-arrow-down`, `icon-arrow-down-left-underline`, `icon-arrow-left`, `icon-arrow-right`, `icon-arrow-up`, `icon-arrow-up-left-underline`, `icon-bar-chart`, `icon-bell`, `icon-bell-full`, `icon-bell-notification`, `icon-boat`, `icon-book`, `icon-building`, `icon-bus`, `icon-calculator`, `icon-calculator-bracket-close`, `icon-calculator-bracket-open`, `icon-calculator-divide`, `icon-calculator-equal`, `icon-calculator-greater-or-equal`, `icon-calculator-less-or-equal`, `icon-calculator-minus`, `icon-calculator-parenthesis-close`, `icon-calculator-parenthesis-open`, `icon-calculator-plus`, `icon-calculator-semicolon`, `icon-calculator-times`, `icon-calendar`, `icon-camera`, `icon-camera-slash`, `icon-car`, `icon-card-solid`, `icon-cards`, `icon-cart`, `icon-chat-message`, `icon-chat-reply`, `icon-chat-typing`, `icon-chevron-down`, `icon-chevron-down-small`, `icon-chevron-left`, `icon-chevron-left-small`, `icon-chevron-right`, `icon-chevron-up`, `icon-cidadao`, `icon-circle`, `icon-circle-add`, `icon-circle-add-solid`, `icon-circle-arrow-down-left-solid`, `icon-circle-arrow-up-right-solid`, `icon-circle-check-solid`, `icon-circle-danger`, `icon-circle-dot`, `icon-circle-empty`, `icon-circle-info`, `icon-circle-info-solid`, `icon-circle-minus`, `icon-circle-minus-solid`, `icon-circle-success`, `icon-circle-times-solid`, `icon-clock`, `icon-close`, `icon-danger-solid`, `icon-delete`, `icon-divide`, `icon-download`, `icon-drop`, `icon-duplicate`, `icon-edit`, `icon-ellipsis-v`, `icon-euro`, `icon-expand`, `icon-eye`, `icon-eye-slash`, `icon-facebook`, `icon-favorite`, `icon-file`, `icon-file-download`, `icon-file-excel`, `icon-file-pdf`, `icon-file-upload`, `icon-files`, `icon-filter`, `icon-folder`, `icon-folder-add`, `icon-folder-remove`, `icon-google`, `icon-gra-icon`, `icon-headphone`, `icon-help`, `icon-hiperlink`, `icon-home`, `icon-image`, `icon-image-add`, `icon-image-download`, `icon-iniciativa`, `icon-instagram`, `icon-level-down`, `icon-level-up`, `icon-linear`, `icon-link`, `icon-linkedin`, `icon-list`, `icon-list-solid`, `icon-lock`, `icon-lock-slash`, `icon-login`, `icon-logout`, `icon-massa`, `icon-menu`, `icon-message`, `icon-message-search`, `icon-message-unread`, `icon-microphone`, `icon-microphone-slash`, `icon-moon`, `icon-more`, `icon-music`, `icon-news`, `icon-nome-steps`, `icon-order-down`, `icon-order-up`, `icon-paperclip`, `icon-percent`, `icon-phone`, `icon-pin`, `icon-pointer-down`, `icon-pointer-left`, `icon-pointer-right`, `icon-pointer-up`, `icon-primary`, `icon-primary-accessibility`, `icon-primary-deactivated`, `icon-primary-error`, `icon-print`, `icon-radio`, `icon-radiobutton`, `icon-ramificao`, `icon-refresh`, `icon-return`, `icon-right`, `icon-rotate-right`, `icon-save`, `icon-scale`, `icon-search`, `icon-search-solid`, `icon-secondary`, `icon-secondary-deactivated`, `icon-secondary-error`, `icon-settings`, `icon-share`, `icon-sitemap`, `icon-small-arrow-left`, `icon-small-arrow-up`, `icon-sort`, `icon-square-empty`, `icon-star`, `icon-star-half-solid`, `icon-star-solid`, `icon-stats`, `icon-student`, `icon-sun`, `icon-tag`, `icon-task`, `icon-task-notification`, `icon-thumbs-down`, `icon-thumbs-up`, `icon-times`, `icon-trash`, `icon-truck`, `icon-tumblr`, `icon-upload`, `icon-user`, `icon-users`, `icon-video`, `icon-volume`, `icon-volume-slash`, `icon-wallet`, `icon-warning`, `icon-word-file`, `icon-x-twitter`, `icon-youtube`, `icon-zoom-in`, `icon-zoom-out`
