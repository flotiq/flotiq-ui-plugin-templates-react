const appRoots = {};

export const removeObjectFromCache = (key) => {
  delete appRoots[key];
};

export const addElementToCache = (element, root, key, onRemove = null) => {
  appRoots[key] = {
    element,
    root,
  };

  if (element.addEventListener) {
    let detachTimeoutId;

    element.addEventListener('flotiq.attached', () => {
      if (detachTimeoutId) {
        clearTimeout(detachTimeoutId);
        detachTimeoutId = null;
      }
    });

    element.addEventListener('flotiq.detached', () => {
      detachTimeoutId = setTimeout(() => {
        onRemove?.();
        delete appRoots[key];
      }, 50);
    });
  }
};

export const getCachedElement = (key) => {
  return appRoots[key];
};

export const addObjectToCache = (key, object) => {
  appRoots[key] = object;
};

export const registerFn = (pluginInfo, callback) => {
  if (window.FlotiqPlugins?.add) {
    window.FlotiqPlugins.add(pluginInfo, callback);
    return;
  }
  if (!window.initFlotiqPlugins) window.initFlotiqPlugins = [];
  window.initFlotiqPlugins.push({ pluginInfo, callback });
};
