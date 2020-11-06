'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,io } = app;

  //socket路由配置测试
  //io.of('/').route('test',io.controller.nsp.test);
  io.of('/').route('joinLive',io.controller.nsp.joinLive);
  io.of('/').route('leaveLive',io.controller.nsp.leaveLive);
  io.of('/').route('comment', io.controller.nsp.comment);
  io.of('/').route('gift', io.controller.nsp.gift);

  router.get('/', controller.home.index);
  router.get('/list', controller.home.list);
  // 用户注册
  router.post('/api/reg', controller.api.user.reg);
  // 用户登录
  router.post('/api/login', controller.api.user.login);
  // 创建直播间
  router.post('/api/live/create', controller.api.live.save);
  //退出登录
  router.post('/api/user/logout', controller.api.user.logout);
  //获取当前用户信息
  router.get('/api/user/info',controller.api.user.info);
  //修改直播间状态
  router.post('/api/live/changestatus',controller.api.live.changeStatus);
  //直播间列表
  router.get('/api/live/list/:page',controller.api.live.list);
  //查看指定直播间
  router.get('/api/live/read/:id',controller.api.live.read);
  //手机验证码登录
  router.post('/api/phoneLogin',controller.api.user.phoneLogin);
  //发送手机验证码
  router.post('/api/sendcode',controller.api.sms.sendCode);
  //微信Id登录
  router.post('/api/wxLogin',controller.api.user.wxLogin);
  //获取礼物列表
  router.get('/api/gift/list',controller.api.gift.list);

  router.get('/test',controller.admin.test.page);
  router.get('/admin/manager/create',controller.admin.manager.create);
  router.post('/admin/manager',controller.admin.manager.save);
  router.get('/admin/manager',controller.admin.manager.index);
};
