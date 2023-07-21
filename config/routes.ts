export default [
  {
     path: '/', 
     routes: [
        {
          path: '/welcome',
          name: '欢迎',
          component: './Home',
        },
        {
          path: '/alert',
          name: '测试checkbox选项',
          component: './Alert'
        }
     ]
  },
  { path: '*', layout: false, component: './404' },
];
