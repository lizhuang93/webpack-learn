import show from './show'
require('./main.css')


function abc() {
  console.log('abc');
}

export const $ = {
  show,
  abc
}