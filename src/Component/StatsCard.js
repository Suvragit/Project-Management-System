const StatsCard = ({ title, value, subtitle, footer, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg
                border-t-4 border-blue-500 hover:border-blue-400
                transition-all duration-300 cursor-pointer
                hover:scale-[1.02] active:scale-100"
    >
      <h3 className="text-sm font-medium text-gray-800 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mb-1">{value}</p>
      {subtitle && <p className="text-xs text-blue-500 mb-2">{subtitle}</p>}
      {footer && (
        <p className="text-xs font-semibold text-blue-400 mt-2">
          {footer}
        </p>
      )}
    </div>
  );
};
export default StatsCard;