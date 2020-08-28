console.log('The alert.js module has loaded! See the network tab in dev tools...');

export default () => {
  import(/* webpackChunkName: "alertchild" */ "./alertchild").then(module => {
    const alertChild = module.default;
    
    alertChild();
  }).catch(_error => 'An error occured while loading the alertchild component');

  console.log("I get called from alert.js!");
}
