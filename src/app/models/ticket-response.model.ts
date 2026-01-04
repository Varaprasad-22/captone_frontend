export interface TicketResponse {
  id: string;
  ticketId:string;
  title: string;
  description: string;
  status: string;
  priority?: string;
  createdAt: string;
  category:string
  assignedAgentId?: string | null;
}
