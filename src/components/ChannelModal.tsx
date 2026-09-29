import React from 'react';
import { 
  X, 
  MessageCircle, 
  Users, 
  ShieldCheck, 
  Copy, 
  Check, 
  Share2, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';
import { WhatsAppChannel } from '../types';

interface ChannelModalProps {
  channel: WhatsAppChannel | null;
  lang: 'es' | 'en';
  isOpen: boolean;
  onClose: () => void;
  onJoin: (channel: WhatsAppChannel) => void;
  onCopyLink: (link: string) => void;
  hasCopied: boolean;
}

export const ChannelModal: React.FC<ChannelModalProps> = ({
  channel,
  lang,
  isOpen,
  onClose,
  onJoin,
  onCopyLink,
  hasCopied,
}) => {
  if (!isOpen || !channel) return null;

  const handleShare = async () => {
    const title = `${channel.title} - Tulum Unido`;
    const text = `${channel.description[lang]}\nÚnete al canal oficial de WhatsApp de Tulum Unido:`;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: channel.whatsappInviteUrl,
        });
      } catch {
        onCopyLink(channel.whatsappInviteUrl);
      }
    } else {
      onCopyLink(channel.whatsappInviteUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 animate-in slide-in-from-bottom duration-200">
        
        {/* Mobile Drag Bar */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1" />

        {/* Header with channel color */}
        <div 
          className="relative px-6 pt-5 pb-6 text-white"
          style={{ backgroundColor: channel.color }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {channel.badge && (
            <div className="inline-block text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full mb-2">
              {channel.badge}
            </div>
          )}

          <h2 className="text-xl sm:text-2xl font-black tracking-wide text-white uppercase font-['Cabinet_Grotesk',sans-serif]">
            {channel.title}
          </h2>

          <p className="text-xs text-white/90 font-medium mt-1">
            {channel.subtitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              {lang === 'es' ? 'Propósito del Grupo' : 'Group Purpose'}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {channel.description[lang] || channel.description.es}
            </p>
          </div>

          {/* Rules */}
          {channel.rules && channel.rules.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'es' ? 'Normas de Convivencia' : 'Community Rules'}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {channel.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {channel.coordinator && (
            <div className="flex items-center justify-between text-xs text-slate-500 py-1 border-t border-slate-100">
              <span className="font-medium">{lang === 'es' ? 'Coordinación:' : 'Coordinated by:'}</span>
              <span className="font-bold text-slate-800">{channel.coordinator}</span>
            </div>
          )}

          <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl text-amber-800 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
            <p>
              {lang === 'es'
                ? 'Comunidad vecinal oficial Tulum Unido. Mantengamos las conversaciones constructivas y enfocadas.'
                : 'Official Tulum Unido community. Keep discussions constructive, helpful, and respectful.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onCopyLink(channel.whatsappInviteUrl)}
              className="flex-1 sm:flex-initial min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              {hasCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'es' ? '¡Copiado!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{lang === 'es' ? 'Copiar Link' : 'Copy Link'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
              title="Compartir"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onJoin(channel)}
            className="w-full sm:flex-1 min-h-[48px] px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>{lang === 'es' ? 'Unirse al Grupo de WhatsApp' : 'Join WhatsApp Group'}</span>
            <ExternalLink className="w-4 h-4 text-white/80" />
          </button>
        </div>

      </div>
    </div>
  );
};
