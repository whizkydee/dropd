<template>
  <div
    dir="auto"
    ref="dropd"
    :data-open="open"
    :class="CLASSNAMES.container + ' v-dropd'"
  >
    <button
      type="button"
      tabindex="-1"
      :class="CLASSNAMES.button"
      @mousedown.stop="event => toggleDropd(event)"
    >
      <input
        type="search"
        autocomplete="off"
        readonly="readonly"
        :style="focusBoxStyles"
        :class="CLASSNAMES.focusbox"
        @blur="handleBlurOnTabNavigation"
        @focus="event => handleFocus(event)"
      />
      <span
        v-if="!currentItem && placeholder"
        :class="CLASSNAMES.currentItem + ' ' + CLASSNAMES.placeholder"
      >
        {{ placeholder.label || placeholder }}
      </span>

      <span :class="CLASSNAMES.currentItem" v-if="currentItem">
        {{ currentItem.label || currentItem }}
      </span>

      <span :class="CLASSNAMES.caret" aria-hidden="true">
        <svg
          width="6"
          height="4"
          tabindex="-1"
          viewBox="0 0 6 4"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              id="a"
              tabindex="-1"
              d="M132.047 389.564l.644-.537a.134.134 0 0 1 .091-.028.124.124 0 0 1 .085.042l2.134 2.438 2.133-2.438a.124.124 0 0 1 .085-.042.137.137 0 0 1 .091.028l.645.537c.025.021.04.05.043.083a.115.115 0 0 1-.03.088l-2.872 3.223a.127.127 0 0 1-.19 0l-2.873-3.223a.116.116 0 0 1-.03-.088.12.12 0 0 1 .044-.083z"
            />
          </defs>
          <use
            opacity=".7"
            tabindex="-1"
            fill="#2c3c4f"
            xlink:href="#a"
            transform="translate(-132 -389)"
          />
        </svg>
      </span>
    </button>
    <ul
      ref="list"
      v-if="list && internalList"
      :aria-hidden="String(!open)"
      :class="CLASSNAMES.list + (open ? ' open' : '')"
    >
      <li
        :key="key"
        tabindex="-1"
        :class="CLASSNAMES.item"
        v-for="(item, key) in internalList"
        @mousedown.prevent.stop="event => handleItemChange(item, event)"
      >
        <a tabindex="-1" :class="CLASSNAMES.link">{{ item.label || item }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  getPath,
  CLASSNAMES,
  isDropdElem,
  listTimeout,
  focusBoxStyles,
} from '../helpers'
import '../helpers/styles.scss'

const Dropd = {
  data: () => ({
    CLASSNAMES,
    open: false,
    focusBoxStyles,
    currentItem: null,
    internalDefaultOpen: false,
    internalRevealOn: 'mousedown',
  }),

  computed: {
    internalList: {
      set: value => value,
      get: function() {
        return this.list || []
      },
    },
  },

  created() {
    // Manually update relevant internal states from props.
    this.internalList.push(...this.list)
    this.internalRevealOn = this.revealOn
    this.internalDefaultOpen = this.defaultOpen

    // Set internal `currentItem` to `value` prop if it's set.
    if (this.value) this.currentItem = this.value.label || this.value

    // Set internal open state to `true` if `defaultOpen` prop is set.
    if (this.internalDefaultOpen) {
      this.open = true
      this._emitOpen(null)
    }
  },

  mounted() {
    document.addEventListener('mousedown', this.closeOnBlurFn, true)
  },

  destroyed() {
    document.removeEventListener('mousedown', this.closeOnBlurFn, true)
  },

  methods: {
    _isDropdElem(ctx) {
      return isDropdElem(ctx, this.$refs.dropd)
    },

    _emitOpen(event) {
      if ('open' in this.$listeners) this.$emit('open', this.list, event)
    },

    _resetListScroll() {
      setTimeout(() => {
        if (this.$refs.list) this.$refs.list.scrollTop = 0
      }, listTimeout)
    },

    closeOnBlurFn(event) {
      if (this.closeOnBlur && !this._isDropdElem(getPath(event))) {
        this._resetListScroll()
        this.internalDefaultOpen = false

        if (this.open) this.closeDropd()
      }
    },

    handleFocus(event) {
      if (!this.open) {
        this.open = true
        this._emitOpen(event)
      }
    },

    handleBlurOnTabNavigation() {
      this.closeOnBlur && this.closeDropd()
    },

    closeDropd() {
      this.open = false
      this._resetListScroll()
      this.internalDefaultOpen = false
    },

    handleItemChange(item, event) {
      this.closeDropd()
      this.currentItem = item

      if ('item-change' in this.$listeners)
        this.$emit('item-change', this.currentItem, event)
    },

    toggleDropd(event) {
      this._resetListScroll()
      this.open = !this.open

      if (this.open) this._emitOpen(event)
    },
  },

  props: {
    list: { type: Array, default: [] },
    closeOnBlur: { type: Boolean, default: true },
    defaultOpen: { type: Boolean, default: false },
    value: { type: [String, Object], default: null },
    placeholder: { type: [String, Object], default: 'Please select an item' },
    revealOn: {
      default: 'mousedown',
      validator: v => ['mousedown'].indexOf(v) !== -1,
    },
  },
}

export default Dropd
</script>
