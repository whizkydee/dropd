# Dropd

## v1.1.2 / 2019-04-27

- Quick fix

## v1.1.1 / 2019-04-27

- Makes the `list` prop reactive
- Adds unit tests for `react-dropd`
- Integrates `react-dropd`, `vue-dropd` and the stylesheet
- Prevent `closeOnBlur` when `dropd` is focused via `tab` if the property is set
  to `false`

## v1.1.0 / 2019-04-15

- Fixes several browser inconsistencies
- Fixes all issues with `TouchEvent`

## v1.0.5 / 2019-04-15

- Fixes bug where `focus` is not taken from other elements to `dropd-toggle`

## v1.0.4 / 2019-04-15

- Fixes inconsistencies with `TouchEvent` and `closeOnBlurFn`

## v1.0.3 / 2019-04-15

- Fixes a [bug](https://github.com/whizkydee/dropd/issues/6) where all events
  are prevented via `closeOnBlurFn`. `stopImmediatePropagation()` and
  `preventDefault()` are irrelevant there.

## v1.0.2 / 2019-04-14

- Added support for touch devices.

## v1.0.1 / 2019-04-14

- Fixed toggle button color.

## v0.0.1 ... v1.0.0 / 2019-04-14

- Initial release
