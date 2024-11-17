export interface Activity {
  name: string;
  description: string;
  date: string;
  images: string[];
  imageCredit: {
    name: string;
    link?: string;
  };
}
