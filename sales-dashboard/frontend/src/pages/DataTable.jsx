import React, { useState, useEffect } from 'react';
import { Table, Card, Input, Select, Button, Space, message } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { fetchTableData, exportData } from '../services/api';

const { Search } = Input;
const { Option } = Select;

function DataTablePage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
    total: 0
  });
  const [filters, setFilters] = useState({
    date: null,
    category: null,
    region: null,
    channel: null,
    search: ''
  });

  useEffect(() => {
    loadData();
  }, [pagination.current, pagination.pageSize, filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await fetchTableData({
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...filters
      });
      setData(result.data);
      setPagination({
        ...pagination,
        total: result.total
      });
    } catch (error) {
      console.error('加载数据失败:', error);
      message.error('数据加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleSearch = (value) => {
    setFilters({
      ...filters,
      search: value,
      page: 1
    });
    setPagination({
      ...pagination,
      current: 1
    });
  };

  const handleExport = async (format) => {
    try {
      message.loading({ content: '正在导出...', key: 'export' });
      await exportData({
        ...filters,
        format
      });
      message.success({ content: '导出成功', key: 'export' });
    } catch (error) {
      console.error('导出失败:', error);
      message.error('导出失败');
    }
  };

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      width: 120
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 200
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (text) => {
        const colorMap = {
          '电子产品': '#1890ff',
          '服装': '#52c41a',
          '家居': '#faad14',
          '食品': '#ff4d4f'
        };
        return <span style={{ color: colorMap[text] || '#999' }}>{text}</span>;
      }
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
      width: 120
    },
    {
      title: '渠道',
      dataIndex: 'channel',
      key: 'channel',
      width: 120
    },
    {
      title: '销售额（万元）',
      dataIndex: 'sales',
      key: 'sales',
      sorter: true,
      width: 140,
      render: (value) => value.toFixed(2)
    },
    {
      title: '订单量',
      dataIndex: 'orders',
      key: 'orders',
      sorter: true,
      width: 100
    },
    {
      title: '转化率（%）',
      dataIndex: 'conversionRate',
      key: 'conversionRate',
      width: 120,
      render: (value) => value.toFixed(2)
    },
    {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
      width: 100
    }
  ];

  return (
    <div>
      <Card title="详细数据表格">
        <Space style={{ marginBottom: 16 }} wrap>
          <Search
            placeholder="搜索产品名称或负责人"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <Select
            placeholder="选择分类"
            allowClear
            style={{ width: 150 }}
            onChange={(value) => {
              setFilters({ ...filters, category: value });
              setPagination({ ...pagination, current: 1 });
            }}
          >
            <Option value="电子产品">电子产品</Option>
            <Option value="服装">服装</Option>
            <Option value="家居">家居</Option>
            <Option value="食品">食品</Option>
          </Select>
          <Select
            placeholder="选择地区"
            allowClear
            style={{ width: 150 }}
            onChange={(value) => {
              setFilters({ ...filters, region: value });
              setPagination({ ...pagination, current: 1 });
            }}
          >
            <Option value="华北">华北</Option>
            <Option value="华东">华东</Option>
            <Option value="华南">华南</Option>
            <Option value="华中">华中</Option>
            <Option value="西南">西南</Option>
            <Option value="西北">西北</Option>
            <Option value="东北">东北</Option>
          </Select>
          <Select
            placeholder="选择渠道"
            allowClear
            style={{ width: 150 }}
            onChange={(value) => {
              setFilters({ ...filters, channel: value });
              setPagination({ ...pagination, current: 1 });
            }}
          >
            <Option value="线上官网">线上官网</Option>
            <Option value="电商平台">电商平台</Option>
            <Option value="线下门店">线下门店</Option>
          </Select>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => handleExport('excel')}
          >
            导出Excel
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
          onChange={handleTableChange}
          scroll={{ x: 'max-content' }}
          rowKey={(record) => `${record.date}-${record.productName}`}
        />
      </Card>
    </div>
  );
}

export default DataTablePage;
