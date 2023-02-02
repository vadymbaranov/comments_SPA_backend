export interface Message {
  id: number,
  username: string,
  createdAt: string,
  email: string,
  homepage?: string | null,
  messageText: string,
}
