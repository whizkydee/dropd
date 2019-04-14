<p align="center">
  <br />
  <br />
  <br />
  <img src="https://raw.githubusercontent.com/whizkydee/dropd/master/small-logo.png?token=AIObqio0F4tIzhx-8XPxtMtiKgagz1Kbks5cu7UawA%3D%3D" width="250" height="auto" alt="dropd logo" align="center" />
  <br />
  <br />
  <h3 align="center">⚡️Zero-dependency minimalistic dropdown component for React.</h3>

  <p align="center">
  <a href="https://npm.im/react-dropd"><img src="https://img.shields.io/npm/v/react-dropd.svg?color=brightgreen&style=flat-square" alt="Package version."></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PR(s)-welcome-brightgreen.svg?style=flat-square" alt="Make a pull request."></a>
  <a href="http://www.firsttimersonly.com"><img src="https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square" alt="First-timers Friendly"></a>
  </p>
</p>

## ✨ Pros:

- 📦 ~3kb (gzipped)
- ⚒ CommonJS and ES Modules support
- ✅ Optimized for Accessibilty
- 🌈 Easy to customize
- 🦄 Optimized for performance
- 💅 More-reliant on CSS over JavaScript

## 🔧 Installation

```
$ npm install react-dropd --save
```

## 📖 Usage

Import the component

```js
import Dropd from 'react-dropd'
```

Now, you can use it:

```jsx
<Dropd
  placeholder="Choose an ice cream topping"
  onOpen={(list, event) => console.log(list, event)}
  list={['Caramel', 'Peanut butter', 'Sundae', 'Oreos']}
/>
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
when the component is mounted).

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
dropdown. <br>

### Events

#### `onOpen: {(list, event)}`

`list`: The list that was received via props.

`event`: If triggered by #1 condition below, `null`, otherwise `SyntheticEvent`
of whatever triggered opening of the dropdown.

This event is only emitted when:

1. `defaultOpen` is set to `true`. **Note that `event` here would be set to
   `null` since the dropdown was programatically opened.**
1. A mouse down event is fired on the toggle button when the dropdown is closed.
1. The toggle button is focused via navigation with the `tab` key.

#### `onItemChange: {(currentItem, event)}`

`currentItem`: The new item that was selected from the list.

`event`: `SyntheticEvent` of the element when clicked.

This event is only emitted when an item in the dropdown list is clicked.

## 👀 Examples

⚡️
[React Dropd on CodeSandbox](https://codesandbox.io/s/0y3x7jwv0n?fontsize=14)

## 🔗 See Also

[vue-dropd](https://github.com/whizkydee/dropd/tree/master/packages/vue-dropd)

## 🤝 License

MIT © [Olaolu Olawuyi](https://twitter.com/mrolaolu)
