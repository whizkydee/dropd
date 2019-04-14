<p align="center">
  <br />
  <br />
  <br />
  <img src="https://raw.githubusercontent.com/whizkydee/dropd/master/small-logo.png?token=AIObqio0F4tIzhx-8XPxtMtiKgagz1Kbks5cu7UawA%3D%3D" width="250" height="auto" alt="dropd logo" align="center" />
  <br />
  <br />
  <h3 align="center">️️️⚡️Zero-dependency minimalistic dropdown component for Vue.</h3>

  <p align="center">
  <a href="https://npm.im/vue-dropd"><img src="https://img.shields.io/npm/v/vue-dropd.svg?color=brightgreen&style=flat-square" alt="Package version."></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PR(s)-welcome-brightgreen.svg?style=flat-square" alt="Make a pull request."></a>
  <a href="http://www.firsttimersonly.com"><img src="https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square" alt="First-timers Friendly"></a>
  </p>
</p>

## ✨ Pros:

- 📦 ~3kb (gzipped)
- 🙅‍♂️ Zero dependencies
- 📱Supports touch devices
- ⚒ CommonJS and ES Modules support
- ✅ Optimized for Accessibilty
- 🌈 Easy to customize
- 🦄 Optimized for performance
- 💅 More-reliant on CSS over JavaScript

## 🔧 Installation

```
$ npm install vue-dropd --save
```

## 📖 Usage

Register the component

```js
import Vue from 'vue'
import Dropd from 'vue-dropd'
Vue.component('dropd', Dropd)
```

Now, you can use it anywhere, so, like:

```html
<dropd
  placeholder="Choose an ice cream topping"
  @open="(list, event) => console.log(list, event)"
  :list="['Caramel', 'Peanut butter', 'Sundae', 'Oreos']"
></dropd>
```

### Props

#### `list: {Array}`

**Default:** `[]`

**Description:** An array of strings or objects to be used as dropdown items. If
you are using an array of objects, ensure you have a `label` key. e.g
`[{label: 'Caramel', value: 'caramel'}])`.

#### `closeOnBlur: {Boolean}`

**Default:** `true`

**Description:** Specifies whether the dropdown should be closed when the user
clicks away.

#### `defaultOpen: {Boolean}`

**Default:** `false`

**Description:** Specifies whether the dropdown should be open by default (i.e
when the component is created).

#### `value: {String|Object}`

**Default:** `null`

**Description:** Specifies the currently selected item. `value` can be from
`list` or manually set.

#### `placeholder: {String|Object}`

**Default:** `Please select an item`

**Description:** Specifies a placeholder for the dropdown. Very similar to the
`placeholder` attribute on html inputs.

#### `revealOn: {mousedown|mouseover}`

**Note:** Not implemented yet.

**Default:** `mousedown`

**Description:** Specifies what event should trigger opening and closing the
dropdown.

<br>

### Events

#### `open: {(list, event)}`

`list`: The list that was received via props.

`event`: If triggered by #1 condition below, `null`... If triggered by #2
`MouseEvent`... and if triggered by #3, `FocusEvent`

This event is only emitted when:

1. `defaultOpen` is set to `true`. **Note that `event` here would be set to
   `null` since the dropdown was programatically opened.**
1. A mouse down event is fired on the toggle button when the dropdown is closed.
1. The toggle button is focused via navigation with the `tab` key.

#### `item-change: {(currentItem, event)}`

`currentItem`: The new item that was selected from the list.

`event`: The `MouseEvent` of the element when clicked.

This event is only emitted when an item in the dropdown list is clicked.

## 👀 Examples

⚡️[Vue Dropd on CodeSandbox](https://codesandbox.io/s/kx874lpmxo?fontsize=14)

## 👷 Contributing

Please see [Projects](https://github.com/whizkydee/dropd/projects/1) for a list
of things to do.

1. Fork this repo and clone on your machine
1. Navigate to the main folder, `dropd`
1. Create a new branch using the format, `feature/feature-name`
1. Run `yarn install -W` to install all of the dependencies in the workspace
1. Use `yarn dev:vue` to monitor the changes you make in `/packages/vue-dropd`
   and concurrently re-build or
1. Use `yarn build:vue` to compile `packages/vue-dropd/index.vue` (shows
   `bundlesize` info too)

## 🔗 See Also

[react-dropd](https://github.com/whizkydee/dropd/tree/master/packages/react-dropd)

## 🤝 License

MIT © [Olaolu Olawuyi](https://twitter.com/mrolaolu)
