import { isNumberedGuest, type Guest } from "./guest";

export const party = {
  celebrant: "Mohammed Aadil",
  title: "Aadil’s Matchday",
  date: "Saturday, 26 September 2026",
  shortDate: "26.09.2026",
  time: "1:00 PM – 5:00 PM",
  venue: "Little Mate Event Center",
  location: "Garki Area 11, Abuja",
  dress: "Your favourite football jersey",
};

export function invitationShareTitle(guest: Guest) {
  const label = isNumberedGuest(guest.name) ? guest.number : guest.name;
  return `${label} · ${party.title}`;
}

export function passShareMessage(guest: Guest) {
  if (isNumberedGuest(guest.name)) {
    return `Here is a one-time gift pass for ${party.celebrant}’s football party. This card admits one. Keep the QR private and show it at the gift table.`;
  }
  return `${guest.name}, here is the one-time gift pass for ${party.celebrant}’s football party. Keep the QR private and show it at the gift table.`;
}

export function passShareText(guest: Guest, passUrl: string) {
  return `${passShareMessage(guest)}\n${passUrl}`;
}

export function whatsappShareHref(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
