import express from 'express';
import cors from 'cors';
import dashboardRoutes from './src/routes/dashboardRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/api', dashboardRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sales Dashboard API is running' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`\n🚀 销售数据看板后端服务已启动`);
  console.log(`📍 服务地址: http://localhost:${PORT}`);
  console.log(`🔍 健康检查: http://localhost:${PORT}/health`);
  console.log(`📊 API 文档: http://localhost:${PORT}/api`);
  console.log(`\n✅ 服务就绪，可以开始访问\n`);
});
