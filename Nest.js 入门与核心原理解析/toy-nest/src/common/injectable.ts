import { INJECTABLE_WATERMARK } from '../const';
import type { ClassDecorator } from '../types';

function Injectable(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
  };
}

export default Injectable;
