import type { ClassDecorator } from '../types';

function Module(metadata: Record<string, any[]>): ClassDecorator {
  return (target) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, metadata[property], target);
      }
    }
  };
}

export default Module;
