/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const itIsExist = (data: any[], item: any, key: string): boolean =>
  data.filter((x: any) => x[key] === item[key]).length ? true : false;

it('renders correctly', () => {
  renderer.create(<App />);
});

it('itIsExist function should return false  ', () => {
  expect(itIsExist([{ name: 'devran' }], { name: 'mehmet' }, 'name')).toBe(
    false
  );
});

it('_itIsExist function should return true ', () => {
  expect(itIsExist([{ name: 'devran' }], { name: 'devran' }, 'name')).toBe(
    true
  );
});
