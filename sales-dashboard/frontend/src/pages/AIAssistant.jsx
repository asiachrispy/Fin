import React, { useState } from 'react';
import { Card, Input, Button, List, Space, Tag, message, Spin } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { aiAnalysis, aiPrediction, aiChat } from '../services/api';

const { TextArea } = Input;

function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [anomalyResult, setAnomalyResult] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) {
      message.warning('请输入问题');
      return;
    }

    try {
      setLoading(true);
      const response = await aiChat(chatInput);
      setChatHistory([
        ...chatHistory,
        { type: 'user', content: chatInput },
        { type: 'ai', content: response.answer }
      ]);
      setChatInput('');
    } catch (error) {
      console.error('AI对话失败:', error);
      message.error('AI对话失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAnomalyDetection = async () => {
    try {
      setLoading(true);
      const result = await aiAnalysis();
      setAnomalyResult(result);
    } catch (error) {
      console.error('异常检测失败:', error);
      message.error('异常检测失败');
    } finally {
      setLoading(false);
    }
  };

  const handlePrediction = async () => {
    try {
      setLoading(true);
      const result = await aiPrediction();
      setPredictionResult(result);
    } catch (error) {
      console.error('趋势预测失败:', error);
      message.error('趋势预测失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card title="AI智能助手" style={{ minHeight: 'calc(100vh - 150px)' }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          dataSource={[
            {
              title: '异常检测',
              description: '自动识别销售数据异常波动并分析原因',
              icon: <RobotOutlined />,
              onClick: handleAnomalyDetection
            },
            {
              title: '趋势预测',
              description: '基于历史数据预测未来7-30天销售趋势',
              icon: <RobotOutlined />,
              onClick: handlePrediction
            }
          ]}
          renderItem={item => (
            <List.Item>
              <Card
                hoverable
                onClick={item.onClick}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space>
                    {item.icon}
                    <span style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</span>
                  </Space>
                  <span style={{ color: '#999', fontSize: 14 }}>{item.description}</span>
                </Space>
              </Card>
            </List.Item>
          )}
        />

        {/* 异常检测结果 */}
        {anomalyResult && (
          <Card title="异常检测结果" style={{ marginTop: 16 }}>
            <List
              dataSource={anomalyResult.anomalies}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Space>
                        <span>{item.date}</span>
                        <Tag color={item.type === '下降' ? 'red' : 'orange'}>
                          {item.type}
                        </Tag>
                      </Space>
                    }
                    description={item.reason}
                  />
                  <div style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
                    {item.value}%
                  </div>
                </List.Item>
              )}
            />
            {anomalyResult.suggestions.length > 0 && (
              <Card type="inner" title="建议措施" style={{ marginTop: 16 }}>
                <List
                  dataSource={anomalyResult.suggestions}
                  renderItem={item => (
                    <List.Item>{item}</List.Item>
                  )}
                />
              </Card>
            )}
          </Card>
        )}

        {/* 趋势预测结果 */}
        {predictionResult && (
          <Card title="趋势预测结果" style={{ marginTop: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <span style={{ fontWeight: 'bold' }}>预测周期：</span>
                <span>未来 {predictionResult.days} 天</span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}>预测销售额：</span>
                <span style={{ color: '#1890ff', fontSize: 18, fontWeight: 'bold' }}>
                  {predictionResult.predictedSales} 万元
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}>置信度：</span>
                <Tag color="green">{predictionResult.confidence}%</Tag>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}>主要影响因素：</span>
                <div style={{ marginTop: 8 }}>
                  {predictionResult.factors.map((factor, index) => (
                    <Tag key={index} style={{ marginBottom: 8 }}>{factor}</Tag>
                  ))}
                </div>
              </div>
            </Space>
          </Card>
        )}

        {/* 智能问答 */}
        <Card title="智能问答" style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 16, maxHeight: 300, overflow: 'auto' }}>
            {chatHistory.length === 0 && (
              <div style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>
                向AI提问任何销售数据相关的问题
              </div>
            )}
            <List
              dataSource={chatHistory}
              renderItem={item => (
                <List.Item
                  style={{
                    background: item.type === 'user' ? '#f0f0f0' : '#e6f7ff',
                    borderRadius: 8,
                    marginBottom: 8,
                    padding: '12px 16px'
                  }}
                >
                  <List.Item.Meta
                    avatar={item.type === 'user' ? <UserOutlined /> : <RobotOutlined />}
                    title={item.type === 'user' ? '我' : 'AI助手'}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
          </div>
          <Space.Compact style={{ width: '100%' }}>
            <TextArea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="输入您的问题，例如：上周华东区的销售额是多少？"
              autoSize={{ minRows: 2, maxRows: 4 }}
              onPressEnter={(e) => {
                if (e.shiftKey) return;
                e.preventDefault();
                handleChatSubmit();
              }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleChatSubmit}
              loading={loading}
            >
              发送
            </Button>
          </Space.Compact>
        </Card>

        {loading && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '40px',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <Spin size="large" tip="AI处理中..." />
          </div>
        )}
      </Card>
    </div>
  );
}

export default AIAssistantPage;
