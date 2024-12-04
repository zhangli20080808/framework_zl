/**
 * 实现一个埋点类 (Tracking Class)
埋点（Tracking）是指在用户与网页或应用交互时，记录用户的操作行为，以便后续进行数据分析。常见的埋点事件包括页面加载、按钮点击、表单提交等。我们可以通过 JavaScript 实现一个通用的埋点类，支持自定义事件类型和数据上报。
功能需求
  初始化：可以配置埋点的目标 URL 和其他全局参数。
  记录事件：支持记录不同类型的事件，并允许传递自定义数据。
  自动捕获页面加载事件：当页面加载完成时自动发送埋点数据。
  手动触发事件：可以通过调用方法手动触发特定事件。
  错误处理：如果数据上报失败，应该有适当的错误处理机制。
  批量上报：支持将多个事件批量上报，减少网络请求次数。
  日志记录：可以选择是否在控制台中记录埋点信息，方便调试。

实现思路

  事件队列：使用一个队列来存储所有待上报的事件，确保事件可以批量上报。
  数据格式：每个事件包含事件类型、时间戳、自定义数据等信息。
  上报机制：可以使用 fetch 或 XMLHttpRequest 来发送数据到服务器。为了提高性能，可以批量发送多个事件。
  自动捕获事件：通过监听 window.onload 事件，自动记录页面加载事件。
  错误处理：如果上报失败，可以选择重试或记录错误日志。
 */
class Tracker {}
// 创建 Tracker 实例
const tracker = new Tracker({
  endpoint: 'https://example.com/api/tracking', // 上报目标URL
  debug: true, // 开启调试模式
  batchSize: 5, // 每次批量上报5个事件
  autoTrackPageLoad: true, // 自动捕获页面加载事件
});

// 手动记录点击事件
document.getElementById('myButton').addEventListener('click', () => {
  tracker.track('button_click', { buttonId: 'myButton' });
});

// 手动记录表单提交事件
document.getElementById('myForm').addEventListener('submit', (event) => {
  event.preventDefault(); // 阻止表单默认提交
  tracker.track('form_submit', { formId: 'myForm' });
  // 提交表单
  document.getElementById('myForm').submit();
});

// 手动触发事件上报
tracker.sendEvents();

// 设置新的全局配置
tracker.setOptions({
  endpoint: 'https://new-endpoint.com/api/tracking',
  batchSize: 10,
});

// 获取当前事件队列
console.log(tracker.getEventQueue());

// 清空事件队列
tracker.clearEventQueue();
