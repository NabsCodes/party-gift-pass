import { isNumberedGuest, type Guest } from "./guest";

export function artworkCopy(guest: Guest) {
  if (isNumberedGuest(guest.name)) {
    return {
      invitationEyebrow: "INVITATION",
      invitationHero: "THIS CARD ADMITS ONE",
      invitationSub: guest.number,
      passEyebrow: "ONE SPECIAL GIFT",
      passHero: "ADMITS ONE",
      passSub: "SHOW THIS QR AT THE GIFT TABLE.",
    };
  }
  return {
    invitationEyebrow: "A PERSONAL INVITATION FOR",
    invitationHero: guest.name,
    invitationSub: "YOU’RE ON THE TEAM.",
    passEyebrow: "A SPECIAL GIFT FOR",
    passHero: guest.name,
    passSub: "KEEP THIS QR PRIVATE UNTIL COLLECTION.",
  };
}
