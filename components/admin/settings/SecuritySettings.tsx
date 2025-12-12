import { Save } from 'lucide-react';

export default function SecuritySettings() {
    return(
        <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-6">Security Settings</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-gray-700">Two-Factor Authentication</label>
                    <input type="checkbox" className="w-5 h-5 text-orange-500 rounded" />
                  </div>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>

                <button type="submit" className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Update Password
                </button>
              </form>
            </div>
    )
}