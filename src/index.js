import * as R from 'ramda';
import Dexie from 'dexie';
import uuid from 'uuid';

const db = new Dexie('uploader');
db.version(1).stores({ files: '&id' });

const add = data => db.files.put(data);
const remove = id => db.files.delete(idbrows);
const list = () => db.files.toArray().then(
  R.indexBy(R.prop('id'))
);

let v8gcfix;
const prompt = attrs => new Promise(resolve => {
  const o = Object.assign(document.createElement('input'), {
    ...attrs,
    value: '',
    type: 'file',
    onchange: R.compose(
      resolve,
      R.map(
        file => ({ id: uuid.v4(), file })
      ),
      Array.from,
      R.path(['target', 'files'])
    )
  });
  o.click();
  v8gcfix = o;
});

const clear = () => {
  const element = (type, props) => document.getElementById(
    'root'
  ).appendChild(
    Object.assign(
      document.createElement(type),
      props
    )
  );

  const render = ({ id, file }) => element('img', {
    src: URL.createObjectURL(file),
    onclick: () => remove(id),
    title: id
  });
  document.getElementById('root').innerHTML = '';
  element('button', {
    style: 'background-color:red; position:absolute; height:3em; width:3em; left: 0em; z-index: 9',
    onclick: () => prompt(
      {}
    ).then(
      R.tap(console.info)
    ).then(
      R.map(add)
    ).then(
      R.tap(console.log)
    ).catch(
      console.error
    )
  });

  element('button', {
    style: 'background-color:blue; position:absolute; height:3em; width:3em; left: 3em; z-index: 9',
    onclick: () => clear() || list(
      undefined
    ).then(
      R.tap(console.log)
    ).then(
      R.map(render)
    ).catch(
      console.error
    )
  });
  return undefined;
};

console.log(333);
clear();

export {
  add,
  remove,
  list
};
