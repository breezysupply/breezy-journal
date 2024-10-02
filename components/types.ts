export interface JournalEntry {
  id: string;
  type: 'journal' | 'recipe' | 'list' | 'photo';
  title: string;
  content?: string;
  ingredients?: string;
  steps?: string;
  listItems?: { text: string; checked: boolean }[];
  imageUrl?: string;
  timestamp: Date;
}
