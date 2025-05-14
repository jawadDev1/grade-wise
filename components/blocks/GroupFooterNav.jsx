export default function GridWrapper({ children }) {
    return (
      <div className="grid md:grid-cols-2 gap-8 h-max">
        {children}
      </div>
    );
  }