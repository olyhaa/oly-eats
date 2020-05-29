import { removeNulls } from '../FetchData';

describe('removeNulls', () => {
  it('null object', () => {
    const obj = null;
    const expected = {};
    expect(removeNulls(obj)).toEqual(expected);
  });

  it('undefined object', () => {
    const obj = undefined;
    const expected = {};
    expect(removeNulls(obj)).toEqual(expected);
  });

  it('empty object', () => {
    const obj = {};
    const expected = {};
    expect(removeNulls(obj)).toEqual(expected);
  });

  it('simple object with no nulls', () => {
    const obj = { name: 'Amanda' };
    const expected = obj;
    expect(removeNulls(obj)).toEqual(expected);
  });

  it('simple object with only nulls', () => {
    const obj = { name: null };
    const expected = {};
    expect(removeNulls(obj)).toEqual(expected);
  });

  it('simple object with mixture of nulls', () => {
    const obj = { name: 'Amanda', date: null };
    const expected = { name: 'Amanda' };
    expect(removeNulls(obj)).toEqual(expected);
  });

  it('nested object with no nulls', () => {
    const obj = { name: 'Amanda', nested: { name: 'Nathan' } };
    const expected = obj;
    expect(removeNulls(obj)).toEqual(expected);
  });

  it('nested object with only nulls', () => {
    const obj = { name: 'Amanda', nested: { name: null } };
    const expected = { name: 'Amanda', nested: {} };
    expect(removeNulls(obj)).toEqual(expected);
  });

  it('nested object with nulls', () => {
    const obj = { name: 'Amanda', nested: { name: 'Nathan', date: null } };
    const expected = { name: 'Amanda', nested: { name: 'Nathan' } };
    expect(removeNulls(obj)).toEqual(expected);
  });

  it('nested object with multiple nulls', () => {
    const obj = {
      name: 'Amanda',
      nested: { name: null, hello: 'world', tomorrow: null },
    };
    const expected = { name: 'Amanda', nested: { hello: 'world' } };
    expect(removeNulls(obj)).toEqual(expected);
  });

  it('empty array', () => {
    const array = [];
    const expected = array;
    expect(removeNulls(array)).toEqual(expected);
  });

  it('array of non-null objects', () => {
    const array = [{ name: 'Amanda' }, { nested: { hello: 'world' } }];
    const expected = array;
    expect(removeNulls(array)).toEqual(expected);
  });

  it('array with of null objects', () => {
    const array = [
      { name: 'Amanda' },
      { nested: { name: null, hello: 'world', tomorrow: null } },
    ];
    const expected = [{ name: 'Amanda' }, { nested: { hello: 'world' } }];
    expect(removeNulls(array)).toEqual(expected);
  });

  it('nested array with null objects', () => {
    const array = [
      { name: 'Amanda' },
      {
        nested: {
          names: [{ Amanda: null, hello: 'world' }, { Nathan: 'here' }],
          tomorrow: null,
        },
      },
    ];
    const expected = [
      { name: 'Amanda' },
      {
        nested: {
          names: [{ hello: 'world' }, { Nathan: 'here' }],
        },
      },
    ];
    expect(removeNulls(array)).toEqual(expected);
  });
});
