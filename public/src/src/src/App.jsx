import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  ScatterChart,
  Scatter,
  Cell,
} from 'recharts';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('overall');

  // 完整 13 季度數據 (2022 Q4 - 2026 Q2)
  const npsData = [
    { quarter: '2022 Q4', overall: 73.1, merchant: 82.5, client: 71.2, b2e: 75.3, cm: 70.2, ecpp: 100 },
    { quarter: '2023 Q1', overall: 72.8, merchant: 81.2, client: 70.9, b2e: 74.8, cm: 69.5, ecpp: 100 },
    { quarter: '2023 Q2', overall: 71.5, merchant: 80.1, client: 69.8, b2e: 73.6, cm: 68.2, ecpp: 100 },
    { quarter: '2023 Q3', overall: 70.2, merchant: 79.5, client: 68.5, b2e: 72.1, cm: 66.8, ecpp: 100 },
    { quarter: '2023 Q4', overall: 69.8, merchant: 78.2, client: 67.3, b2e: 71.2, cm: 65.4, ecpp: 100 },
    { quarter: '2024 Q1', overall: 68.5, merchant: 76.8, client: 66.2, b2e: 70.1, cm: 64.1, ecpp: 100 },
    { quarter: '2024 Q2', overall: 67.2, merchant: 75.5, client: 65.1, b2e: 69.2, cm: 62.8, ecpp: 100 },
    { quarter: '2024 Q3', overall: 66.8, merchant: 74.9, client: 64.7, b2e: 68.5, cm: 61.5, ecpp: 100 },
    { quarter: '2024 Q4', overall: 65.5, merchant: 73.2, client: 63.2, b2e: 67.1, cm: 60.2, ecpp: 100 },
    { quarter: '2025 Q1', overall: 72.2, merchant: 66.7, client: 72.8, b2e: 73.1, cm: 71.8, ecpp: 100 },
    { quarter: '2025 Q2', overall: 68.1, merchant: 71.3, client: 67.5, b2e: 68.9, cm: 65.2, ecpp: 100 },
    { quarter: '2026 Q1', overall: 72.2, merchant: 66.7, client: 72.8, b2e: 73.1, cm: 71.8, ecpp: 100 },
    { quarter: '2026 Q2', overall: 54.8, merchant: 91.3, client: 54.8, b2e: 59.5, cm: 50.4, ecpp: 100 },
  ];

  // Page 2: 細分類別數據
  const segmentData = [
    { quarter: '2024 Q2', 'B2E KA': 72, 'B2E SME': 65, 'CM KA': 68, 'CM SME': 58, 'EC PP': 100 },
    { quarter: '2024 Q3', 'B2E KA': 71, 'B2E SME': 64, 'CM KA': 67, 'CM SME': 57, 'EC PP': 100 },
    { quarter: '2024 Q4', 'B2E KA': 70, 'B2E SME': 62, 'CM KA': 65, 'CM SME': 55, 'EC PP': 100 },
    { quarter: '2025 Q1', 'B2E KA': 74, 'B2E SME': 67, 'CM KA': 72, 'CM SME': 62, 'EC PP': 100 },
    { quarter: '2025 Q2', 'B2E KA': 70, 'B2E SME': 63, 'CM KA': 68, 'CM SME': 58, 'EC PP': 100 },
    { quarter: '2026 Q1', 'B2E KA': 73, 'B2E SME': 66, 'CM KA': 71, 'CM SME': 61, 'EC PP': 100 },
    { quarter: '2026 Q2', 'B2E KA': 59.7, 'B2E SME': 59.4, 'CM KA': 46.3, 'CM SME': 51.1, 'EC PP': 100 },
  ];

  // Page 3: Detractor 分析數據
  const detractorData = [
    { quarter: '2024 Q2', overall: 12, merchant: 1, client: 8, b2e: 2, cm: 1 },
    { quarter: '2024 Q3', overall: 15, merchant: 1, client: 10, b2e: 3, cm: 1 },
    { quarter: '2024 Q4', overall: 18, merchant: 1, client: 12, b2e: 4, cm: 1 },
    { quarter: '2025 Q1', overall: 20, merchant: 1, client: 14, b2e: 4, cm: 1 },
    { quarter: '2025 Q2', overall: 25, merchant: 1, client: 18, b2e: 5, cm: 1 },
    { quarter: '2026 Q1', overall: 35, merchant: 2, client: 22, b2e: 8, cm: 3 },
    { quarter: '2026 Q2', overall: 56, merchant: 0, client: 28, b2e: 9, cm: 19 },
  ];

  // Page 4: 文字反饋 (關鍵問題)
  const feedbackIssues = [
    {
      id: 1,
      company: '台灣三星電子',
      nps: 0,
      issue: 'Samsung Wallet 整合問題',
      priority: 'P0',
      impact: '高',
      owner: 'Sales VP',
    },
    {
      id: 2,
      company: '中華民國證券暨期貨市場發展基金會',
      nps: 0,
      issue: '服務條款不符需求',
      priority: 'P0',
      impact: '高',
      owner: 'Product',
    },
    {
      id: 3,
      company: '日煙國際製造',
      nps: 2,
      issue: '服務效率低落（3+ 天回應）',
      priority: 'P0',
      impact: '高',
      owner: 'Support Team',
    },
    {
      id: 4,
      company: '建達國際',
      nps: 0,
      issue: '功能與預期不符',
      priority: 'P0',
      impact: '高',
      owner: 'Product',
    },
    {
      id: 5,
      company: '微星科技',
      nps: 2,
      issue: 'B2G 安裝複雜，缺乏批量上傳',
      priority: 'P1',
      impact: '中',
      owner: 'Product',
    },
    {
      id: 6,
      company: '艾普羅行銷',
      nps: 4,
      issue: '動態面額批量上傳功能缺失',
      priority: 'P1',
      impact: '中',
      owner: 'Product',
    },
    {
      id: 7,
      company: '摩斯漢堡',
      nps: 5,
      issue: '優惠券過期管理及退款流程需改進',
      priority: 'P2',
      impact: '中',
      owner: 'Operations',
    },
  ];

  // 計算統計數據
  const stats = useMemo(() => {
    const latestData = npsData[npsData.length - 1];
    const prevData = npsData[npsData.length - 2];
    return {
      overall: {
        current: latestData.overall,
        change: (latestData.overall - prevData.overall).toFixed(1),
      },
      merchant: {
        current: latestData.merchant,
        change: (latestData.merchant - prevData.merchant).toFixed(1),
      },
      client: {
        current: latestData.client,
        change: (latestData.client - prevData.client).toFixed(1),
      },
      detractors: detractorData[detractorData.length - 1].overall,
    };
  }, []);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>📊 NPS 分析 Dashboard</h1>
        <p>2024 Q2 - 2026 Q2 | 完整 9 季度趨勢分析</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`tab-btn ${activeTab === 'overall' ? 'active' : ''}`}
          onClick={() => setActiveTab('overall')}
        >
          📈 整體趨勢
        </button>
        <button
          className={`tab-btn ${activeTab === 'segments' ? 'active' : ''}`}
          onClick={() => setActiveTab('segments')}
        >
          🏢 細分類別
        </button>
        <button
          className={`tab-btn ${activeTab === 'detractors' ? 'active' : ''}`}
          onClick={() => setActiveTab('detractors')}
        >
          ⚠️ Detractor 分析
        </button>
        <button
          className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          💬 文字反饋
        </button>
      </nav>

      {/* Content */}
      <main className="app-content">
        {/* Page 1: Overall Trends */}
        {activeTab === 'overall' && (
          <section className="page">
            <h2>📈 整體 NPS 趨勢 (Merchant & Client)</h2>

            {/* KPI Cards */}
            <div className="kpi-cards">
              <div className="kpi-card">
                <h3>整體 NPS</h3>
                <p className="kpi-value">{stats.overall.current}%</p>
                <p className={`kpi-change ${stats.overall.change < 0 ? 'negative' : 'positive'}`}>
                  {stats.overall.change > 0 ? '+' : ''}{stats.overall.change}%
                </p>
              </div>
              <div className="kpi-card">
                <h3>Merchant NPS</h3>
                <p className="kpi-value">{stats.merchant.current}%</p>
                <p className={`kpi-change ${stats.merchant.change < 0 ? 'negative' : 'positive'}`}>
                  {stats.merchant.change > 0 ? '+' : ''}{stats.merchant.change}%
                </p>
              </div>
              <div className="kpi-card">
                <h3>Client NPS</h3>
                <p className="kpi-value">{stats.client.current}%</p>
                <p className={`kpi-change ${stats.client.change < 0 ? 'negative' : 'positive'}`}>
                  {stats.client.change > 0 ? '+' : ''}{stats.client.change}%
                </p>
              </div>
              <div className="kpi-card">
                <h3>Detractors (人數)</h3>
                <p className="kpi-value">{stats.detractors}</p>
                <p className="kpi-change negative">⚠️ 高風險</p>
              </div>
            </div>

            {/* Chart */}
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={npsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="overall" stroke="#1890ff" name="Overall NPS" strokeWidth={2} />
                  <Line type="monotone" dataKey="merchant" stroke="#52c41a" name="Merchant NPS" strokeWidth={2} />
                  <Line type="monotone" dataKey="client" stroke="#ff4d4f" name="Client NPS" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Insights */}
            <div className="insights-box">
              <h3>🔍 關鍵洞察</h3>
              <ul>
                <li>✅ <strong>Merchant 反彈強勁</strong>: 2026 Q2 達 91.3% (+24.6%)</li>
                <li>❌ <strong>Client 劇烈下滑</strong>: 2026 Q2 降至 54.8% (-18.0%)</li>
                <li>❌ <strong>Overall 崩盤</strong>: 2026 Q2 跌至 54.8% (-17.4%)</li>
                <li>⚠️ <strong>Detractors 激增</strong>: 56 人 (+180% vs 2025 Q1)</li>
              </ul>
            </div>
          </section>
        )}

        {/* Page 2: Segment Trends */}
        {activeTab === 'segments' && (
          <section className="page">
            <h2>🏢 細分類別趨勢分析</h2>

            <div className="chart-container">
              <h3>按客戶類型的 NPS 趨勢</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={segmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="B2E KA" stroke="#1890ff" strokeWidth={2} />
                  <Line type="monotone" dataKey="B2E SME" stroke="#13c2c2" strokeWidth={2} />
                  <Line type="monotone" dataKey="CM KA" stroke="#ff4d4f" strokeWidth={2} />
                  <Line type="monotone" dataKey="CM SME" stroke="#fa8c16" strokeWidth={2} />
                  <Line type="monotone" dataKey="EC PP" stroke="#52c41a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 最新數據表格 */}
            <div className="table-container">
              <h3>2026 Q2 最新各類別 NPS</h3>
              <table className="nps-table">
                <thead>
                  <tr>
                    <th>類別</th>
                    <th>NPS (%)</th>
                    <th>vs 前期</th>
                    <th>狀態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>B2E KA</td>
                    <td>59.7%</td>
                    <td>-13.4%</td>
                    <td className="status-warning">⚠️ 下滑</td>
                  </tr>
                  <tr>
                    <td>B2E SME</td>
                    <td>59.4%</td>
                    <td>-13.7%</td>
                    <td className="status-warning">⚠️ 下滑</td>
                  </tr>
                  <tr>
                    <td>CM KA</td>
                    <td>46.3%</td>
                    <td>-29.3%</td>
                    <td className="status-critical">🔴 危機</td>
                  </tr>
                  <tr>
                    <td>CM SME</td>
                    <td>51.1%</td>
                    <td>-13.6%</td>
                    <td className="status-warning">⚠️ 下滑</td>
                  </tr>
                  <tr>
                    <td>EC PP</td>
                    <td>100%</td>
                    <td>0%</td>
                    <td className="status-success">✅ 穩定</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Page 3: Detractor Analysis */}
        {activeTab === 'detractors' && (
          <section className="page">
            <h2>⚠️ Detractor 分析</h2>

            {/* Detractor Trend */}
            <div className="chart-container">
              <h3>Detractor 人數趨勢</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={detractorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="overall" fill="#ff4d4f" name="Total Detractors" />
                  <Line type="monotone" dataKey="client" stroke="#ff7a45" name="Client" strokeWidth={2} />
                  <Line type="monotone" dataKey="cm" stroke="#fa541c" name="CM" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Detractor Distribution */}
            <div className="table-container">
              <h3>2026 Q2 Detractor 分佈 (按部門)</h3>
              <table className="nps-table">
                <thead>
                  <tr>
                    <th>部門</th>
                    <th>Detractor 人數</th>
                    <th>% 占比</th>
                    <th>嚴重程度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CM_KA</td>
                    <td>11</td>
                    <td>19.6%</td>
                    <td className="status-critical">🔴 最高風險</td>
                  </tr>
                  <tr>
                    <td>Client</td>
                    <td>28</td>
                    <td>50%</td>
                    <td className="status-critical">🔴 最高風險</td>
                  </tr>
                  <tr>
                    <td>CM_SME</td>
                    <td>8</td>
                    <td>14.3%</td>
                    <td className="status-warning">⚠️ 高風險</td>
                  </tr>
                  <tr>
                    <td>B2E</td>
                    <td>9</td>
                    <td>16.1%</td>
                    <td className="status-warning">⚠️ 中風險</td>
                  </tr>
                  <tr>
                    <td>Merchant</td>
                    <td>0</td>
                    <td>0%</td>
                    <td className="status-success">✅ 完美</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key Detractors */}
            <div className="insights-box critical">
              <h3>🚨 Top Detractors (P0 - 立即行動)</h3>
              <ul>
                <li><strong>台灣三星電子</strong> - NPS 0: Samsung Wallet 整合問題</li>
                <li><strong>中華民國證券暨期貨市場發展基金會</strong> - NPS 0: 服務條款不符需求</li>
                <li><strong>日煙國際製造</strong> - NPS 2: 服務效率低落（3+ 天回應）</li>
                <li><strong>建達國際</strong> - NPS 0: 功能與預期不符</li>
              </ul>
            </div>
          </section>
        )}

        {/* Page 4: Feedback Analysis */}
        {activeTab === 'feedback' && (
          <section className="page">
            <h2>💬 文字反饋分析</h2>

            <div className="feedback-grid">
              {feedbackIssues.map((issue) => (
                <div key={issue.id} className={`feedback-card priority-${issue.priority}`}>
                  <div className="feedback-header">
                    <h4>{issue.company}</h4>
                    <span className={`nps-badge nps-${issue.nps}`}>NPS: {issue.nps}</span>
                  </div>
                  <p className="feedback-issue">{issue.issue}</p>
                  <div className="feedback-meta">
                    <span className="badge-priority">{issue.priority}</span>
                    <span className={`badge-impact impact-${issue.impact}`}>
                      {issue.impact === '高' ? '🔴' : '🟡'} {issue.impact}影響
                    </span>
                    <span className="badge-owner">👤 {issue.owner}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="insights-box">
              <h3>📋 反饋總結</h3>
              <ul>
                <li>🔴 <strong>4 個 P0 問題</strong> - 需立即緊急修復</li>
                <li>🟡 <strong>3 個 P1 問題</strong> - 需優先改進（功能/流程缺陷）</li>
                <li>📌 <strong>主要痛點</strong>: 服務效率、功能完整性、批量操作支持</li>
                <li>✅ <strong>行動計畫</strong>: 10 天內完成 P0 救火、30 天內實現 P1 功能</li>
              </ul>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>最後更新: 2026 Q2 | 樣本數: 282 | 回收率: 8.86%</p>
      </footer>
    </div>
  );
};

export default App;
