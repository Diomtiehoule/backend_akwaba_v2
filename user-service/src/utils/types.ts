
export interface ProduitData {
    code?: string;
    montant: number;
    parentId: number;
    type?: string;
  }
  
  export interface TicketData {
    tarif?: string;
    nombre: number;
    tarifId: number;
    produitId: number;
    tarifEventId:number
  }
  