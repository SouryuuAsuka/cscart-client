export type Filter = {
  unique_id: number;
  display_name?: string;
  type: string;
  list_variants: ListVariant[]
}

export type ListVariant = {
  unique_id: number;
  display_name: number;
}