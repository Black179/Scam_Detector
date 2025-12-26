import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Users,
  BarChart3,
  Clock,
  Plus,
  Filter,
  MoreVertical
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data
  const stats = {
    totalScans: 24,
    scamsDetected: 3,
    legitimate: 21,
    thisMonth: 8
  };

  const recentScans = [
    {
      id: 1,
      type: 'internship',
      company: 'Tech Solutions Inc.',
      position: 'Frontend Developer',
      risk: 'low',
      date: '2024-01-15',
      status: 'safe'
    },
    {
      id: 2,
      type: 'certificate',
      company: 'Digital Academy',
      position: 'Web Development Certificate',
      risk: 'high',
      date: '2024-01-14',
      status: 'scam'
    },
    {
      id: 3,
      type: 'internship',
      company: 'Innovation Labs',
      position: 'Data Science Intern',
      risk: 'medium',
      date: '2024-01-13',
      status: 'caution'
    },
    {
      id: 4,
      type: 'internship',
      company: 'Startup Hub',
      position: 'Marketing Intern',
      risk: 'low',
      date: '2024-01-12',
      status: 'safe'
    }
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'text-success-600 bg-success-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-danger-600 bg-danger-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'safe': return <CheckCircle className="h-5 w-5 text-success-600" />;
      case 'scam': return <AlertTriangle className="h-5 w-5 text-danger-600" />;
      case 'caution': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ScamGuard</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="nav-link-active">Dashboard</a>
              <a href="#" className="nav-link">Scan New</a>
              <a href="#" className="nav-link">History</a>
              <a href="#" className="nav-link">Reports</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your scam detection activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Scans</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalScans}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Scams Detected</p>
                <p className="text-2xl font-bold text-danger-600">{stats.scamsDetected}</p>
              </div>
              <div className="w-12 h-12 bg-danger-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-danger-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Legitimate</p>
                <p className="text-2xl font-bold text-success-600">{stats.legitimate}</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="card hover:shadow-md transition-shadow duration-200 text-left">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <Plus className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Scan Internship</h3>
                  <p className="text-sm text-gray-600">Analyze a new internship offer</p>
                </div>
              </div>
            </button>
            <button className="card hover:shadow-md transition-shadow duration-200 text-left">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Verify Certificate</h3>
                  <p className="text-sm text-gray-600">Check certificate authenticity</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Scans */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Scans</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Company</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Position/Certificate</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Risk Level</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((scan) => (
                    <tr key={scan.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {scan.type === 'internship' ? (
                            <Users className="h-4 w-4 text-gray-600 mr-2" />
                          ) : (
                            <FileText className="h-4 w-4 text-gray-600 mr-2" />
                          )}
                          <span className="text-sm text-gray-900 capitalize">{scan.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{scan.company}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{scan.position}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(scan.risk)}`}>
                          {scan.risk}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{scan.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getStatusIcon(scan.status)}
                          <span className="ml-2 text-sm text-gray-900 capitalize">{scan.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan Trends</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <BarChart3 className="h-16 w-16" />
              <span className="ml-2">Chart visualization here</span>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto"></div>
                </div>
                <span>Pie chart visualization</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
