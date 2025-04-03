export default function StatisticsCard({ title, value, icon, color }) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
            </div>
            <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl`}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    );
  }