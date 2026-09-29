import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Check, 
  Link, 
  Settings,
  MessageCircle
} from 'lucide-react';
import { WhatsAppChannel, CommunitySettings } from '../types';

interface AdminEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'es' | 'en';
  channels: WhatsAppChannel[];
  settings: CommunitySettings;
  onSaveChannels: (channels: WhatsAppChannel[]) => void;
  onSaveSettings: (settings: CommunitySettings) => void;
  onResetDefaults: () => void;
}

export const AdminEditorModal: React.FC<AdminEditorModalProps> = ({
  isOpen,
  onClose,
  lang,
  channels,
  settings,
  onSaveChannels,
  onSaveSettings,
  onResetDefaults,
}) => {
  const [editingChannel, setEditingChannel] = useState<WhatsAppChannel | null>(null);
  const [localChannels, setLocalChannels] = useState<WhatsAppChannel[]>(channels);
  const [localSettings, setLocalSettings] = useState<CommunitySettings>(settings);
  const [saveFeedback, setSaveFeedback] = useState(false);

  React.useEffect(() => {
    setLocalChannels(channels);
    setLocalSettings(settings);
  }, [channels, settings, isOpen]);

  if (!isOpen) return null;

  const handleUpdateUrl = (id: string, newUrl: string) => {
    setLocalChannels(prev => prev.map(ch => ch.id === id ? { ...ch, whatsappInviteUrl: newUrl } : ch));
  };

  const handleSaveAll = () => {
    onSaveChannels(localChannels);
    onSaveSettings(localSettings);
    setSaveFeedback(true);
    setTimeout(() => {
      setSaveFeedback(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a4d3c] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {lang === 'es' ? 'Enlaces de WhatsApp · Tulum Unido' : 'WhatsApp Links · Tulum Unido'}
              </h3>
              <p className="text-[11px] text-emerald-200">
                {lang === 'es' ? 'Actualiza los enlaces oficiales de los 4 grupos' : 'Update the official 4 group links'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <p className="text-xs text-slate-500">
            {lang === 'es'
              ? 'Pega los enlaces directos de invitación generados por WhatsApp (chat.whatsapp.com/invite/...) para cada grupo:'
              : 'Paste your WhatsApp invite links for each official group:'}
          </p>

          <div className="space-y-3.5">
            {localChannels.map((channel) => (
              <div
                key={channel.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: channel.color }}
                    />
                    <span className="font-black text-xs text-slate-900 tracking-wide uppercase">
                      {channel.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {channel.subtitle}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="url"
                    value={channel.whatsappInviteUrl}
                    onChange={(e) => handleUpdateUrl(channel.id, e.target.value)}
                    placeholder="https://chat.whatsapp.com/invite/..."
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Central Community Link */}
          <div className="mt-4 p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-2">
            <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wide">
              {lang === 'es' ? 'Enlace Central de la Comunidad' : 'Main Community Hub Link'}
            </label>
            <input
              type="url"
              value={localSettings.mainCommunityWhatsappUrl}
              onChange={(e) => setLocalSettings({ ...localSettings, mainCommunityWhatsappUrl: e.target.value })}
              className="w-full px-3 py-2 text-xs font-mono bg-white border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2 flex justify-start">
            <button
              type="button"
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Restablecer valores originales' : 'Reset to defaults'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
          >
            {lang === 'es' ? 'Cancelar' : 'Cancel'}
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0a4d3c] hover:bg-[#07362a] text-white font-bold text-xs shadow-md transition-all duration-150"
          >
            {saveFeedback ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>{lang === 'es' ? '¡Guardado!' : 'Saved!'}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{lang === 'es' ? 'Guardar Cambios' : 'Save Changes'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
