const LayoutContainer = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className={`max-w-7xl mx-auto px-6 lg:px-0 py-10 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default LayoutContainer;
