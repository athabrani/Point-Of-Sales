export default function PrinterSettings (){
    return(
        <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-6">Printer Settings</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Receipt Printer</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>Epson TM-T88V</option>
                    <option>Star TSP143III</option>
                    <option>None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Paper Size</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>80mm</option>
                    <option>58mm</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">Auto Print Receipt</label>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">Print Store Logo</label>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">Print Tax Details</label>
                    <input type="checkbox" className="w-5 h-5 text-orange-500 rounded" />
                  </div>
                </div>

                <button type="button" className="px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Test Print
                </button>
              </form>
            </div>
    )
}