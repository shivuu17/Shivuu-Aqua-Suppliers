import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Download, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { formatDate, INQUIRY_STATUS } from '../../utils/constants';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, converted: 0 });

  useEffect(() => {
    fetchInquiries();
  }, [filterStatus]);

  const fetchInquiries = async () => {
    try {
      const url = filterStatus ? `/inquiry?status=${filterStatus}` : '/inquiry';
      const response = await api.get(url);
      setInquiries(response.data.data);
      
      // Calculate stats
      const allResponse = await api.get('/inquiry');
      const all = allResponse.data.data;
      setStats({
        total: all.length,
        new: all.filter(i => i.status === 'New').length,
        contacted: all.filter(i => i.status === 'Contacted').length,
        converted: all.filter(i => i.status === 'Converted').length,
      });
    } catch (error) {
      toast.error('Failed to load inquiries');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/inquiry/${id}`, { status: newStatus });
      toast.success('Status updated successfully');
      fetchInquiries();
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const downloadCSV = async () => {
    try {
      const response = await api.get('/inquiry/export/csv', {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `inquiries-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('CSV downloaded successfully');
    } catch (error) {
      toast.error('Failed to download CSV');
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'Converted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your inquiries and orders</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">Total Inquiries</p>
            <p className="text-3xl font-bold text-primary-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">New</p>
            <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">Contacted</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.contacted}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">Converted</p>
            <p className="text-3xl font-bold text-green-600">{stats.converted}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              {INQUIRY_STATUS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={downloadCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Loading inquiries...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No inquiries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name / Business
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(inquiry.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <p className="font-semibold text-gray-900">{inquiry.name}</p>
                        <p className="text-gray-600">{inquiry.businessName}</p>
                        <p className="text-gray-500 text-xs">{inquiry.city}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <p className="text-gray-900">{inquiry.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <p className="text-gray-900">{inquiry.bottleSize}</p>
                        <p className="text-gray-600 text-xs">{inquiry.quantity}</p>
                        {inquiry.message && (
                          <p className="text-gray-500 text-xs mt-1 truncate max-w-xs">
                            {inquiry.message}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={inquiry.status}
                          onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                            inquiry.status
                          )}`}
                        >
                          {INQUIRY_STATUS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
