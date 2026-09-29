import React, { useState } from 'react';
import { X, Send, Sparkles, AlertCircle, MessageCircle } from 'lucide-react';

interface ProposeChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'es' | 'en';
  adminWhatsapp: string;
}

export const ProposeChannelModal: React.FC<ProposeChannelModalProps> = ({
  isOpen,
  onClose,
  lang,
  adminWhatsapp,
}) => {
  const [proposalType, setProposalType] = useState<'nuevo_canal' | 'reportar_grupo' | 'anuncio'>('nuevo_canal');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [proposerName, setProposerName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const typeLabels = {
      nuevo_canal: lang === 'es' ? '💡 Propuesta de Nuevo Canal' : '💡 New Channel Proposal',
      reportar_grupo: lang === 'es' ? '⚠️ Reporte de Grupo Lleno / Enlace Caído' : '⚠️ Group Full / Broken Link Report',
      anuncio: lang === 'es' ? '📢 Solicitud de Difusión / Anuncio' : '📢 Broadcast Request',
    };

    const text = encodeURIComponent(
      `*Hola Administradores de Tulum Unido*\n\n` +
      `*Tipo:* ${typeLabels[proposalType]}\n` +
      `*De:* ${proposerName || (lang === 'es' ? 'Vecino de Tulum' : 'Tulum Resident')}\n` +
      `*Asunto / Nombre del Canal:* ${title}\n` +
      `*Detalles:* ${description || 'N/A'}\n\n` +
      `_Enviado desde el Directorio Tulum Unido_`
    );

    const cleanPhone = adminWhatsapp.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${text}`;
    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 overflow-hidden z-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-teal-700 mb-1">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            {lang === 'es' ? 'Participación Ciudadana' : 'Community Input'}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900">
          {lang === 'es' ? 'Proponer Canal o Contactar' : 'Suggest Channel or Report'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          {lang === 'es'
            ? '¿Falta un canal temático o un enlace necesita actualización? Envía un mensaje directo al equipo de moderación.'
            : 'Missing a thematic channel or is a group link expired? Contact the administration directly.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {lang === 'es' ? 'Tipo de Solicitud' : 'Request Type'}
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setProposalType('nuevo_canal')}
                className={`py-2 px-2 text-[11px] font-semibold rounded-xl border text-center transition-all ${
                  proposalType === 'nuevo_canal'
                    ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {lang === 'es' ? 'Nuevo Canal' : 'New Channel'}
              </button>

              <button
                type="button"
                onClick={() => setProposalType('reportar_grupo')}
                className={`py-2 px-2 text-[11px] font-semibold rounded-xl border text-center transition-all ${
                  proposalType === 'reportar_grupo'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {lang === 'es' ? 'Reportar Link' : 'Report Link'}
              </button>

              <button
                type="button"
                onClick={() => setProposalType('anuncio')}
                className={`py-2 px-2 text-[11px] font-semibold rounded-xl border text-center transition-all ${
                  proposalType === 'anuncio'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {lang === 'es' ? 'Anuncio' : 'Broadcast'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {lang === 'es' ? 'Tu Nombre / Alias' : 'Your Name / Handle'}
            </label>
            <input
              type="text"
              value={proposerName}
              onChange={(e) => setProposerName(e.target.value)}
              placeholder={lang === 'es' ? 'Ej. Sofía (La Veleta)' : 'e.g. Alex (Aldea Zama)'}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {lang === 'es' ? 'Tema o Nombre Sugerido *' : 'Proposed Topic / Title *'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                proposalType === 'nuevo_canal'
                  ? (lang === 'es' ? 'Ej. Surf & Olas Tulum, Escalada, Cineclub' : 'e.g. Surfing Tulum, Rock Climbing')
                  : (lang === 'es' ? 'Ej. Grupo de Rentas lleno / enlace vencido' : 'e.g. Rentals group link is expired')
              }
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {lang === 'es' ? 'Descripción o Motivo' : 'Details / Context'}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                lang === 'es'
                  ? '¿Por qué sería útil para la comunidad? ¿Estarías dispuesto a ayudar a moderar?'
                  : 'Why would this benefit the community? Would you like to help moderate?'
              }
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full min-h-[46px] rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{lang === 'es' ? 'Enviar a los Administradores' : 'Send to Administrators'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
