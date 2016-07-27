// test/testHelper.js
import { shallow, mount } from 'enzyme';
import 'jasmine-ajax';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import createResponseFromFixture from './support/createResponseFromFixture';

Object.assign(global, {
  jasmineEnzyme,
  mount,
  React,
  shallow,
  createResponseFromFixture
});

beforeEach(() => {
  jasmineEnzyme();
});

// require all js files that end with Spec.js or Spec.jsx in the test folder
let testFilesContext = require.context('.', true, /Spec.jsx?$/);
testFilesContext.keys().forEach(testFilesContext);

// output to the browser's console when the tests run
console.info(`TESTS RAN AT ${new Date().toLocaleTimeString()}`);
