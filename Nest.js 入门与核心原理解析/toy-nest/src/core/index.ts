import 'reflect-metadata';
import express from 'express';
import type { Express } from 'express';
import { INJECTABLE_WATERMARK, PATH_METADATA, METHOD_METADATA } from '../const';

class ToyNestFactoryStatic {
  private readonly app: Express;

  constructor() {
    this.app = express();
  }

  create(module: any): Express {
    const Controllers = Reflect.getMetadata('controllers', module);
    this.initialize(Controllers);

    return this.app;
  }

  initialize(Controllers: any[]) {
    Controllers.forEach((Controller) => {
      const Services: any[] = Reflect.getMetadata('design:paramtypes', Controller);

      const services = Services.map((Service) => {
        if (!Reflect.getMetadata(INJECTABLE_WATERMARK, Service)) {
          throw new Error(`${Service.name} is not injectable, check if it is decorated with @Injectable.`);
        }

        const instance = new Service();
        return instance;
      });

      const controller = new Controller(...services);

      const rootPath = Reflect.getMetadata(PATH_METADATA, Controller);

      this.createRoute(controller, rootPath);
    });
  }

  createRoute(controller: any, rootPath: string) {
    const prototype = Reflect.getPrototypeOf(controller) as any;
    const allMethodNames = Reflect.ownKeys(prototype).filter((name) => name !== 'constructor');

    allMethodNames.forEach((methodName) => {
      const fn = prototype[methodName];

      const method = Reflect.getMetadata(METHOD_METADATA, fn);
      const path = Reflect.getMetadata(PATH_METADATA, fn);

      if (!method || !path) {
        return;
      }

      const completePath = rootPath + path;
      const lowerMethod = method.toLowerCase() as 'get' | 'post';
      const bindFn = fn.bind(controller);

      this.app[lowerMethod](completePath, (req: any, res: any) => {
        res.send(bindFn(req));
      });
    });
  }
}

export const ToyNestFactory = new ToyNestFactoryStatic();
