import { PATH_METADATA } from '../const';
import type { ClassDecorator } from '../types';

function Controller(path?: string): ClassDecorator {
  const defaultPath = '/';

  return (target) => {
    Reflect.defineMetadata(PATH_METADATA, path || defaultPath, target);
  };
}

export default Controller;
