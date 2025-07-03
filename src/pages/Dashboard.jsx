import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-[80vh] bg-gray-950 flex flex-col items-center px-6">
      <div className="w-full max-w-7xl">
          <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
