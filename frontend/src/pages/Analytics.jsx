import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import api from "../services/api";
import "../styles/Analytics.css";

const colors = ["#ef4444", "#f59e0b", "#22c55e"];

function Analytics() {
  const [overview, setOverview] = useState(null);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const loadAnalytics = async () => {
      const [overviewRes, trendsRes] = await Promise.all([
        api.get("/analytics/overview"),
        api.get("/analytics/trends"),
      ]);

      setOverview(overviewRes.data);
      setTrends(trendsRes.data);
    };

    loadAnalytics().catch(console.error);
  }, []);

  const statusData = overview
    ? [
        { name: "Pending", value: overview.pending },
        { name: "In Progress", value: overview.inProgress },
        { name: "Completed", value: overview.completed },
      ]
    : [];

  const trendData = trends.map((item) => ({
    name: `${item._id.month}/${item._id.year}`,
    status: item._id.status,
    count: item.count,
  }));

  return (
    <main className="analytics-page">
      <header className="analytics-header">
        <div>
          <h1>Analytics</h1>
          <p>Task completion, status, and overdue summary.</p>
        </div>
        <Link className="analytics-link" to="/dashboard">
          Back to Dashboard
        </Link>
      </header>

      <section className="analytics-stats">
        {["total", "completed", "pending", "inProgress", "overdue"].map((key) => (
          <div className="analytics-stat" key={key}>
            <span>{key.replace(/([A-Z])/g, " $1")}</span>
            <strong>{overview ? overview[key] : 0}</strong>
          </div>
        ))}
      </section>

      <section className="analytics-grid">
        <div className="analytics-panel">
          <h2>Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={95} label>
                {statusData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-panel">
          <h2>Monthly Trends</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#2563eb" name="Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}

export default Analytics;
