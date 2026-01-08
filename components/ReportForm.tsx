
import React from 'react';
import { EcoFeiraReportData, FormState } from '../types';

interface ReportFormProps {
  data: Partial<EcoFeiraReportData>;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: (e: React.FormEvent) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ data, formState, setFormState, onSubmit }) => {
  const isSubmitting = formState.status === 'submitting';

  return (
    <form onSubmit={onSubmit} className="p-6 space-y-4">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Reportar Problema</h1>
        <p className="text-sm text-gray-500">
          Encontrou algo errado com <span className="text-emerald-600 font-semibold">{data.productName || 'este item'}</span>?
        </p>
      </header>

      {/* Hidden Fields */}
      <input type="hidden" name="userName" value={data.userName || ''} />
      <input type="hidden" name="userId" value={data.userId || ''} />
      <input type="hidden" name="itemId" value={data.itemId || ''} />
      <input type="hidden" name="itemUrl" value={data.itemUrl || ''} />
      <input type="hidden" name="productName" value={data.productName || ''} />
      <input type="hidden" name="supermarket" value={data.supermarket || ''} />

      {/* Visible Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição do Erro
        </label>
        <textarea
          id="description"
          required
          placeholder="Ex: Preço incorreto, produto fora de estoque..."
          rows={4}
          value={formState.description}
          onChange={(e) => setFormState(prev => ({ ...prev, description: e.target.value }))}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !formState.description.trim()}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center space-x-2 
          ${isSubmitting || !formState.description.trim() 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-[#10b981] hover:bg-emerald-600 active:scale-[0.98]'}`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Enviando...</span>
          </>
        ) : (
          <span>Enviar Reporte</span>
        )}
      </button>

      <footer className="pt-2 text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          Powered by Formsheets
        </p>
      </footer>
    </form>
  );
};

export default ReportForm;
