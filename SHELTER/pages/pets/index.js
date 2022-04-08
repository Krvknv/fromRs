function makeString(str) {
  return str.slice(1).split("_").join(" ");
}

console.log(makeString("/example_example_example"));
