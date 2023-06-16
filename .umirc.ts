import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      'target': 'http://localhost:8085',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    }
  }
});

