export enum UserRole {
  ADMIN = "ADMIN",
  ORGANIZER = "ORGANIZER",
  ORGANIZER_STAFF = "ORGANIZER_STAFF",
  USER = "USER",
}

export enum EventStatus {
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELED = "CANCELED",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELED = "CANCELED",
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
  PAYPAL = "PAYPAL",
  PROMPTPAY = "PROMPTPAY",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
  organizerId?: string;
  organizer?: Organizer;
  tickets: Ticket[];
  orders: Order[];
  payments: Payment[];
  applications: EventApplication[];
}

export interface Organizer {
  id: string;
  name: string;
  users: User[];
  events: Event[];
}

export interface EventCategory {
  id: string;
  name: string;
  events: Event[];
}

export interface Event {
  id: string;
  title: string;
  typeId: string;
  eventCategory: EventCategory;
  description: string;
  location: string;
  imageUrl?: string;
  startTime: Date;
  endTime: Date;
  status: EventStatus;
  organizerId: string;
  organizer: Organizer;
  tickets: Ticket[];
  orders: Order[];
  application?: EventApplication;
  applicationId?: string;
  createdAt: Date;
}

export interface EventApplication {
  id: string;
  eventId: string;
  event: Event;
  organizerId: string;
  organizer: User;
  status: ApplicationStatus;
  reason?: string;
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface Ticket {
  id: string;
  name: string;
  seat?: string;
  price: number;
  quantity: number;
  eventId: string;
  event: Event;
  orders: Order[];
  attendance: boolean;
  users: User[];
}

export interface Order {
  id: string;
  userId: string;
  user: User;
  eventId: string;
  event: Event;
  ticketId: string;
  ticket: Ticket;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  payments: Payment[];
}

export interface Payment {
  id: string;
  userId: string;
  user: User;
  orderId: string;
  order: Order;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
}