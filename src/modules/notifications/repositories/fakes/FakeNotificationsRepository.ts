import { ObjectID } from 'mongodb';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const newNotification = new Notification();

    Object.assign(newNotification, {
      id: new ObjectID(),
      content,
      recipient_id,
    });

    this.notifications.push(newNotification);

    return newNotification;
  }
}

export default NotificationsRepository;
