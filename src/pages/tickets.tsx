import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<
    {
      _id: string;
      title: string;
      description: string;
      status: string;
      createdBy: { email: string };
      assignedTo: { email: string } | null;
      priority: string;
      createdAt: string;
    }[]
  >([]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/tickets`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Tickets fetched successfully:", data);
        setTickets(data.tickets || []);
      } else {
        console.error("Failed to fetch tickets");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchTickets();
    })();
  }, []);
  console.log("find me here", tickets);

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">
          Tickets
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center text-lg text-gray-400">
            No tickets found.
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="card bg-base-100 shadow-xl p-6"
                onClick={() => navigate(`/ticket/${ticket._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h2 className="card-title text-xl font-semibold text-primary mb-2 md:mb-0">
                    {ticket.title}
                  </h2>
                  <span
                    className={`badge badge-${
                      ticket.status === "open" ? "success" : "secondary"
                    } text-xs px-3 py-2`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <p className="mb-4 text-base text-gray-300">
                  {ticket.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div>
                    <span className="font-medium text-gray-200">Priority:</span>{" "}
                    {ticket.priority}
                  </div>
                  <div>
                    <span className="font-medium text-gray-200">
                      Created by:
                    </span>{" "}
                    {ticket.createdBy?.email}
                  </div>
                  <div>
                    <span className="font-medium text-gray-200">
                      Assigned to:
                    </span>{" "}
                    {ticket.assignedTo ? ticket.assignedTo.email : "Unassigned"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-200">Created:</span>{" "}
                    {new Date(ticket.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
