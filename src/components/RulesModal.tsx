import React from 'react';
import { X, Shield, Phone, AlertTriangle, CheckCircle2, HeartHandshake, TreePine } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'es' | 'en';
}

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const rulesList = [
    {
      title: lang === 'es' ? '1. Respeto y Convivencia Sana' : '1. Respect & Positive Vibes',
      desc: lang === 'es'
        ? 'No se tolera agresiones verbales, discriminación ni acoso. Tulum es un punto de encuentro multicultural de residentes, mayas, mexicanos y amigos de todo el mundo.'
        : 'Zero tolerance for harassment, discrimination, or abusive language. Tulum thrives on multicultural harmony between locals, indigenous Maya communities, and global residents.',
    },
    {
      title: lang === 'es' ? '2. Cero Spam y Respeto de Canales' : '2. No Spam & Use Dedicated Channels',
      desc: lang === 'es'
        ? 'Publica cada tema en su canal correspondiente. No repitas el mismo anuncio en varios grupos ni compartas cadenas, memes o enlaces sospechosos.'
        : 'Post topics strictly in their designated channel. Never cross-post the same ad in multiple groups or forward chain messages/spam.',
    },
    {
      title: lang === 'es' ? '3. Prevención de Fraudes y Rentas Seguras' : '3. Fraud Prevention & Secure Rentals',
      desc: lang === 'es'
        ? 'NUNCA envíes transferencias ni anticipos antes de visitar físicamente la propiedad o corroborar la identidad del dueño. Reporta perfiles sospechosos a los administradores.'
        : 'NEVER send deposits or wire funds before physically inspecting the property and meeting the owner. Immediately report suspicious accounts to moderators.',
    },
    {
      title: lang === 'es' ? '4. Precios Claros y Transparentes' : '4. Transparent Pricing',
      desc: lang === 'es'
        ? 'Toda oferta en grupos de renta, bazar o servicios debe indicar el precio claro en Pesos Mexicanos (MXN). No publicar ofertas engañosas.'
        : 'All offerings in rental, bazaar, or job channels must include transparent prices in Mexican Pesos (MXN).',
    },
    {
      title: lang === 'es' ? '5. Compromiso Ecológico con Tulum' : '5. Environmental Stewardship',
      desc: lang === 'es'
        ? 'Cuidemos juntos los cenotes, manglares, arrecifes y la selva. No tires basura y participa activamente en brigadas de limpieza.'
        : 'Let us protect cenotes, mangroves, coral reefs, and the jungle. Minimize single-use plastics and support local conservation efforts.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[88vh] flex flex-col z-10">
        {/* Header */}
        <div className="px-6 py-5 bg-[#0c2d48] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="font-bold text-lg">
                {lang === 'es' ? 'Reglamento de la Comunidad' : 'Community Guidelines'}
              </h3>
              <p className="text-xs text-teal-200">
                {lang === 'es' ? 'Tulum Unido · Convivencia y Seguridad' : 'Tulum Unido · Harmony & Safety'}
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

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-2xl flex items-center gap-3">
            <HeartHandshake className="w-6 h-6 text-teal-700 flex-shrink-0" />
            <p className="text-xs text-teal-900 leading-relaxed font-medium">
              {lang === 'es'
                ? 'Nuestra meta es crear una red confiable y unida que apoye a los vecinos, negocios locales y proteja la calidad de vida en Tulum.'
                : 'Our mission is to foster a reliable, united local network supporting residents, homegrown businesses, and preserving quality of life in Tulum.'}
            </p>
          </div>

          {/* Rules items */}
          <div className="space-y-3">
            {rulesList.map((r, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{r.title}</span>
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed pl-6">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Emergency contacts card */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
            <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider mb-2">
              <Phone className="w-4 h-4 text-red-600" />
              <span>{lang === 'es' ? 'Teléfonos de Emergencia Tulum' : 'Tulum Emergency Contacts'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-red-800">
              <div className="bg-white/80 p-2 rounded-lg">
                <span className="font-bold block">Emergencias:</span>
                <span className="font-mono text-sm font-bold text-red-600">911</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg">
                <span className="font-bold block">Cruz Roja:</span>
                <span className="font-mono text-xs">+52 984 871 2299</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg">
                <span className="font-bold block">Protección Civil:</span>
                <span className="font-mono text-xs">+52 984 871 2688</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg">
                <span className="font-bold block">Bomberos Tulum:</span>
                <span className="font-mono text-xs">+52 984 871 2922</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 min-h-[44px] transition-colors"
          >
            {lang === 'es' ? 'Entendido y Acepto las Normas' : 'Understood & Agree'}
          </button>
        </div>
      </div>
    </div>
  );
};
