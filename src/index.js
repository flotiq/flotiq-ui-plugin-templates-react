import React from 'react';
import ReactDOM from 'react-dom/client';
import ShinyRow from './ShinyRow';
import {
  addElementToCache,
  getCachedElement,
  registerFn,
} from './plugin-helpers';
import pluginInfo from './plugin-manifest.json';

const updateApp = (root, data) => {
  root.render(<ShinyRow data={data} />);
};

const initApp = (div, data) => {
  const root = ReactDOM.createRoot(div);
  updateApp(root, data);
  return root;
};

registerFn(pluginInfo, (handler) => {
  handler.on(
    'flotiq.grid.cell::render',
    ({ data, accessor, contentTypeName, contentObject }) => {
      if (accessor !== 'title') return null;
      const key = `${contentTypeName}-${contentObject.id}-${accessor}`;
      const cachedApp = getCachedElement(key);
      if (cachedApp) {
        updateApp(cachedApp.root, data);
        return cachedApp.element;
      }

      const div = document.createElement('div');
      addElementToCache(div, initApp(div, data), key);
      return div;
    },
  );
});

const puginPreviewRoot = document.getElementById('plugin-preview-root');

if (puginPreviewRoot) initApp(puginPreviewRoot, 'Hello World!');
