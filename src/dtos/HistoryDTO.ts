export interface HistoryByDayDTO {
  title: string;
  data:  HistoryDTO[];
}

export interface HistoryDTO {
  id:          number;
  user_id:     number;
  exercise_id: number;
  name:        string;
  group:       string;
  created_at:  Date;
  hour:        string;
}
