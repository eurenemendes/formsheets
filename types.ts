
export interface EcoFeiraReportData {
  type: 'ECOFEIRA_REPORT_DATA';
  userName: string;
  userId: string;
  itemId: string;
  itemUrl: string;
  productName: string;
  supermarket: string;
}

export interface FormState {
  description: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
}
