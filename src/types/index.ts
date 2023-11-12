export interface Reviews {
  id: number;
  username: string;
  rating: number;
  comment: string;
}

export interface Movie {
  id: number;
  title: string;
  release_year: number;
  genre: string;
  rating_score: number;
  reviews: Reviews[];
}
