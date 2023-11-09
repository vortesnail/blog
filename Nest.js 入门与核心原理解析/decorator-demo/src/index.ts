import "reflect-metadata";

type Constructor = new (...args: any[]) => any;

// 类装饰器
function addBackground<T extends Constructor>(target: T) {
  target.prototype.background = "mortgage slave";
  return target;
}

// 属性装饰器
function validateAge(max: number) {
  return (target: Object, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      set: function (v: number) {
        if (v > max) {
          throw new Error(`${v} is too old!`);
        }
      },
    });
  };
}

// 方法装饰器
function logWorkTime(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const paramsCollector =
      Reflect.getOwnMetadata("paramsCollector", target) || {};
    for (
      let parameterIndex = 0;
      parameterIndex < args.length;
      parameterIndex++
    ) {
      let minNum: number[] =
        paramsCollector[`${propertyKey}_${parameterIndex}`];
      if (args[parameterIndex] < minNum) {
        throw new Error(`Working hours are less than ${minNum} hours`);
      }
    }

    const result = original.call(this, ...args);
    console.log(`Already worked ${result} hours`);
    return result;
  };
}

// 参数装饰器
function minimum(num: number) {
  return (target: Object, propertyKey: string, parameterIndex: number) => {
    let paramsCollector =
      Reflect.getOwnMetadata("paramsCollector", target) || {};
    paramsCollector = {
      ...paramsCollector,
      [`${propertyKey}_${parameterIndex}`]: num,
    };
    Reflect.defineMetadata("paramsCollector", paramsCollector, target);
  };
}

@addBackground
class Programmer {
  @validateAge(35)
  age!: number;

  @logWorkTime
  work(@minimum(3) morningTime: number, @minimum(7) afternoonTime: number) {
    return morningTime + afternoonTime;
  }
}

const programmer = new Programmer();
const a = programmer.work(3, 7); // Already worked 10 hours
programmer.age = 35; // throw error
