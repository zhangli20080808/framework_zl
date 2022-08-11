/**
    共同点：集合、字典，可以储存不重复的值
    不同点：集合 是以 [value, value]的形式储存元素，字典 是以 [key, value] 的形式储存
 */
const m = new Map();
const o = { p: 'haha' };
m.set(o, 'content');
m.get(o); // content

m.has(o); // true
m.delete(o); // true
m.has(o); // false
