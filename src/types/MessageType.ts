export interface MessageType {
  id: number,
  username: string,
  createdAt: string,
  email: string,
  homepage?: string | null,
  messageText: string,
  image: string,
  textFile: string,
  responseTo: string,
}
