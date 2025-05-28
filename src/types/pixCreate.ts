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
  urlRec?: string;
  oneTime?: boolean;
};

export type CreateRecurrencePixParams = {
  merchantName: string;
  merchantCity: string;
  oneTime?: boolean;
  urlRec: string;
};
