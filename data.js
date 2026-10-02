/* Venue information used across the website */

const venues = [
  {
    id: 1,
    name: "PlayArena CIDCO",
    location: "CIDCO, Chhatrapati Sambhajinagar",
    sport: "Cricket",
    price: 800,
    rating: 4.5,
    image: "cricket.jpg",
    hours: "6:00 AM - 11:00 PM",
    facilities: ["Parking", "Changing Room", "Drinking Water", "Floodlights"],
    sports: ["Cricket", "Football"],
    description:
      "A box cricket turf with high safety nets and floodlights. Suitable for evening matches with friends and small local tournaments."
  },
  {
    id: 2,
    name: "GamePoint Nirala Bazar",
    location: "Nirala Bazar, Chhatrapati Sambhajinagar",
    sport: "Football",
    price: 950,
    rating: 4.3,
    image: "football.jpg",
    hours: "6:00 AM - 11:00 PM",
    facilities: ["Parking", "Washroom", "First Aid"],
    sports: ["Football", "Cricket"],
    description:
      "5-a-side football turf with good quality artificial grass. Bibs and footballs are available at the counter."
  },
  {
    id: 3,
    name: "SportZone Garkheda",
    location: "Garkheda, Chhatrapati Sambhajinagar",
    sport: "Badminton",
    price: 400,
    rating: 4.6,
    image: "badminton.jpg",
    hours: "6:00 AM - 10:00 PM",
    facilities: ["AC Hall", "Changing Room", "Drinking Water"],
    sports: ["Badminton"],
    description:
      "Indoor badminton hall with four wooden courts and proper lighting. Racquets can be taken on rent."
  },
  {
    id: 4,
    name: "Smash Arena TV Centre",
    location: "TV Centre, Chhatrapati Sambhajinagar",
    sport: "Badminton",
    price: 450,
    rating: 4.2,
    image: "badminton.jpg",
    hours: "7:00 AM - 10:00 PM",
    facilities: ["Parking", "Cafeteria", "Washroom"],
    sports: ["Badminton", "Volleyball"],
    description:
      "Popular badminton centre in TV Centre. Morning slots are usually free and evening slots get booked fast."
  },
  {
    id: 5,
    name: "Osmanpura Sports Hub",
    location: "Osmanpura, Chhatrapati Sambhajinagar",
    sport: "Basketball",
    price: 600,
    rating: 4.1,
    image: "basketball.jpg",
    hours: "6:00 AM - 10:00 PM",
    facilities: ["Parking", "Drinking Water", "Seating Area"],
    sports: ["Basketball", "Volleyball"],
    description:
      "Open basketball court with a good concrete surface and two hoops. Practice sessions are also allowed."
  },
  {
    id: 6,
    name: "Sambhajinagar Turf House",
    location: "Osmanpura, Chhatrapati Sambhajinagar",
    sport: "Cricket",
    price: 750,
    rating: 3.9,
    image: "cricket.jpg",
    hours: "5:00 AM - 11:00 PM",
    facilities: ["Parking", "Changing Room"],
    sports: ["Cricket", "Football"],
    description:
      "Budget friendly turf for box cricket. Early morning slots are available at the same price."
  },
  {
    id: 7,
    name: "Viman Sports Arena",
    location: "Ulkanagari, Chhatrapati Sambhajinagar",
    sport: "Tennis",
    price: 700,
    rating: 4.4,
    image: "tennis.jpg",
    hours: "6:00 AM - 9:00 PM",
    facilities: ["Coaching", "Washroom", "Drinking Water"],
    sports: ["Tennis"],
    description:
      "Two hard tennis courts maintained regularly. Coaching is available on weekends for beginners."
  },
  {
    id: 8,
    name: "Prozone Play Zone",
    location: "Prozone Mall Area, Chhatrapati Sambhajinagar",
    sport: "Volleyball",
    price: 500,
    rating: 3.8,
    image: "volleyball.jpg",
    hours: "7:00 AM - 10:00 PM",
    facilities: ["Parking", "Drinking Water"],
    sports: ["Volleyball", "Basketball"],
    description:
      "Indoor volleyball court popular with community groups and local teams for regular practice."
  },
  {
    id: 9,
    name: "Mukundwadi Football Arena",
    location: "Mukundwadi, Chhatrapati Sambhajinagar",
    sport: "Football",
    price: 900,
    rating: 4.0,
    image: "football.jpg",
    hours: "6:00 AM - 11:30 PM",
    facilities: ["Floodlights", "Parking", "Washroom", "Cafeteria"],
    sports: ["Football"],
    description:
      "Full size 7-a-side football turf with floodlights. Best suited for group bookings in the evening."
  },
  {
    id: 10,
    name: "City Badminton Club",
    location: "Nirala Bazar, Chhatrapati Sambhajinagar",
    sport: "Badminton",
    price: 350,
    rating: 4.7,
    image: "badminton.jpg",
    hours: "6:00 AM - 10:30 PM",
    facilities: ["Changing Room", "Drinking Water", "Parking"],
    sports: ["Badminton", "Tennis"],
    description:
      "Simple and clean badminton club with synthetic courts. Monthly membership is also available."
  }
];

/* Common time slots shown on the booking page */
const timeSlots = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM"
];

/* Find one venue by its id */
function getVenueById(id) {
  return venues.find(function (v) {
    return v.id === Number(id);
  });
}
