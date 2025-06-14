import React from "react";

export type TicketForm = {
  title: string;
  description: string;
  priority: string;
};

interface createTicketFormProps {
  handleAddTicket: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  addForm: TicketForm;
  submitting?: boolean;
}

const CreateTicketForm: React.FC<createTicketFormProps> = ({
  handleAddTicket,
  handleAddChange,
  addForm,
  submitting = false,
}) => {
  return (
    <>
      <form
        className="card bg-base-100 shadow-xl p-4 md:p-8 mb-8 space-y-6 w-full max-w-md mx-auto border border-base-200"
        onSubmit={handleAddTicket}
      >
        <div className="form-control flex flex-col space-y-2 w-full">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold">
              Title
            </span>
          </label>
          <input
            type="text"
            name="title"
            className="w-full input input-bordered text-base md:text-lg focus:ring-2 focus:ring-primary transition-all duration-200"
            value={addForm.title}
            onChange={handleAddChange}
            required
            placeholder="Enter ticket title"
          />
        </div>
        <div className="form-control flex flex-col space-y-2">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold">
              Description
            </span>
          </label>
          <textarea
            name="description"
            className="w-full textarea textarea-bordered text-base md:text-lg min-h-[80px] md:min-h-[120px] focus:ring-2 focus:ring-primary transition-all duration-200"
            value={addForm.description}
            onChange={handleAddChange}
            required
            placeholder="Describe your issue or request"
          />
        </div>
        <div className="form-control flex flex-col space-y-2">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold">
              Priority
            </span>
          </label>
          <select
            name="priority"
            className="w-full select select-bordered text-base md:text-lg focus:ring-2 focus:ring-primary transition-all duration-200"
            value={addForm.priority}
            onChange={handleAddChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-success w-full text-base md:text-lg mt-2 md:mt-4 shadow-md hover:scale-105 transition-transform duration-200"
          disabled={submitting}
        >
          {submitting ? (
            <span className="loading loading-spinner loading-sm mr-2"></span>
          ) : null}
          {submitting ? "Adding..." : "Add Ticket"}
        </button>
      </form>
    </>
  );
};

export default CreateTicketForm;
