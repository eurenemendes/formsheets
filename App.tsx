
import React, { useState, useEffect, useCallback } from 'react';
import { EcoFeiraReportData, FormState } from './types';
import ReportForm from './components/ReportForm';
import SuccessMessage from './components/SuccessMessage';

const App: React.FC = () => {
  const [reportData, setReportData] = useState<Partial<EcoFeiraReportData>>({});
  const [formState, setFormState] = useState<FormState>({
    description: '',
    status: 'idle',
  });

  // Listener for the postMessage bridge
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate the source if necessary (optional security)
      // if (event.origin !== 'https://your-ecofeira-domain.com') return;

      const data = event.data;

      if (data && data.type === 'ECOFEIRA_REPORT_DATA') {
        console.log("Formsheets: Dados do EcoFeira recebidos com sucesso!", data);
        setReportData(data);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Notify parent that the iframe is ready to receive data
    window.parent.postMessage({ type: 'FORMSHEETS_READY' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.status === 'submitting') return;

    setFormState(prev => ({ ...prev, status: 'submitting' }));

    // Simulation of API call
    try {
      // Combine visible and hidden fields for the payload
      const payload = {
        ...reportData,
        description: formState.description,
        timestamp: new Date().toISOString(),
      };

      console.log("Enviando reporte:", payload);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormState(prev => ({ ...prev, status: 'success' }));
      
      // Notify parent of success
      window.parent.postMessage({ type: 'FORMSHEETS_SUBMIT_SUCCESS' }, '*');
    } catch (error) {
      console.error("Erro ao enviar reporte:", error);
      setFormState(prev => ({ ...prev, status: 'error' }));
    }
  }, [reportData, formState.description, formState.status]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-transparent">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
        {formState.status === 'success' ? (
          <SuccessMessage />
        ) : (
          <ReportForm 
            data={reportData} 
            formState={formState}
            setFormState={setFormState}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default App;
