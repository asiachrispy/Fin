# 🔧 前端项目完整修复 - 终极解决方案

## 问题诊断
1. ✅ vite 命令未找到 - 需要重新安装依赖
2. ❌ Mock数据文件缺失 - 需要创建 mock.ts
3. ❌ CompaniesView.vue 异常 - 需要修复
4. ❌ 测试数据未显示 - 需要确保Mock数据正确加载

---

## 🚀 完整修复步骤（请按顺序执行）

### 步骤 1：重新安装依赖

在终端中执行：

```bash
cd /Users/chrispy/codespace/CodeMind/Fin/enterprise-news-analyzer/frontend

# 清理旧依赖
rm -rf node_modules package-lock.json

# 使用国内镜像
npm config set registry https://registry.npmmirror.com

# 重新安装
npm install
```

### 步骤 2：创建 Mock 数据文件

在终端执行以下命令创建 `mock.ts`：

```bash
cat > src/api/mock.ts << 'EOF'
import type { Event, Company, PaginatedResponse } from '@/types'

export const mockEvents: Event[] = [
  {
    id: '1',
    title: '全球供应链紧张局势加剧',
    content: '由于地缘政治因素和疫情持续影响，全球供应链面临前所未有的挑战。多家跨国企业报告称，原材料采购和产品交付出现延迟。专家建议企业应立即评估供应链风险，寻找替代供应商和备选方案。',
    source: 'BBC',
    publishedAt: new Date().toISOString(),
    url: 'https://example.com/news1',
    impactScore: 8,
    impactSummary: '该事件可能严重影响公司的原材料采购和产品交付。建议立即寻找替代供应商，评估库存水平并制定应急计划。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: '央行宣布降息0.25个百分点',
    content: '为刺激经济增长，中央银行决定下调基准利率。这一举措旨在降低企业融资成本，促进投资和消费。',
    source: 'CNN',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    url: 'https://example.com/news2',
    impactScore: 5,
    impactSummary: '降息政策可能降低企业融资成本，对扩张计划有正面影响。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: '人工智能技术取得重大突破',
    content: '研究团队在人工智能领域取得重大突破，新算法在多个基准测试中表现优异。',
    source: 'Reuters',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    url: 'https://example.com/news3',
    impactScore: 6,
    impactSummary: 'AI技术突破可能为公司带来新的技术机会和效率提升。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: '新能源政策调整影响分析',
    content: '政府宣布调整新能源补贴政策，将对电动汽车、太阳能等行业产生深远影响。',
    source: 'Bloomberg',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    url: 'https://example.com/news4',
    impactScore: 7,
    impactSummary: '新能源政策调整可能直接影响相关企业的盈利模式和市场份额。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  }
]

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: '示例科技公司',
    industry: '科技',
    businessDescription: '从事软件开发和云服务，为企业提供数字化转型解决方案。',
    mainMarkets: '全球',
    competitors: '竞争对手A, 竞争对手B',
    createdAt: new Date(Date.now() - 864000000 * 7).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: '示例制造企业',
    industry: '制造',
    businessDescription: '电子产品制造商，主要生产消费电子和工业设备。',
    mainMarkets: '北美、欧洲',
    competitors: '其他制造商1, 其他制造商2',
    createdAt: new Date(Date.now() - 864000000 * 14).toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const mockApi = {
  getEvents: async (): Promise<PaginatedResponse<Event>> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      items: mockEvents,
      total: mockEvents.length,
      page: 1,
      pageSize: 20,
      totalPages: 1
    }
  },

  getEventById: async (id: string): Promise<Event> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const event = mockEvents.find(e => e.id === id)
    if (!event) throw new Error('Event not found')
    return event
  },

  getCompanies: async (): Promise<Company[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockCompanies
  },

  createCompany: async (data: Partial<Company>): Promise<Company> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newCompany: Company = {
      id: Date.now().toString(),
      name: data.name || '',
      industry: data.industry,
      businessDescription: data.businessDescription,
      mainMarkets: data.mainMarkets,
      competitors: data.competitors,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockCompanies.push(newCompany)
    return newCompany
  },

  updateCompany: async (id: string, data: Partial<Company>): Promise<Company> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockCompanies.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Company not found')
    mockCompanies[index] = { ...mockCompanies[index], ...data, updatedAt: new Date().toISOString() }
    return mockCompanies[index]
  },

  deleteCompany: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockCompanies.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Company not found')
    mockCompanies.splice(index, 1)
  }
}
EOF
```

### 步骤 3：配置环境变量

```bash
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
echo "VITE_USE_MOCK=true" >> .env
```

### 步骤 4：验证文件

```bash
# 检查关键文件是否存在
ls -la src/api/mock.ts
ls -la .env
ls -la src/views/CompaniesView.vue
ls -la src/views/SettingsView.vue
```

### 步骤 5：启动开发服务器

```bash
npm run dev
```

---

## ✅ 成功标志

启动成功后，你应该看到：

```
VITE v5.0.11  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🎯 测试Mock数据

浏览器访问 http://localhost:5173 后，检查：

1. **首页** 应该显示 4 个事件卡片
2. **每个卡片** 应该有：
   - 标题
   - 影响分数徽章（颜色编码）
   - 新闻来源标签
   - 影响说明

3. **点击卡片** 应该能跳转到详情页

4. **企业管理页面** 应该显示 2 个示例企业

---

## 🔍 调试技巧

### 检查 Mock 模式是否启用

打开浏览器控制台（F12），输入：

```javascript
import.meta.env.VITE_USE_MOCK
```

应该返回 `"true"`

### 检查 Mock 数据是否加载

在控制台输入：

```javascript
window.fetch('/api/events').then(r => r.json()).then(console.log)
```

应该返回 Mock 数据

### 查看错误信息

打开控制台查看是否有错误，特别注意：
- 404 错误：文件路径错误
- CORS 错误：跨域问题（Mock模式下不应该出现）
- TypeScript 错误：类型定义问题

---

## 🐛 常见问题解决

### 问题 1：页面空白

检查控制台是否有错误，可能是：
- 路由配置错误
- 组件导入失败
- TypeScript 类型错误

### 问题 2：看不到数据

检查：
1. `.env` 文件中 `VITE_USE_MOCK=true`
2. `src/api/mock.ts` 文件存在
3. 浏览器控制台无错误

### 问题 3：点击"添加企业"没反应

这是正常的，目前只是显示提示信息。

---

## 📝 下一步

修复完成后：
1. ✅ 首页显示 Mock 数据
2. ✅ 可以查看事件详情
3. ✅ 企业管理页面显示示例企业
4. ✅ 所有页面路由正常

然后可以：
- 连接真实的后端 API
- 实现完整的 CRUD 功能
- 添加更多的交互效果

---

## 💡 快速验证命令

在浏览器控制台执行：

```javascript
// 验证环境变量
console.log('Mock Mode:', import.meta.env.VITE_USE_MOCK)

// 验证数据加载
fetch('/api/events')
  .then(r => r.json())
  .then(data => console.log('Events:', data))
  .catch(err => console.error('Error:', err))
```

---

**完成所有步骤后，告诉我结果或遇到的错误，我会继续帮你解决！**
