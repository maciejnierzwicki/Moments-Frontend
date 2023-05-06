import { NotificationDTO } from './NotificationDTO';

export interface NotificationsResponse {
  count: Number;
  notifications: NotificationDTO[];
}
