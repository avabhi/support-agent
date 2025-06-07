import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Ticket = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState<{
    _id: string;
    title: string;
    description: string;
    status: string;
    createdBy: { email: string };
    assignedTo: { email: string } | null;
    priority: string;
    createdAt: string;
  } | null>(null);

  const fetchTicket = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTicket(data.ticket);
      } else {
        console.error("Failed to fetch ticket");
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchTicket();
  }, [id]);

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">
          Ticket Details
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : !ticket ? (
          <div className="text-center text-lg text-gray-400">
            Ticket not found.
          </div>
        ) : (
          <div className="card bg-base-100 shadow-2xl p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2">
                {ticket.title}
              </h2>
              <div className="flex flex-wrap gap-4 items-center mb-2">
                <span
                  className={`badge badge-${
                    ticket.status === "open" ? "success" : "secondary"
                  } text-xs px-3 py-2`}
                >
                  {ticket.status}
                </span>
                <span className="badge badge-outline text-xs px-3 py-2">
                  Priority: {ticket.priority}
                </span>
              </div>
              <div className="text-gray-400 text-sm mb-1">
                <span className="font-medium text-gray-200">Created by:</span>{" "}
                {ticket.createdBy?.email}
              </div>
              <div className="text-gray-400 text-sm mb-1">
                <span className="font-medium text-gray-200">Assigned to:</span>{" "}
                {ticket.assignedTo ? ticket.assignedTo.email : "Unassigned"}
              </div>
              <div className="text-gray-400 text-sm mb-1">
                <span className="font-medium text-gray-200">Created:</span>{" "}
                {new Date(ticket.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2 text-primary">
                Description
              </h3>
              <p className="text-base text-gray-300 whitespace-pre-line bg-base-200 rounded-lg p-4 border border-base-300">
                {ticket.description}
              </p>
            </div>
            {/* You can add more detailed sections here, e.g. comments, history, etc. */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticket;
