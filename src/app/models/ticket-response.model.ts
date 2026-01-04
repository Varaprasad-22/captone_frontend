export interface TicketResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  priority?: string;
  createdAt: string;
  assignedAgentId?: string | null;
}
