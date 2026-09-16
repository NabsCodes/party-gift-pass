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

export function invitationShareTitle(guestName: string) {
  return `${guestName} · ${party.title}`;
}

export function passShareMessage(guestName: string) {
  return `${guestName}, here is the one-time gift pass for ${party.celebrant}’s football party. Keep the QR private and show it at the gift table.`;
}

export function passShareText(guestName: string, passUrl: string) {
  return `${passShareMessage(guestName)}\n${passUrl}`;
}

export function whatsappShareHref(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
