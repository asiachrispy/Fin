"use client";

import { useState, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { Download, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { mockSalesData, categoryData, regionData } from '@/lib/mock-data';
import { SalesData, FilterConfig } from '@/lib/types';
import { StatCard } from './StatCard';
import { TrendChart } from './TrendChart';
import { BarChartComponent } from './BarChartComponent';

export function DataDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 0, 10),
  });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  // 过滤数据
  const filteredData = useMemo(() => {
    return mockSalesData.filter((item) => {
      const date = new Date(item.date);
      const afterStart = !dateRange?.from || date >= dateRange.from;
      const beforeEnd = !dateRange?.to || date <= dateRange.to;
      const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
      const regionMatch = regionFilter === 'all' || item.region === regionFilter;

      return afterStart && beforeEnd && categoryMatch && regionMatch;
    });
  }, [dateRange, categoryFilter, regionFilter]);

  // 计算总指标
  const metrics = useMemo(() => {
    const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
    const totalOrders = filteredData.reduce((sum, item) => sum + item.orders, 0);
    const avgConversion = filteredData.length > 0
      ? filteredData.reduce((sum, item) => sum + item.conversion, 0) / filteredData.length
      : 0;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalRevenue,
      totalOrders,
      avgConversion: parseFloat(avgConversion.toFixed(1)),
      avgOrderValue,
    };
  }, [filteredData]);

  // 准备图表数据
  const chartData = useMemo(() => {
    return filteredData.map((item) => ({
      name: item.date,
      revenue: item.revenue,
      orders: item.orders,
      conversion: item.conversion,
    }));
  }, [filteredData]);

  // 导出功能
  const handleExport = () => {
    const csv = [
      ['日期', '销售额', '订单量', '转化率', '分类', '地区'].join(','),
      ...filteredData.map((item) =>
        [item.date, item.revenue, item.orders, item.conversion, item.category, item.region].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sales-data-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 顶部筛选器 */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">销售数据看板</h1>
        <div className="flex items-center gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部分类</SelectItem>
              <SelectItem value="电子产品">电子产品</SelectItem>
              <SelectItem value="服装">服装</SelectItem>
              <SelectItem value="家居">家居</SelectItem>
              <SelectItem value="食品">食品</SelectItem>
            </SelectContent>
          </Select>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择地区" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部地区</SelectItem>
              <SelectItem value="华东">华东</SelectItem>
              <SelectItem value="华南">华南</SelectItem>
              <SelectItem value="华北">华北</SelectItem>
              <SelectItem value="西部">西部</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出数据
          </Button>
        </div>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="总销售额"
          value={metrics.totalRevenue}
          trend={12}
          trendLabel="较上周"
        />
        <StatCard
          title="订单数量"
          value={metrics.totalOrders}
          trend={8}
          trendLabel="较上周"
        />
        <StatCard
          title="转化率"
          value={`${metrics.avgConversion}%`}
          trend={-2}
          trendLabel="较上周"
        />
        <StatCard
          title="客单价"
          value={metrics.avgOrderValue}
          trend={5}
          trendLabel="较上周"
        />
      </div>

      {/* 图表区域 */}
      <div className="grid gap-4 md:grid-cols-2">
        <TrendChart
          title="销售趋势"
          data={chartData}
          dataKey="revenue"
          color="#3b82f6"
        />
        <TrendChart
          title="订单趋势"
          data={chartData}
          dataKey="orders"
          color="#8b5cf6"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <BarChartComponent
          title="分类销售额"
          data={categoryData}
          dataKey="value"
          color="#ec4899"
        />
        <BarChartComponent
          title="地区销售额"
          data={regionData}
          dataKey="value"
          color="#10b981"
        />
      </div>

      {/* 数据表格 */}
      <div className="rounded-md border">
        <div className="p-4 border-b bg-muted">
          <h3 className="font-semibold">详细数据</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted">
                <th className="p-3 text-left text-sm font-medium">日期</th>
                <th className="p-3 text-left text-sm font-medium">销售额</th>
                <th className="p-3 text-left text-sm font-medium">订单量</th>
                <th className="p-3 text-left text-sm font-medium">转化率</th>
                <th className="p-3 text-left text-sm font-medium">分类</th>
                <th className="p-3 text-left text-sm font-medium">地区</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="p-3 text-sm">{item.date}</td>
                  <td className="p-3 text-sm">¥{item.revenue.toLocaleString()}</td>
                  <td className="p-3 text-sm">{item.orders}</td>
                  <td className="p-3 text-sm">{item.conversion}%</td>
                  <td className="p-3 text-sm">{item.category}</td>
                  <td className="p-3 text-sm">{item.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
