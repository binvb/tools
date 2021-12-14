import { sum } from './count'
const button = querySelector('button')
const el = querySelector('#num')

button.onClick = (e) => {
  el.innerHtml(sum(1,2))
}