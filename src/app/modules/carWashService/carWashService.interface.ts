type TCategory = "basic" | 'standard' | 'premium' | 'deluxe' | 'ultimate'

export type TCarWashService = {
    name: string;
    description: string;
    price: number;
    duration: number;
    category: TCategory ,
    isDeleted?: boolean;
  };


  export type TServiceQuery = {
    price?: 'asc' | 'desc'; 
    duration?: 'asc' | 'desc';
    search?: string; 
  };
  