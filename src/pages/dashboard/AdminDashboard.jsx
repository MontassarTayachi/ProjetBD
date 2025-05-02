import { FaUsers, FaChalkboardTeacher, FaUserTie, FaUserShield } from "react-icons/fa";
import Card from "../DashboardLayout/Card";
import Overview from "../DashboardLayout/Overview";
import RecentParticipants from "../DashboardLayout/RecentParticipants";
import UniqueVisitorCard from "../DashboardLayout/UniqueVisitorCard";
import PieActiveArc from "../DashboardLayout/PieActiveArc";
import SalesChart from "../DashboardLayout/SalesChart";
import { useOutletContext } from "react-router-dom";
import { dashService } from "./dashService";
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    data: {
      total_formateurs: 0,
      total_participants: 0,
      total_users: 0,
      total_formations: 0
    },
    actionLogs: []
  });

  const [loading, setLoading] = useState(true);
  const { setCountLabel, setHeaderAddHandler } = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, actionLogs] = await Promise.all([
          dashService.getDashboardData(),
          dashService.getActionLogs()
        ]);
        setDashboardData({
          data: data.data || {
            total_formateurs: 0,
            total_participants: 0,
            total_users: 0,
            total_formations: 0
          },
          formationCounts: data.formationCounts || [],
          actionLogs: actionLogs || []
        });
        console.log("Dashboard data:", data);
        console.log("Dashboard data coutnt:", data.formationCounts.length);

        
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set header context
    setCountLabel("");
    setHeaderAddHandler(null);
  }, [setCountLabel, setHeaderAddHandler]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          color="linear-gradient(to right, #947ebc, #d383ba)"
          title="Total Users"
          value={dashboardData.data.total_users}
          icon={<FaUsers className="text-white" />}
        />
        <Card
          color="linear-gradient(to right, #5f81c4, #d7eff7)"
          title="Total Trainers"
          value={dashboardData.data.total_formateurs}
          icon={<FaChalkboardTeacher className="text-white" />}
        />
        <Card
          color="linear-gradient(to right, #00808b, #afa8ba)"
          title="Total Participants"
          value={dashboardData.data.total_participants}
          icon={<FaUserTie className="text-white" />}
        />
        <Card
          color="linear-gradient(to right, #c27465, #fefedf)"
          title="Total Formations"
          value={dashboardData.data.total_formations}
          icon={<FaUserShield className="text-white" />}
        />
      </div>

      <div className="flex flex-col gap-6 py-8 lg:flex-row">
        <UniqueVisitorCard />
        <RecentParticipants />
      </div>

      <SalesChart formationCounts={dashboardData.formationCounts || []} />

      <div className="flex flex-col gap-6 py-8 md:flex-row">
        <Overview recentActions={dashboardData.actionLogs} />
        {dashboardData.formationCounts && dashboardData.formationCounts.length > 0 && (
          <PieActiveArc data={dashboardData.formationCounts} />
        )}
      </div>
    </>
  );
}