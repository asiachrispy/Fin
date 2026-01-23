import {
  generateTrendData,
  generateKeyMetrics,
  generateCategoryData,
  generateRegionData,
  generateChannelData,
  generateCustomerData,
  generateTimeData,
  generateTableData
} from '../utils/dataGenerator.js';

// 获取销售趋势数据
export const getTrendData = (req, res) => {
  try {
    const { days = 14 } = req.query;
    const data = generateTrendData(parseInt(days));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取数据失败' });
  }
};

// 获取关键指标
export const getKeyMetrics = (req, res) => {
  try {
    const data = generateKeyMetrics();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取数据失败' });
  }
};

// 获取产品分类数据
export const getCategoryData = (req, res) => {
  try {
    const data = generateCategoryData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取数据失败' });
  }
};

// 获取地区数据
export const getRegionData = (req, res) => {
  try {
    const data = generateRegionData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取数据失败' });
  }
};

// 获取渠道数据
export const getChannelData = (req, res) => {
  try {
    const data = generateChannelData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取数据失败' });
  }
};

// 获取客户数据
export const getCustomerData = (req, res) => {
  try {
    const data = generateCustomerData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取数据失败' });
  }
};

// 获取时间数据
export const getTimeData = (req, res) => {
  try {
    const data = generateTimeData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取数据失败' });
  }
};

// 获取表格数据
export const getTableData = (req, res) => {
  try {
    const params = {
      page: req.query.page || 1,
      pageSize: req.query.pageSize || 50,
      category: req.query.category,
      region: req.query.region,
      channel: req.query.channel,
      search: req.query.search
    };
    const data = generateTableData(params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取数据失败' });
  }
};

// 导出数据
export const exportData = (req, res) => {
  try {
    const params = {
      format: req.query.format || 'excel',
      category: req.query.category,
      region: req.query.region,
      channel: req.query.channel,
      search: req.query.search
    };
    
    // 模拟导出数据（实际应该生成真实文件）
    const data = generateTableData({ ...params, page: 1, pageSize: 10000 });
    
    if (params.format === 'excel') {
      // 这里应该使用 xlsx 库生成真实的 Excel 文件
      // 简化版：返回提示信息
      res.json({ 
        message: 'Excel导出功能已就绪',
        total: data.total,
        note: '实际项目中应使用 xlsx 库生成真实的 Excel 文件'
      });
    } else {
      res.json({ 
        message: '图片导出功能已就绪',
        note: '实际项目中应使用 canvas 或 html2canvas 生成图片'
      });
    }
  } catch (error) {
    res.status(500).json({ error: '导出失败' });
  }
};

// AI异常分析
export const aiAnalysis = (req, res) => {
  try {
    // 模拟AI异常检测结果
    const data = {
      anomalies: [
        {
          date: '2026-01-15',
          type: '下降',
          value: -35,
          reason: '可能受竞品促销活动影响，华北区销售额异常下降'
        },
        {
          date: '2026-01-10',
          type: '异常',
          value: 45,
          reason: '大客户集中下单导致当日销售额异常增长'
        }
      ],
      suggestions: [
        '建议分析竞品促销策略，制定应对方案',
        '针对大客户建立专属服务机制',
        '优化库存管理，避免过度积压'
      ]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'AI分析失败' });
  }
};

// AI趋势预测
export const aiPrediction = (req, res) => {
  try {
    // 模拟AI趋势预测结果
    const data = {
      days: 7,
      predictedSales: 4200,
      confidence: 85,
      factors: [
        '春节临近，预计消费需求上升',
        '去年同期销售增长15%',
        '竞争对手近期无明显促销活动',
        '库存充足，可满足销售需求'
      ]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'AI预测失败' });
  }
};

// AI对话
export const aiChat = (req, res) => {
  try {
    const { question } = req.body;
    
    // 简单的关键词匹配（实际应调用真实的 AI API）
    let answer = '';
    const q = question.toLowerCase();
    
    if (q.includes('华东区') && q.includes('销售额')) {
      answer = '上周华东区销售额为850万元，环比增长12%，主要受电子产品和服装销售增长带动。';
    } else if (q.includes('产品线') && q.includes('最好')) {
      answer = '电子产品线表现最好，销售额占比35%，主要得益于新款手机和笔记本电脑的热销。';
    } else if (q.includes('同比')) {
      answer = '与去年同期相比，整体销售额增长了18%，其中线上渠道增长25%，线下渠道增长10%。';
    } else {
      answer = `您的问题是："${question}"。在实际项目中，这里应调用 OpenAI API 或其他 AI 服务来生成更准确的回答。`;
    }
    
    res.json({ question, answer });
  } catch (error) {
    res.status(500).json({ error: 'AI对话失败' });
  }
};
