import nats from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async () => {
    console.log('Publisher connected to nats');

    const data = {
        id: '123',
        title: 'concert',
        price: 20
    };
    const publisher = new TicketCreatedPublisher(stan);
    await publisher.publish(data);

    // stan.publish('ticket:created', data, () => {
    //     console.log('Event published with: ', data);

    // })
});