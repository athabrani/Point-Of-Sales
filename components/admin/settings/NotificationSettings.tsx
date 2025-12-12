export default function NotificationSettings(){
    return(
        <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-gray-900">Low Stock Alerts</p>
                    <p className="text-sm text-gray-500">Get notified when products are running low</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500 rounded" />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-gray-900">Order Notifications</p>
                    <p className="text-sm text-gray-500">Receive alerts for new orders</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500 rounded" />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-gray-900">Daily Sales Report</p>
                    <p className="text-sm text-gray-500">Email daily sales summary</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-orange-500 rounded" />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-gray-900">System Updates</p>
                    <p className="text-sm text-gray-500">Get notified about system updates</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500 rounded" />
                </div>
              </div>
            </div>
    )
}