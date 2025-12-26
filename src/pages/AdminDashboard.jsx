import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter, 
  Download, 
  Settings, 
  Bell,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Globe,
  Building,
  FileText,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [dateRange, setDateRange] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const stats = {
    totalUsers: 15420,
    totalScans: 48293,
    scamsDetected: 8234,
    accuracyRate: 94.7,
    activeUsers: 3247,
    newUsers: 847,
    systemHealth: 'excellent'
  };

  const recentScans = [
    {
      id: 1,
      user: 'john.doe@university.edu',
      type: 'internship',
      company: 'Tech Solutions Inc.',
      position: 'Frontend Developer',
      risk: 85,
      status: 'scam',
      date: '2024-01-15 14:30',
      ip: '192.168.1.100',
      location: 'New York, USA'
    },
    {
      id: 2,
      user: 'jane.smith@college.edu',
      type: 'certificate',
      company: 'Digital Academy',
      position: 'Web Development Certificate',
      risk: 25,
      status: 'safe',
      date: '2024-01-15 13:45',
      ip: '192.168.1.101',
      location: 'California, USA'
    },
    {
      id: 3,
      user: 'mike.wilson@university.edu',
      type: 'internship',
      company: 'Innovation Labs',
      position: 'Data Science Intern',
      risk: 55,
      status: 'caution',
      date: '2024-01-15 12:20',
      ip: '192.168.1.102',
      location: 'Texas, USA'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Unusual spike in scam reports from region: Southeast Asia',
      time: '2 hours ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'System maintenance scheduled for tonight at 2:00 AM UTC',
      time: '4 hours ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'critical',
      message: 'Database connection timeout detected',
      time: '6 hours ago',
      severity: 'high'
    }
  ];

  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getRiskColor = (risk) => {
    if (risk >= 70) return 'text-danger-600 bg-danger-100';
    if (risk >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-success-600 bg-success-100';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'safe': return <CheckCircle className="h-4 w-4 text-success-600" />;
      case 'scam': return <AlertTriangle className="h-4 w-4 text-danger-600" />;
      case 'caution': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return null;
    }
  };

  const getAlertColor = (type) => {
    switch(type) {
      case 'critical': return 'border-danger-200 bg-danger-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-xs text-green-600 font-medium">+12%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <Search className="h-8 w-8 text-purple-600" />
            <span className="text-xs text-green-600 font-medium">+8%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalScans.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Scans</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <span className="text-xs text-red-600 font-medium">+15%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.scamsDetected.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Scams Detected</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <span className="text-xs text-green-600 font-medium">+0.3%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.accuracyRate}%</div>
          <div className="text-sm text-gray-600">Accuracy Rate</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-orange-600" />
            <span className="text-xs text-green-600 font-medium">+5%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="text-xs text-green-600 font-medium">Stable</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 capitalize">{stats.systemHealth}</div>
          <div className="text-sm text-gray-600">System Health</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan Trends</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <BarChart3 className="h-16 w-16" />
            <span className="ml-2">Chart visualization</span>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <span>Pie chart visualization</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Scans</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Company</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Risk</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.slice(0, 5).map((scan) => (
                <tr key={scan.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{scan.user}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center text-sm text-gray-600">
                      {scan.type === 'internship' ? <Building className="h-4 w-4 mr-1" /> : <FileText className="h-4 w-4 mr-1" />}
                      {scan.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{scan.company}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(scan.risk)}`}>
                      {scan.risk}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getStatusIcon(scan.status)}
                      <span className="ml-1 text-sm text-gray-900 capitalize">{scan.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{scan.date}</td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-64"
            />
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field w-32"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">University</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Scans</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Joined</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((scan, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold mr-3">
                        {scan.user.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-900">{scan.user.split('@')[0]}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{scan.user}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">University Name</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{Math.floor(Math.random() * 50) + 1}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{scan.date.split(' ')[0]}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-600">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-danger-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
        <div className="flex space-x-3">
          <select className="input-field w-32">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="btn-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <TrendingUp className="h-16 w-16" />
            <span className="ml-2">Growth chart</span>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <Globe className="h-16 w-16" />
            <span className="ml-2">Map visualization</span>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Accuracy</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <BarChart3 className="h-16 w-16" />
            <span className="ml-2">Accuracy metrics</span>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <RefreshCw className="h-16 w-16" />
            <span className="ml-2">Performance metrics</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
      
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Thresholds</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              High Risk Threshold (%)
            </label>
            <input type="number" className="input-field w-32" defaultValue="70" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medium Risk Threshold (%)
            </label>
            <input type="number" className="input-field w-32" defaultValue="40" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Confidence Level (%)
            </label>
            <input type="number" className="input-field w-32" defaultValue="85" />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" defaultChecked />
            <span className="ml-2 text-gray-700">Email notifications for critical alerts</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" defaultChecked />
            <span className="ml-2 text-gray-700">SMS notifications for system issues</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
            <span className="ml-2 text-gray-700">Daily summary reports</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">Save Settings</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ScamGuard Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-6 w-6" />
              </button>
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                AD
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Alerts */}
      {systemAlerts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="space-y-2">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`border rounded-lg p-3 ${getAlertColor(alert.type)}`}>
                <div className="flex items-start">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 mr-3 ${
                    alert.type === 'critical' ? 'text-danger-600' : 
                    alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && renderSettings()}
      </main>
    </div>
  );
};

export default AdminDashboard;
