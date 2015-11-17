import '../styles/components/example';

function greet(name: string) {  
  return 'Hello ' + getName([name]);
}

function getName(args) {
  [name] = args;
  return name;
}

export default greet; 