export const reviews = [
  {
    id: "review-1",
    quote: "Collins writes with the precision of an engineer and the soul of a poet. The Decryption Gambit kept me up for three nights straight.",
    author: "The New York Times Book Review",
    authorTitle: "Featured Review",
    rating: 5,
    bookId: "decryption-gambit",
    featured: true,
  },
  {
    id: "review-2",
    quote: "A mind-bending exploration of consciousness that will make you question everything you thought you knew about reality.",
    author: "Scientific American",
    authorTitle: "Science Fiction Spotlight",
    rating: 5,
    bookId: "quantum-ascendancy",
    featured: true,
  },
  {
    id: "review-3",
    quote: "Zero to Infinity is not just a novel—it's a philosophical treatise disguised as a thriller. Absolutely brilliant.",
    author: "Dr. Marcus Webb",
    authorTitle: "MIT Professor of Mathematics",
    rating: 5,
    bookId: "zero-infinity",
    featured: true,
  },
  {
    id: "review-4",
    quote: "Collins has created a new genre: the mathematical thriller. I've never read anything quite like this.",
    author: "Wired Magazine",
    authorTitle: "Book of the Month",
    rating: 5,
    bookId: "zero-infinity",
    featured: true,
  },
  {
    id: "review-5",
    quote: "The Accord of Shadows reads like a fever dream of power and paranoia. Essential reading for our times.",
    author: "The Guardian",
    authorTitle: "Books Section",
    rating: 4,
    bookId: "accord-shadows",
    featured: true,
  },
  {
    id: "review-6",
    quote: "Silent Dominion redefines what science fiction can be. Collins doesn't just predict the future—he architectures it.",
    author: "Publishers Weekly",
    authorTitle: "Starred Review",
    rating: 5,
    bookId: "silent-dominion",
    featured: true,
  },
  {
    id: "review-7",
    quote: "The Optimization of Eden asks the questions that keep AI researchers awake at night. A masterpiece of speculative fiction.",
    author: "Dr. Elena Vasquez",
    authorTitle: "Stanford AI Lab Director",
    rating: 5,
    bookId: "optimization-eden",
    featured: true,
  },
  {
    id: "review-8",
    quote: "Collins brings cybersecurity to life in ways that are both terrifying and exhilarating. His technical accuracy is unmatched.",
    author: "Bruce Schneier",
    authorTitle: "Security Technologist",
    rating: 5,
    bookId: "decryption-gambit",
    featured: false,
  },
  {
    id: "review-9",
    quote: "I couldn't put it down. Every page revealed another layer of the conspiracy, another twist I didn't see coming.",
    author: "Sarah M.",
    authorTitle: "Verified Reader",
    rating: 5,
    bookId: "accord-shadows",
    featured: false,
  },
  {
    id: "review-10",
    quote: "As a physicist, I'm usually skeptical of sci-fi quantum mechanics. Collins gets it right—and makes it thrilling.",
    author: "Dr. James Chen",
    authorTitle: "CERN Researcher",
    rating: 5,
    bookId: "quantum-ascendancy",
    featured: false,
  },
  {
    id: "review-11",
    quote: "The world-building is extraordinary. Every detail feels meticulously researched and purposefully placed.",
    author: "Fantasy & Sci-Fi Magazine",
    authorTitle: "Editor's Choice",
    rating: 5,
    bookId: "silent-dominion",
    featured: false,
  },
  {
    id: "review-12",
    quote: "Collins writes villains you understand, heroes you doubt, and plots that haunt you long after the last page.",
    author: "BookRiot",
    authorTitle: "Must-Read List",
    rating: 5,
    bookId: "optimization-eden",
    featured: false,
  },
];

export const getFeaturedReviews = () =>
  reviews.filter((review) => review.featured);

export const getReviewsByBook = (bookId) =>
  reviews.filter((review) => review.bookId === bookId);

export const getReviewById = (id) =>
  reviews.find((review) => review.id === id);
