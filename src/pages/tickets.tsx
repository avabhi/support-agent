import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RootLayout from "./Layout";
import type { TTicket } from "../utils/types";

const Tickets = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<TTicket[]>([]);

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

  return (
    <RootLayout>
      <div className="min-h-screen bg-base-200 py-10 flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] w-full px-2">
              <div className="text-center text-base md:text-lg font-semibold text-gray-300 mb-8 leading-tight">
                There is no open ticket by you.
              </div>
              <button
                className="btn btn-primary mb-8 text-base md:text-lg px-6 py-2"
                onClick={() => navigate("/create-ticket")}
              >
                {"Create Ticket"}
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {tickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="card bg-base-100 shadow-xl p-6 md:p-8"
                    onClick={() => navigate(`/ticket/${ticket._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h2 className="card-title text-lg md:text-xl font-bold text-primary mb-3 md:mb-0">
                        {ticket.title}
                      </h2>
                      <span
                        className={`badge badge-${
                          ticket.status === "open" ? "success" : "secondary"
                        } text-base md:text-lg px-3 py-1.5`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <p className="mb-4 text-base md:text-lg text-gray-300">
                      {ticket.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-base md:text-lg text-gray-400">
                      <div>
                        <span className="font-medium text-gray-200">
                          Priority:
                        </span>{" "}
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
                        {ticket.assignedTo
                          ? ticket.assignedTo.email
                          : "Unassigned"}
                      </div>
                      <div>
                        <span className="font-medium text-gray-200">
                          Created:
                        </span>{" "}
                        {new Date(ticket.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </RootLayout>
  );
};

export default Tickets;
