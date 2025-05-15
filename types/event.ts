export interface Event {
  id: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  imageUrl: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
}
