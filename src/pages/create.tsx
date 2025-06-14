import { useState } from "react";
import RootLayout from "./Layout";
import CreateTicketForm from "../components/form/createTicketForm";

const CreateTicket = () => {
  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const [addLoading, setAddLoading] = useState(false);

  const handleAddChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(addForm),
        }
      );
      if (response.ok) {
        setAddForm({ title: "", description: "", priority: "medium" });
        // setShowAddForm(false);
        // await fetchTickets();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add ticket");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <RootLayout>
      <div className="min-h-screen bg-base-200 py-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[40vh] w-full px-2">
            <CreateTicketForm
              addForm={addForm}
              handleAddChange={handleAddChange}
              handleAddTicket={handleAddTicket}
              submitting={addLoading}
            />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default CreateTicket;
