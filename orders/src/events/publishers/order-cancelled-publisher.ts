import {Publisher, OrderCancelledEvent, Subjects} from '@ahmet229ticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;

} 