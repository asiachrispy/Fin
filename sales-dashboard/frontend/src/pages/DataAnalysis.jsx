import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Tabs, Spin } from 'antd';
import ReactECharts from 'echarts-for-react';
import { fetchCategoryData, fetchRegionData, fetchChannelData, fetchCustomerData, fetchTimeData } from '../services/api';

const { TabPane } = Tabs;

function DataAnalysisPage() {
  const [categoryData, setCategoryData] = useState(null);
  const [regionData, setRegionData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [category, region, channel, customer, time] = await Promise.all([
        fetchCategoryData(),
        fetchRegionData(),
        fetchChannelData(),
        fetchCustomerData(),
        fetchTimeData()
      ]);
      setCategoryData(category);
      setRegionData(region);
      setChannelData(channel);
      setCustomerData(customer);
      setTimeData(time);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryChartOption = () => {
    if (!categoryData) return {};

    return {
      title: {
        text: '产品分类销售额占比',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}万元 ({d}%)'
      },
      legend: {
        bottom: 10,
        left: 'center'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{d}%'
          },
          data: categoryData
        }
      ]
    };
  };

  const getRegionChartOption = () => {
    if (!regionData) return {};

    return {
      title: {
        text: '各地区销售额',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: regionData.map(item => item.region),
        axisLabel: {
          interval: 0,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '销售额 (万元)'
      },
      series: [
        {
          data: regionData.map(item => ({
            value: item.sales,
            itemStyle: {
              color: item.sales > 500 ? '#ff4d4f' : '#1890ff'
            }
          })),
          type: 'bar'
        }
      ]
    };
  };

  const getChannelChartOption = () => {
    if (!channelData) return {};

    return {
      title: {
        text: '各渠道销售额对比',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: 10
      },
      xAxis: {
        type: 'category',
        data: channelData.map(item => item.channel)
      },
      yAxis: {
        type: 'value',
        name: '销售额 (万元)'
      },
      series: [
        {
          name: '线上',
          type: 'bar',
          data: channelData.map(item => item.online),
          itemStyle: {
            color: '#1890ff'
          }
        },
        {
          name: '线下',
          type: 'bar',
          data: channelData.map(item => item.offline),
          itemStyle: {
            color: '#52c41a'
          }
        }
      ]
    };
  };

  const getCustomerChartOption = () => {
    if (!customerData) return {};

    return {
      title: {
        text: '新老客户销售额对比',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      legend: {
        bottom: 10
      },
      xAxis: {
        type: 'category',
        data: customerData.map(item => item.date),
        axisPointer: {
          type: 'shadow'
        }
      },
      yAxis: {
        type: 'value',
        name: '销售额 (万元)'
      },
      series: [
        {
          name: '新客户',
          type: 'line',
          smooth: true,
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: customerData.map(item => item.newCustomer),
          itemStyle: {
            color: '#1890ff'
          }
        },
        {
          name: '老客户',
          type: 'line',
          smooth: true,
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: customerData.map(item => item.oldCustomer),
          itemStyle: {
            color: '#52c41a'
          }
        }
      ]
    };
  };

  const getTimeChartOption = () => {
    if (!timeData) return {};

    return {
      title: {
        text: '时段销售额分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: 10
      },
      xAxis: {
        type: 'category',
        data: timeData.map(item => item.time)
      },
      yAxis: {
        type: 'value',
        name: '销售额 (万元)'
      },
      series: [
        {
          name: '工作日',
          type: 'bar',
          data: timeData.map(item => item.workday),
          itemStyle: {
            color: '#1890ff'
          }
        },
        {
          name: '周末',
          type: 'bar',
          data: timeData.map(item => item.weekend),
          itemStyle: {
            color: '#52c41a'
          }
        }
      ]
    };
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  return (
    <div>
      <Card title="多维度对比分析">
        <Tabs defaultActiveKey="1">
          <TabPane tab="产品分类" key="1">
            <ReactECharts
              option={getCategoryChartOption()}
              style={{ height: 500 }}
            />
          </TabPane>
          <TabPane tab="地区分布" key="2">
            <ReactECharts
              option={getRegionChartOption()}
              style={{ height: 500 }}
            />
          </TabPane>
          <TabPane tab="渠道对比" key="3">
            <ReactECharts
              option={getChannelChartOption()}
              style={{ height: 500 }}
            />
          </TabPane>
          <TabPane tab="新老客户" key="4">
            <ReactECharts
              option={getCustomerChartOption()}
              style={{ height: 500 }}
            />
          </TabPane>
          <TabPane tab="时段分析" key="5">
            <ReactECharts
              option={getTimeChartOption()}
              style={{ height: 500 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default DataAnalysisPage;
