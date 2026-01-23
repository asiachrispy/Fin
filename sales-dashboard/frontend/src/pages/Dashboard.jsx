import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Select, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import { fetchTrendData, fetchKeyMetrics } from '../services/api';

const { Option } = Select;

function DashboardPage() {
  const [timeRange, setTimeRange] = useState(14);
  const [trendData, setTrendData] = useState(null);
  const [keyMetrics, setKeyMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [timeRange]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [trend, metrics] = await Promise.all([
        fetchTrendData(timeRange),
        fetchKeyMetrics()
      ]);
      setTrendData(trend);
      setKeyMetrics(metrics);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (value) => {
    if (value > 0) return <ArrowUpOutlined style={{ color: '#52c41a' }} />;
    if (value < 0) return <ArrowDownOutlined style={{ color: '#ff4d4f' }} />;
    return <MinusOutlined style={{ color: '#999' }} />;
  };

  const getTrendColor = (value) => {
    if (value > 0) return '#52c41a';
    if (value < 0) return '#ff4d4f';
    return '#999';
  };

  const getTrendChartOption = () => {
    if (!trendData) return {};

    const dates = trendData.map(item => item.date);
    const salesData = trendData.map(item => item.sales);
    const ordersData = trendData.map(item => item.orders);
    const maData = [];

    // 计算7天移动平均线
    for (let i = 0; i < salesData.length; i++) {
      if (i < 6) {
        maData.push(null);
      } else {
        const sum = salesData.slice(i - 6, i + 1).reduce((a, b) => a + b, 0);
        maData.push(Number((sum / 7).toFixed(2)));
      }
    }

    return {
      title: {
        text: '销售趋势',
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
        data: ['销售额', '订单量', '7日均线'],
        bottom: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisPointer: {
          type: 'shadow'
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '销售额 (万元)',
          position: 'left'
        },
        {
          type: 'value',
          name: '订单量',
          position: 'right'
        }
      ],
      series: [
        {
          name: '销售额',
          type: 'line',
          smooth: true,
          yAxisIndex: 0,
          data: salesData,
          itemStyle: {
            color: '#1890ff'
          }
        },
        {
          name: '订单量',
          type: 'bar',
          yAxisIndex: 1,
          data: ordersData,
          itemStyle: {
            color: '#52c41a'
          }
        },
        {
          name: '7日均线',
          type: 'line',
          smooth: true,
          yAxisIndex: 0,
          data: maData,
          lineStyle: {
            type: 'dashed'
          },
          itemStyle: {
            color: '#faad14'
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
      <Card 
        title="数据看板" 
        extra={
          <Select
            value={timeRange}
            onChange={setTimeRange}
            style={{ width: 150 }}
          >
            <Option value={7}>最近7天</Option>
            <Option value={14}>最近14天</Option>
            <Option value={30}>最近30天</Option>
          </Select>
        }
      >
        {/* 关键指标卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="总销售额"
                value={keyMetrics?.totalSales}
                suffix="万元"
                precision={2}
                valueStyle={{ color: getTrendColor(keyMetrics?.salesGrowth) }}
                prefix={getTrendIcon(keyMetrics?.salesGrowth)}
              />
              <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
                环比: {keyMetrics?.salesGrowth > 0 ? '+' : ''}{keyMetrics?.salesGrowth}%
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="订单量"
                value={keyMetrics?.totalOrders}
                valueStyle={{ color: getTrendColor(keyMetrics?.ordersGrowth) }}
                prefix={getTrendIcon(keyMetrics?.ordersGrowth)}
              />
              <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
                环比: {keyMetrics?.ordersGrowth > 0 ? '+' : ''}{keyMetrics?.ordersGrowth}%
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="转化率"
                value={keyMetrics?.conversionRate}
                suffix="%"
                precision={2}
                valueStyle={{ color: getTrendColor(keyMetrics?.conversionGrowth) }}
                prefix={getTrendIcon(keyMetrics?.conversionGrowth)}
              />
              <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
                环比: {keyMetrics?.conversionGrowth > 0 ? '+' : ''}{keyMetrics?.conversionGrowth}%
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="客单价"
                value={keyMetrics?.avgOrderValue}
                suffix="元"
                precision={2}
                valueStyle={{ color: getTrendColor(keyMetrics?.avgValueGrowth) }}
                prefix={getTrendIcon(keyMetrics?.avgValueGrowth)}
              />
              <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
                环比: {keyMetrics?.avgValueGrowth > 0 ? '+' : ''}{keyMetrics?.avgValueGrowth}%
              </div>
            </Card>
          </Col>
        </Row>

        {/* 销售趋势图 */}
        <Card title="销售趋势">
          <ReactECharts
            option={getTrendChartOption()}
            style={{ height: 400 }}
            notMerge={true}
            lazyUpdate={true}
          />
        </Card>
      </Card>
    </div>
  );
}

export default DashboardPage;
