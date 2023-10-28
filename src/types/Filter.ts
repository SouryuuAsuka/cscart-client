export type Filter = {
  unique_id: number;
  display_name?: string | null;
  type: string;
  list_variants?: ListVariant[];
  slider_min_value?: number | null;
  slider_max_value?: number | null;
  slider_value_prefix?: string | null;
  slider_value_suffix?: string | null;
}

export type ListVariant = {
  unique_id: number;
  display_name: number;
}