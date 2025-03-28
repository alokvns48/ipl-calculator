export const OutcomeCard = ({ title, amount, Icon }) => (
  <div className="relative bg-white/90 p-6 rounded-2xl shadow-xl transform transition-all duration-150 hover:scale-105 hover:shadow-2xl overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 mr-2 text-green-600 animate-pulse" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p
        className={`text-2xl md:text-3xl font-bold mb-2 ${
          amount >= 0 ? "text-green-600" : "text-red-600"
        } animate-number`}
      >
        {amount.toFixed(2)} INR
      </p>
      <p
        className={`text-sm font-medium ${
          amount >= 0 ? "text-green-800" : "text-red-800"
        } bg-opacity-20 rounded-full px-3 py-1 inline-block`}
      >
        {amount >= 0 ? "✨ Profit" : "📉 Loss"}
      </p>
    </div>
  </div>
);
