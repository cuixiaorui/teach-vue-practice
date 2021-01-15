// 响应式 reactivity
// 1. 收集依赖
// 2. 触发依赖
// ref reactive
// effect

let currentEffect = null;
// 依赖
class Dep {
  constructor() {
    // this._val = val;
    this.effects = new Set();
  }

  //   get value() {
  //     this.depend();
  //     return this._val;
  //   }

  //   set value(newVal) {
  //     this._val = newVal;
  //     this.notice();
  //   }

  depend() {
    // 收集依赖
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }

  notice() {
    // 触发依赖
    this.effects.forEach((effect) => {
      effect();
    });
  }
}

export function watchEffect(effect) {
  // 就是这个  effect
  currentEffect = effect;
  effect();
  currentEffect = null;
}

// const dep = new Dep(10);

// ref -  watchEffect

// 使用
// watchEffect(() => {
//   // dep get set
//   console.log(dep.value);
//   // 收集依赖
//   //   dep.depend();
// });

// dep.value = 20;
// dep.notice();

// 如果是一个对象呢？
//

// 1. key -> dep 存在哪里？存储问题
// 2. 如何取？

// 存储所有的对象
// 对象作为 key
// deps 作为 val
const targetsMap = new Map();

function getDep(target, key) {
  let depsMap = targetsMap.get(target);
  // 不能取出来，是因为我们之前都没有存过
  if (!depsMap) {
    // 存一下呗
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }
  // dep
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

export function reactive(raw) {
  // 取 key

  // vue2 -> object.defineProperty
  return new Proxy(raw, {
    get(target, key) {
      // key
      // 必须要取出  key 对应的那个 dep
      // 在这里的时候 dep 肯定是获取到了
      // 收集依赖
      const dep = getDep(target, key);
      dep.depend();

      // 写法 已经废弃了
      //   return target[key];
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      // key -> dep -> notice()
      const dep = getDep(target, key);
      //   target[key] = value;
      const result = Reflect.set(target, key, value);
      // notice 一定要在修改值之后调用
      dep.notice();
      return result;
    },
  });
}

// const user = {
//   name: "xiaohong",
//   age: 18,
// };
// const userState = reactive(user);

// watchEffect(() => {
//   console.log(userState.name);
// });

// userState.name = "xiaohei";
