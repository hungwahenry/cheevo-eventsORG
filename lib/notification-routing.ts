export function routeForNotification(
  type: string | undefined,
  data: Record<string, any>
): string | null {
  const eventId = data.event_id;

  switch (type) {
    case 'order.first_sale':
      return eventId && data.order_id
        ? `/event/${eventId}/orders/${data.order_id}`
        : eventId
          ? `/event/${eventId}/attendees`
          : null;
    case 'broadcast.finished':
      return eventId && data.broadcast_id
        ? `/event/${eventId}/broadcasts/${data.broadcast_id}`
        : null;
    case 'event.starting_soon':
    case 'comment.flagged':
      return eventId ? `/event/${eventId}/attendees` : null;
    default:
      return null;
  }
}
