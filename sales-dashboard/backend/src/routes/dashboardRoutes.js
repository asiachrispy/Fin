import express from 'express';
import {
  getTrendData,
  getKeyMetrics,
  getCategoryData,
  getRegionData,
  getChannelData,
  getCustomerData,
  getTimeData,
  getTableData,
  exportData,
  aiAnalysis,
  aiPrediction,
  aiChat
} from '../controllers/dashboardController.js';

const router = express.Router();

// 销售趋势数据
router.get('/trend', getTrendData);

// 关键指标
router.get('/metrics', getKeyMetrics);

// 多维度分析数据
router.get('/analysis/category', getCategoryData);
router.get('/analysis/region', getRegionData);
router.get('/analysis/channel', getChannelData);
router.get('/analysis/customer', getCustomerData);
router.get('/analysis/time', getTimeData);

// 表格数据
router.get('/data', getTableData);

// 导出数据
router.get('/export', exportData);

// AI功能
router.get('/ai/analysis', aiAnalysis);
router.get('/ai/prediction', aiPrediction);
router.post('/ai/chat', aiChat);

export default router;
