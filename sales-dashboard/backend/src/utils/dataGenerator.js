import dayjs from 'dayjs';

// 生成6个月的测试数据
export function generateTestData() {
  const endDate = dayjs();
  const startDate = endDate.subtract(6, 'month');
  const data = [];
  
  const categories = ['电子产品', '服装', '家居', '食品'];
  const regions = ['华北', '华东', '华南', '华中', '西南', '西北', '东北'];
  const channels = ['线上官网', '电商平台', '线下门店'];
  const owners = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'];
  
  // 生成每日数据
  for (let date = startDate; date.isBefore(endDate.add(1, 'day')); date = date.add(1, 'day')) {
    const dayOfMonth = date.date();
    const dayOfWeek = date.day();
    const month = date.month();
    
    // 模拟季节性和周末效应
    let baseSales = 100 + Math.random() * 50;
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      baseSales *= 1.2; // 周末增加20%
    }
    if (month >= 5 && month <= 8) {
      baseSales *= 1.1; // 夏季增加10%
    }
    if (month === 11 || month === 0) {
      baseSales *= 1.3; // 年底增加30%
    }
    
    categories.forEach(category => {
      regions.forEach(region => {
        channels.forEach(channel => {
          const sales = baseSales * (0.5 + Math.random() * 1);
          const orders = Math.floor(sales * (2 + Math.random() * 3));
          const visitors = Math.floor(orders * (5 + Math.random() * 5));
          const conversionRate = (orders / visitors * 100);
          
          // 判断是否为新客户（30%概率）
          const isCustomer = Math.random();
          let newCustomer = 0;
          let oldCustomer = 0;
          
          if (isCustomer < 0.3) {
            newCustomer = orders;
          } else {
            oldCustomer = orders;
          }
          
          data.push({
            date: date.format('YYYY-MM-DD'),
            dayOfWeek,
            dayOfMonth,
            month,
            category,
            region,
            channel,
            productName: `${category}-${region}-${channel}`,
            sales: Number(sales.toFixed(2)),
            orders,
            visitors,
            conversionRate: Number(conversionRate.toFixed(2)),
            avgOrderValue: Number((sales / orders).toFixed(2)),
            newCustomer,
            oldCustomer,
            owner: owners[Math.floor(Math.random() * owners.length)],
            isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
            isWeekday: dayOfWeek >= 1 && dayOfWeek <= 5
          });
        });
      });
    });
  }
  
  return data;
}

// 生成销售趋势数据
export function generateTrendData(days) {
  const data = [];
  const endDate = dayjs();
  const startDate = endDate.subtract(days - 1, 'day');
  
  for (let date = startDate; date.isBefore(endDate.add(1, 'day')); date = date.add(1, 'day')) {
    const dayOfWeek = date.day();
    let baseSales = 100 + Math.random() * 50;
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      baseSales *= 1.2;
    }
    
    data.push({
      date: date.format('MM-DD'),
      sales: Number(baseSales.toFixed(2)),
      orders: Math.floor(baseSales * (2 + Math.random() * 3))
    });
  }
  
  return data;
}

