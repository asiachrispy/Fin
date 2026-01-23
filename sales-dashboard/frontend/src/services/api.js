import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
});

// 获取销售趋势数据
export const fetchTrendData = async (days) => {
  const response = await api.get('/trend', { params: { days } });
  return response.data;
};

// 获取关键指标
export const fetchKeyMetrics = async () => {
  const response = await api.get('/metrics');
  return response.data;
};

// 获取产品分类数据
export const fetchCategoryData = async () => {
  const response = await api.get('/analysis/category');
  return response.data;
};

// 获取地区数据
export const fetchRegionData = async () => {
  const response = await api.get('/analysis/region');
  return response.data;
};

// 获取渠道数据
export const fetchChannelData = async () => {
  const response = await api.get('/analysis/channel');
  return response.data;
};

// 获取客户数据
export const fetchCustomerData = async () => {
  const response = await api.get('/analysis/customer');
  return response.data;
};

// 获取时间数据
export const fetchTimeData = async () => {
  const response = await api.get('/analysis/time');
  return response.data;
};

// 获取表格数据
export const fetchTableData = async (params) => {
  const response = await api.get('/data', { params });
  return response.data;
};

// 导出数据
export const exportData = async (params) => {
  const response = await api.get('/export', {
    params,
    responseType: 'blob'
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  
  const now = new Date();
  const filename = `销售数据_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.${params.format === 'excel' ? 'xlsx' : 'png'}`;
  
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  
  return response.data;
};

// AI异常分析
export const aiAnalysis = async () => {
  const response = await api.get('/ai/analysis');
  return response.data;
};

// AI趋势预测
export const aiPrediction = async () => {
  const response = await api.get('/ai/prediction');
  return response.data;
};

// AI对话
export const aiChat = async (question) => {
  const response = await api.post('/ai/chat', { question });
  return response.data;
};
