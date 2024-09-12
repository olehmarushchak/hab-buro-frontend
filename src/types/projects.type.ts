export interface Projects {
  id: string;
  title: string;
  category: string;
  mainimg: string;
  description: string;
  descriptionENG: string | null;
  images: string[];
  tour: string | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
}
