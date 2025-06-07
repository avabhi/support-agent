import { useEffect, useState } from "react";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [ticketCount, setTicketCount] = useState<number | null>(null);
  const [openTicketCount, setOpenTicketCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const [usersRes, ticketsRes, openTicketsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/get-users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_SERVER_URL}/api/tickets`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_SERVER_URL}/api/tickets`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const usersData = await usersRes.json();
        const ticketsData = await ticketsRes.json();
        console.log("Open Tickets Response:", ticketsData?.tickets.length);
        // const openTicketsData = await openTicketsRes.json();
        setUserCount(usersData?.users.length ?? 0);
        setTicketCount(ticketsData?.tickets.length ?? 0);
        setOpenTicketCount(ticketsData?.tickets.length ?? 0);
      } catch {
        setUserCount(null);
        setTicketCount(null);
        setOpenTicketCount(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="card bg-base-100 shadow-xl p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <div className="text-3xl font-bold text-primary">
              {loading ? (
                <span className="loading loading-spinner loading-md text-primary"></span>
              ) : userCount !== null ? (
                userCount
              ) : (
                "--"
              )}
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Total Tickets</h2>
            <div className="text-3xl font-bold text-primary">
              {loading ? (
                <span className="loading loading-spinner loading-md text-primary"></span>
              ) : ticketCount !== null ? (
                ticketCount
              ) : (
                "--"
              )}
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Open Tickets</h2>
            <div className="text-3xl font-bold text-primary">
              {loading ? (
                <span className="loading loading-spinner loading-md text-primary"></span>
              ) : openTicketCount !== null ? (
                openTicketCount
              ) : (
                "--"
              )}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Admin Actions
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-gray-300">
            <li>View and manage all users</li>
            <li>View, assign, or close tickets</li>
            <li>Monitor system status and reports</li>
            <li>Configure application settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
