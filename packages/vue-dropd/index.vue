<template>
  <div dir="auto" ref="dropd" class="dropd v-dropd" :data-open="open">
    <button
      type="button"
      tabindex="-1"
      class="dropd-toggle"
      @mousedown.prevent.stop="event => toggleDropd(event)"
    >
      <input
        type="search"
        autocomplete="off"
        readonly="readonly"
        @blur="closeDropd"
        :style="{
          width: 0,
          height: 0,
          margin: 0,
          padding: 0,
          border: '0 none',
          outline: '0 none',
          textAlign: 'unset',
          position: 'absolute',
          WebkitAppearance: 'none',
        }"
        class="dropd-fake-search"
        @focus="event => handleFocus(event)"
      />
      <span
        class="dropd-current is-placeholder"
        v-if="!currentItem && placeholder"
      >
        {{ placeholder.label || placeholder }}
      </span>

      <span class="dropd-current" v-if="currentItem">
        {{ currentItem.label || currentItem }}
      </span>

      <span class="dropd-caret" aria-hidden="true">
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
      :class="'dropd-list' + (open ? ' open' : '')"
    >
      <li
        :key="key"
        tabindex="-1"
        class="dropd-item"
        v-for="(item, key) in internalList"
        @mousedown.prevent.stop="event => handleItemChange(item, event)"
      >
        <a tabindex="-1" class="dropd-link">{{ item.label || item }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import '../../util/styles.scss'

const Dropd = {
  data: () => ({
    open: false,
    internalList: [],
    currentItem: null,
    internalDefaultOpen: false,
    internalRevealOn: 'mousedown',
  }),

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
    if (this.internalRevealOn === 'mousedown') {
      document.addEventListener('mousedown', this.closeOnBlurFn, false)
    }
  },

  destroyed() {
    document.removeEventListener('mousedown', this.closeOnBlurFn, false)
  },

  watch: {
    revealOn(newValue) {
      this.internalRevealOn = newValue
    },

    defaultOpen(newValue) {
      this._emitOpen(null)
      this.internalDefaultOpen = newValue
    },
  },

  methods: {
    _isDropdElem(ctx) {
      return ctx && ctx.indexOf(this.$refs.dropd) !== -1
    },

    _emitOpen(event) {
      if ('open' in this.$listeners) this.$emit('open', this.list, event)
    },

    _resetListScroll() {
      setTimeout(() => {
        if (this.$refs.list) this.$refs.list.scrollTop = 0
      }, 250)
    },

    closeOnBlurFn(event) {
      event.preventDefault()
      event.stopPropagation()

      if (this.closeOnBlur) {
        this._resetListScroll()
        this.internalDefaultOpen = false

        if (this.internalRevealOn === 'mousedown') {
          if (this.open) {
            if (this._isDropdElem(event.path)) return

            this.closeDropd()
          }
        }
      }
    },

    handleFocus(event) {
      if (!this.open) {
        this.open = true
        this._emitOpen(event)
      }
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
