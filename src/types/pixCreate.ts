export type CreateStaticPixParams = {
  merchantName: string;
  merchantCity: string;
  infoAdicional?: string;
  pixKey: string;
  pss?: string;
  txid?: string;
  fss?: string;
  transactionAmount: number;
  isTransactionUnique?: boolean;
  urlRec?: string;
};

export type CreateDynamicPixParams = {
  merchantName: string;
  merchantCity: string;
  url: string;
  oneTime?: boolean;
};

export type CreateCompositePixParams = {
  merchantName: string;
  merchantCity: string;
  oneTime?: boolean;
  url?: string;
  urlRec: string;
};
