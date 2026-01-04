export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface AssignTicketRequest {
  ticketId: string;
  agentId: string;
  priority?: Priority; 
}
