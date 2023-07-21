export interface Conversation { 
  id: number; 
  type: number; 
  subType: number | null; 
  purpose: string; 
  value: string; 
  unit: string; 
  creatorEmpCode: number | null; 
  subList: null; 
  changeStatus?: boolean;
  disabled?:boolean;
  deleteFlag?:number;
  [key:string]: any;
}

export interface flattenConversation {
  children?: Conversation[];
  limitation?: number[];
  radio?: string[];
  type: number;
  subType?: number | null;
  purpose?: string;
  value?: string;
  unit?: string;
  creatorEmpCode?: number | null;
  deleteFlag?: number;
  subList?: null;
  [key:string]: any;
}
