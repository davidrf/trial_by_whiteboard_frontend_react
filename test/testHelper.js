// test/testHelper.js
import { shallow, mount } from 'enzyme';
import 'jasmine-ajax';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';

Object.assign(global, {
  jasmineEnzyme,
  mount,
  React,
  shallow
});

beforeEach(() => {
  jasmineEnzyme();
});

// function to require all modules for a given context
let requireAll = requireContext => {
  requireContext.keys().forEach(requireContext);
};

// require all js files that end with Spec.js or Spec.jsx in the test folder
requireAll(require.context('./', true, /Spec.jsx?$/));

// require all js files except main.js in the src folder
requireAll(require.context('../src/', true, /^((?!main).)*\.jsx?$/));

// output to the browser's console when the tests run
console.info(`TESTS RAN AT ${new Date().toLocaleTimeString()}`);