// 生成关键指标数据
export function generateKeyMetrics() {
  const currentPeriodSales = 3500 + Math.random() * 500;
  const previousPeriodSales = 3200 + Math.random() * 400;
  const salesGrowth = ((currentPeriodSales - previousPeriodSales) / previousPeriodSales * 100).toFixed(2);
  
  const currentPeriodOrders = Math.floor(currentPeriodSales * 2.5);
  const previousPeriodOrders = Math.floor(previousPeriodSales * 2.5);
  const ordersGrowth = ((currentPeriodOrders - previousPeriodOrders) / previousPeriodOrders * 100).toFixed(2);
  
  const currentPeriodVisitors = Math.floor(currentPeriodOrders * 6);
  const previousPeriodVisitors = Math.floor(previousPeriodOrders * 6);
  const currentConversionRate = (currentPeriodOrders / currentPeriodVisitors * 100).toFixed(2);
  const previousConversionRate = (previousPeriodOrders / previousPeriodVisitors * 100).toFixed(2);
  const conversionGrowth = ((currentConversionRate - previousConversionRate) / previousConversionRate * 100).toFixed(2);
  
  const currentAvgValue = (currentPeriodSales / currentPeriodOrders * 100).toFixed(2);
  const previousAvgValue = (previousPeriodSales / previousPeriodOrders * 100).toFixed(2);
  const avgValueGrowth = ((currentAvgValue - previousAvgValue) / previousAvgValue * 100).toFixed(2);
  
  return {
    totalSales: Number(currentPeriodSales.toFixed(2)),
    totalOrders: currentPeriodOrders,
    conversionRate: Number(currentConversionRate),
    avgOrderValue: Number(currentAvgValue),
    salesGrowth: Number(salesGrowth),
    ordersGrowth: Number(ordersGrowth),
    conversionGrowth: Number(conversionGrowth),
    avgValueGrowth: Number(avgValueGrowth)
  };
}

// 生成产品分类数据
export function generateCategoryData() {
  return [
    { value: 1200, name: '电子产品', itemStyle: { color: '#1890ff' } },
    { value: 900, name: '服装', itemStyle: { color: '#52c41a' } },
    { value: 700, name: '家居', itemStyle: { color: '#faad14' } },
    { value: 500, name: '食品', itemStyle: { color: '#ff4d4f' } }
  ];
}

// 生成地区数据
export function generateRegionData() {
  const regions = ['华北', '华东', '华南', '华中', '西南', '西北', '东北'];
  return regions.map(region => ({
    region,
    sales: Number((300 + Math.random() * 500).toFixed(2))
  })).sort((a, b) => b.sales - a.sales);
}

// 生成渠道数据
export function generateChannelData() {
  const channels = ['线上官网', '电商平台', '线下门店'];
  return channels.map(channel => ({
    channel,
    online: Number((200 + Math.random() * 300).toFixed(2)),
    offline: Number((150 + Math.random() * 200).toFixed(2))
  }));
}

// 生成客户数据
export function generateCustomerData() {
  const data = [];
  const endDate = dayjs();
  const startDate = endDate.subtract(30, 'day');
  
  for (let date = startDate; date.isBefore(endDate.add(1, 'day')); date = date.add(1, 'day')) {
    data.push({
      date: date.format('MM-DD'),
      newCustomer: Number((100 + Math.random() * 100).toFixed(2)),
      oldCustomer: Number((200 + Math.random() * 200).toFixed(2))
    });
  }
  
  return data;
}

// 生成时间数据
export function generateTimeData() {
  return [
    { time: '上午', workday: Number((150 + Math.random() * 100).toFixed(2)), weekend: Number((200 + Math.random() * 150).toFixed(2)) },
    { time: '下午', workday: Number((200 + Math.random() * 150).toFixed(2)), weekend: Number((250 + Math.random() * 200).toFixed(2)) }
  ];
}

// 生成表格数据
export function generateTableData(params) {
  const allData = generateTestData();
  let filteredData = allData;
  
  // 应用筛选条件
  if (params.category) {
    filteredData = filteredData.filter(item => item.category === params.category);
  }
  if (params.region) {
    filteredData = filteredData.filter(item => item.region === params.region);
  }
  if (params.channel) {
    filteredData = filteredData.filter(item => item.channel === params.channel);
  }
  if (params.search) {
    const search = params.search.toLowerCase();
    filteredData = filteredData.filter(item => 
      item.productName.toLowerCase().includes(search) || 
      item.owner.toLowerCase().includes(search)
    );
  }
  
  // 分页
  const page = params.page || 1;
  const pageSize = params.pageSize || 50;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  // 按日期倒序
  paginatedData.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return {
    data: paginatedData,
    total: filteredData.length
  };
}
