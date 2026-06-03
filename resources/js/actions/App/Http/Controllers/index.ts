import Svelte from './Svelte'
import React from './React'
import Vue from './Vue'
const Controllers = {
    Svelte: Object.assign(Svelte, Svelte),
React: Object.assign(React, React),
Vue: Object.assign(Vue, Vue),
}

export default Controllers