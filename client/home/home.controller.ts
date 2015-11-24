function Controller() {
  // Available to page
  console.log('got controller');
  return {
    name: 'World'
  };
}
Controller.$inject = [];

export default Controller;
