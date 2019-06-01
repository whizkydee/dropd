<template>
  <div
    dir="auto"
    ref="dropd"
    :data-open="open"
    :class="CLASSNAMES.container + ' v-dropd'"
  >
    <button
      type="button"
      @blur="handleBlur"
      :class="CLASSNAMES.button"
      @mousedown.stop="event => toggleDropd(event)"
    >
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
          focusable="false"
          viewBox="0 0 6 4"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              id="a"
              d="M132.047 389.564l.644-.537a.134.134 0 0 1 .091-.028.124.124 0 0 1 .085.042l2.134 2.438 2.133-2.438a.124.124 0 0 1 .085-.042.137.137 0 0 1 .091.028l.645.537c.025.021.04.05.043.083a.115.115 0 0 1-.03.088l-2.872 3.223a.127.127 0 0 1-.19 0l-2.873-3.223a.116.116 0 0 1-.03-.088.12.12 0 0 1 .044-.083z"
            />
          </defs>
          <use
            opacity=".7"
            fill="#2c3c4f"
            xlink:href="#a"
            transform="translate(-132 -389)"
          />
        </svg>
      </span>
    </button>

    <ul
      ref="list"
      v-if="list"
      role="listbox"
      :aria-hidden="String(!open)"
      :class="CLASSNAMES.list + (open ? ' open' : '')"
    >
      <li
        :key="key"
        role="option"
        :class="CLASSNAMES.item"
        v-for="(item, key) in list"
        @mousedown.prevent.stop="event => handleItemChange(item, event)"
      >
        {{ item.label || item }}
      </li>
    </ul>

    <slot name="dropd-list" v-if="!list"></slot>
  </div>
</template>

<script>
import '../helpers/styles.scss'
import { getPath, CLASSNAMES, isDropdElem, listTimeout } from '../helpers'

const Dropd = {
  data: () => ({
    CLASSNAMES,
    open: false,
    currentItem: null,
    internalDefaultOpen: false,
  }),

  created() {
    this.internalDefaultOpen = this.defaultOpen
    if (this.value) this.currentItem = this.value.label || this.value

    // Set internal open state to `true` if `defaultOpen` prop is set.
    if (this.internalDefaultOpen) {
      this.open = true
      this.emitOpen(null)
    }
  },

  watch: {
    value(newValue) {
      this.currentItem = newValue && (newValue.label || newValue)
    },
  },

  mounted() {
    document.addEventListener('mousedown', this.closeOnBlurFn, true)
  },

  destroyed() {
    document.removeEventListener('mousedown', this.closeOnBlurFn, true)
  },

  methods: {
    isDropdElem(ctx) {
      return isDropdElem(ctx, this.$refs.dropd)
    },

    emitOpen(event) {
      if ('open' in this.$listeners) this.$emit('open', this.list, event)
    },

    scrollTo(pos) {
      return this.$refs.list ? (this.$refs.list.scrollTop = pos) : null
    },

    resetListScroll() {
      setTimeout(() => {
        if (this.$refs.list) this.$refs.list.scrollTop = 0
      }, listTimeout)
    },

    closeOnBlurFn(event) {
      if (this.closeOnBlur && !this.isDropdElem(getPath(event))) {
        this.resetListScroll()
        this.internalDefaultOpen = false

        if (this.open) this.closeDropd()
      }
    },

    handleBlur() {
      this.closeOnBlur && this.closeDropd()
    },

    closeDropd(reset = false) {
      this.open = false
      reset && this.resetListScroll()
      this.internalDefaultOpen = false
    },

    toggleDropd(event) {
      const RIGHT_CLICK = event.button === 2
      if (!RIGHT_CLICK) {
        this.open = !this.open
        if (this.open) this.emitOpen(event)
      }
    },

    handleItemChange(item, event) {
      this.closeDropd()
      this.currentItem = item

      if ('item-change' in this.$listeners)
        this.$emit('item-change', this.currentItem, event)
    },
  },

  props: {
    list: { type: Array, default: () => [] },
    closeOnBlur: { type: Boolean, default: true },
    defaultOpen: { type: Boolean, default: false },
    value: { type: [String, Object], default: null },
    placeholder: { type: [String, Object], default: 'Select...' },
  },
}

export default Dropd
</script>
