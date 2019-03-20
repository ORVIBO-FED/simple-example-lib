/*----------------------------------------------------------------------------------
* about:
* author:
* date:
* ----------------------------------------------------------------------------------*/

function Student( name, pet ) {
  this.name = name;
  this.pet = pet;
}

const obj1 = new Student("土豆", { name: "Candy", type: "cat" });
const obj2 = new Student("小方", { name: "Dooby", type: "dog" });

const arr1 = [ obj1, obj2 ];

function cloneObj( obj ) {
  return Object.keys(obj)
    .reduce(( item, key ) => ( item[ key ] = clone(obj[ key ]), obj ), {});
}

function cloneArr( arr ) {
  return arr.map(item => clone(item));
}

function clone( obj ) {
  if ( obj instanceof Array ) {
    return cloneArr(obj);
  } else if ( obj instanceof Object ) {
    return cloneObj(obj);
  } else {
    return obj;
  }
}

const obj3 = clone(obj1);
const arr2 = clone(arr1);

console.log(obj3);
console.log(arr2);

console.log(Object.keys(arr1))

