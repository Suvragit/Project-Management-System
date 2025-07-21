const StatsCard = ({ title, value, subtitle, footer, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-5 shadow-card 
                border-t-4 border-accent hover:border-primary-light
                hover:shadow-hover transition-all duration-300 cursor-pointer
                hover:scale-[1.02] active:scale-100"
    >
      <h3 className="text-sm font-medium text-blue-800 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-primary mb-1">{value}</p>
      {subtitle && <p className="text-xs text-blue-600 mb-2">{subtitle}</p>}
      {footer && (
        <p className="text-xs font-semibold text-accent mt-2">
          {footer}
        </p>
      )}
    </div>
  );
};
export default StatsCard;