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
};

export type CreateDynamicPixParams = {
  merchantName: string;
  merchantCity: string;
  url: string;
  oneTime?: boolean;
};
