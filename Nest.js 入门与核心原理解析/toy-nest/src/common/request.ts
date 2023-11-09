import { PATH_METADATA, METHOD_METADATA } from '../const';
import type { MethodDecorator } from '../types';

function RequestMapping(method?: string) {
  return (path?: string): MethodDecorator => {
    const reqPath = path || '/';
    const reqMethod = method || 'Get';

    return (target, propertyKey, descriptor) => {
      Reflect.defineMetadata(METHOD_METADATA, reqMethod, descriptor.value);
      Reflect.defineMetadata(PATH_METADATA, reqPath, descriptor.value);
    };
  };
}

export const Get = RequestMapping('Get');
export const Post = RequestMapping('Post');
