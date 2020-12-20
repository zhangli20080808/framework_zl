/*
* 首屏加载优化方法总结
* Vue-Router路由懒加载（利用Webpack的代码切割）
* 使用CDN加速，将通用的库从vendor进行抽离
* Nginx的gzip压缩
* Vue异步组件
* 服务端渲染SSR
* Webpack开启gzip压缩
* Service Worker缓存文件处理
* 使用link标签的rel属性设置   prefetch
* prefetch（这段资源将会在未来某个导航或者功能要用到，但是本资源的下载顺序权重比较低，prefetch通常用于加速下一次导航）
* preload（preload将会把资源得下载顺序权重提高，使得关键数据提前下载好，优化页面打开速度）
*/