export type Constructor = new (...args: any[]) => any;

export type ClassDecorator = <T extends Constructor>(target: T) => T | void;

export type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
