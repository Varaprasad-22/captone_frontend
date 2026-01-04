export interface TicketResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  priority?: string;
  createdAt: string;
  category:string
  assignedAgentId?: string | null;
}
