class LocalStorage {
  constructor(parameters) {
    // 初始化的时候检查一下是不是所有的都过期了
    this.clearExpired();
  }

  /**
   * 设置键值对，并指定过期时间（以毫秒为单位）
   * @param {string} key - 键
   * @param {*} value - 值
   * @param {number} [expires] - 过期时间（毫秒），默认不过期
   */
  setItem(key, value, expires = null) {
    const data = {
      value,
      expiration: expires ? new Date().getTime() + expires : null,
    };

    localStorage.setItem(key, JSON.stringify(data));
  }
  /**
   * 获取键对应的值，如果已过期则返回 null
   * @param {string} key - 键
   * @returns {*} - 返回值或 null
   */
  getItem(key) {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      const data = JSON.parse(item);
      // 过期
      if (data.expiration && data.expiration >= new Date().getTime()) {
        this.remove(key); // remove
        return null;
      }
    } catch (error) {
      console.error('Error parsing stored data:', error);
      return null;
    }
  }
  /**
   * 删除指定键的数据
   * @param {string} key - 键
   */ remove(key) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
  /**
   * 清理所有已过期的数据
   */
  clearExpired() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = storage.getItem(key);

      try {
        const data = JSON.parse(item);
        if (data.expiration && data.expiration < new Date().getTime()) {
          this.remove(key);
          i--;
          return null;
        }
      } catch (error) {}
    }
  }
}

const storage = new LocalStorage();
// 设置数据，有效期为 5 秒
storage.setItem('user', { name: '123' }, 5000);
// 获取数据
console.log(storage.getItem('user')); // 输出: { name: 'Alice', age: 25 }

// 等待 6 秒后再次获取数据
setTimeout(() => {
  console.log(storage.getItem('user')); // 输出: null (已过期)
}, 6000);
// 删除数据
storage.remove('user');

// 清除所有数据
storage.clear();

// 清理所有已过期的数据
storage.clearExpired();
