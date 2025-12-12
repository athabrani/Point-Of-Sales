import { CreditCard, DollarSign } from "lucide-react";

export default function PaymentSettings(){
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-6">Payment Methods</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">Cash</p>
                      <p className="text-sm text-gray-500">Accept cash payments</p>
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500 rounded" />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">Credit/Debit Card</p>
                      <p className="text-sm text-gray-500">Accept card payments</p>
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500 rounded" />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600">💳</span>
                    </div>
                    <div>
                      <p className="text-gray-900">Digital Wallet</p>
                      <p className="text-sm text-gray-500">GoPay, OVO, Dana, etc.</p>
                    </div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-orange-500 rounded" />
                </div>
              </div>
            </div>
    )
}