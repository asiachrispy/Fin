import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import {
  DashboardOutlined,
  BarChartOutlined,
  TableOutlined,
  DownloadOutlined,
  RobotOutlined,
  UserOutlined,
} from '@ant-design/icons';
import DashboardPage from './pages/Dashboard';
import DataAnalysisPage from './pages/DataAnalysis';
import DataTablePage from './pages/DataTable';
import AIAssistantPage from './pages/AIAssistant';

const { Header, Content, Sider } = Layout;

function App() {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '数据看板',
    },
    {
      key: 'analysis',
      icon: <BarChartOutlined />,
      label: '多维分析',
    },
    {
      key: 'table',
      icon: <TableOutlined />,
      label: '数据表格',
    },
    {
      key: 'ai',
      icon: <RobotOutlined />,
      label: 'AI助手',
    },
  ];

  const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 64px)',
    color: '#fff',
    backgroundColor: colorBgContainer,
    padding: '24px',
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="logo" style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold'
          }}>
            销售看板
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={({ key }) => setSelectedKey(key)}
          />
        </Sider>
        <Layout>
          <Header style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '24px'
          }}>
            <div style={{ paddingLeft: '24px', fontSize: 18, fontWeight: 'bold' }}>
              {menuItems.find(item => item.key === selectedKey)?.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <UserOutlined />
              <span>CEO</span>
            </div>
          </Header>
          <Content style={contentStyle}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/analysis" element={<DataAnalysisPage />} />
              <Route path="/table" element={<DataTablePage />} />
              <Route path="/ai" element={<AIAssistantPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
