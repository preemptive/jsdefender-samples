import _join from '../node_modules/lodash-es/join';

console.log('The alertchild.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log(_join(["I get called from", "alertchild.js!"], " "));
}