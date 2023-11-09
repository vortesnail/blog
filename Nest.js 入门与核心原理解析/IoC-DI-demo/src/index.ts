// 定义一个产品经理接口
interface ProductManager {
  generateRequirement: () => void
}

// 定义一个程序员接口
interface Programmer {
  completeRequirement: () => void
}

// 贵产品经理
class ExpProductManager implements ProductManager {
  generateRequirement() {
    console.log("A requirement has been generated.");
  }
}

// 贵程序员
class ExpProgrammer implements Programmer {
  completeRequirement() {
    console.log("A requirement has been completed.");
  }
}

// 主管
class Director {
  private productManager: ProductManager;
  private programmer: Programmer;

  constructor(pm: ProductManager, programmer: Programmer) {
    this.productManager = pm;
    this.programmer = programmer;
  }

  task() {
    this.productManager.generateRequirement();
    this.programmer.completeRequirement();
  }
}

// 公司
class Company {
  run() {
    // 控制反转
    const expProductManager: ExpProductManager = new ExpProductManager()
    // const cheapProductManager: CheapProductManager = new CheapProductManager()
    const expProgrammer: ExpProgrammer = new ExpProgrammer()
    // const cheapProgrammer: CheapProgrammer = new CheapProgrammer()

    const screwWorkshop = new Director(expProductManager, expProgrammer);
    screwWorkshop.task();
  }
}
