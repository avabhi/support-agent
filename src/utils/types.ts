export type TTicket = {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdBy: { email: string };
  assignedTo: { email: string } | null;
  priority: string;
  createdAt: string;
};
