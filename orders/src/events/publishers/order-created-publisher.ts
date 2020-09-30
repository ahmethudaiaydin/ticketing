import {Publisher, OrderCreatedEvent, Subjects} from '@ahmet229ticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;

} 