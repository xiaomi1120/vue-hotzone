/**
 * directives
 */
import addItem from './addItem'
import resizeImg from './resizeImg'
import dragItem from './dragItem'
import changeSize from './changeSize'
import autoFocus from './autoFocus'

export default {
  'v-on:addItem': addItem,
  'v-on:resize': resizeImg,
  'v-on:dragItem': dragItem,
  'v-on:changeSize': changeSize,
  'v-on:autofocus': autoFocus
}
