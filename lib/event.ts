import { isNumberedGuest, type Guest } from "./guest";

export const party = {
  celebrant: "Bamanga",
  title: "Bamanga’s Block Party",
  date: "Saturday, 31 October 2026",
  shortDate: "31.10.2026",
  dress: "Come ready to play",
};

export function invitationShareTitle(guest: Guest) {
  const label = isNumberedGuest(guest.name) ? guest.number : guest.name;
  return `${label} · ${party.title}`;
}

export function passShareMessage(guest: Guest) {
  if (isNumberedGuest(guest.name)) {
    return `Here is a one-time gift pass for ${party.celebrant}’s block party. This card admits one. Keep the QR private and show it at the gift table.`;
  }
  return `${guest.name}, here is the one-time gift pass for ${party.celebrant}’s block party. Keep the QR private and show it at the gift table.`;
}

export function passShareText(guest: Guest, passUrl: string) {
  return `${passShareMessage(guest)}\n${passUrl}`;
}

export function whatsappShareHref(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
