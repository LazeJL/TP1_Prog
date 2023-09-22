export interface ProductFilterResult {
    categoriesSlug: string[];
    search: string;
  }
  

export type NextPageProps<T = Record<string, string>> = {
    params: T,
    searchParams: { [key: string]: string | string[] | undefined }
  };