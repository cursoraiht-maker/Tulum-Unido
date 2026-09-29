/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Share2,
  Shield,
  Settings,
  Globe,
  Smartphone,
  Maximize2,
  Users
} from 'lucide-react';
import { WhatsAppChannel, CommunitySettings } from './types';
import { INITIAL_CHANNELS, INITIAL_SETTINGS } from './data/initialChannels';
import { TulumUnidoLogo } from './components/TulumUnidoLogo';
import { ChannelCard } from './components/ChannelCard';
import { ChannelModal } from './components/ChannelModal';
import { RulesModal } from './components/RulesModal';
import { AdminEditorModal } from './components/AdminEditorModal';
import { Toast } from './components/Toast';

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  // Channels state matching the 4 groups from the feather banner
  const [channels, setChannels] = useState<WhatsAppChannel[]>(() => {
    try {
      const saved = localStorage.getItem('tulum_unido_banner_channels');
      return saved ? JSON.parse(saved) : INITIAL_CHANNELS;
    } catch {
      return INITIAL_CHANNELS;
    }
  });

  const [settings, setSettings] = useState<CommunitySettings>(() => {
    try {
      const saved = localStorage.getItem('tulum_unido_banner_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Modals state
  const [selectedChannel, setSelectedChannel] = useState<WhatsAppChannel | null>(null);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Desktop view toggle (Mobile Mockup vs Full)
  const [viewMode, setViewMode] = useState<'mobile_mockup' | 'full'>('mobile_mockup');

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastOpen(true);
    setTimeout(() => setIsToastOpen(false), 2400);
  };

  // Save changes
  const handleSaveChannels = (updated: WhatsAppChannel[]) => {
    setChannels(updated);
    localStorage.setItem('tulum_unido_banner_channels', JSON.stringify(updated));
    showToast(lang === 'es' ? 'Enlaces actualizados' : 'Links updated');
  };

  const handleSaveSettings = (updated: CommunitySettings) => {
    setSettings(updated);
    localStorage.setItem('tulum_unido_banner_settings', JSON.stringify(updated));
    showToast(lang === 'es' ? 'Ajustes guardados' : 'Settings saved');
  };

  const handleResetDefaults = () => {
    setChannels(INITIAL_CHANNELS);
    setSettings(INITIAL_SETTINGS);
    localStorage.removeItem('tulum_unido_banner_channels');
    localStorage.removeItem('tulum_unido_banner_settings');
    showToast(lang === 'es' ? 'Restablecido al banderín oficial' : 'Reset to official banner defaults');
  };

  // Click on WhatsApp group
  const handleJoinWhatsApp = (channel: WhatsAppChannel, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.8 },
        colors: [channel.color, '#25D366', '#ffffff'],
      });
    } catch {
      // safe
    }

    window.open(channel.whatsappInviteUrl, '_blank', 'noopener,noreferrer');
    showToast(lang === 'es' ? `Abriendo WhatsApp: ${channel.title}` : `Opening WhatsApp: ${channel.title}`);
  };

  // Copy link
  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast(lang === 'es' ? '¡Enlace copiado al portapapeles!' : 'Link copied!');
    } catch {
      showToast(url);
    }
  };

  // Share
  const handleShareApp = async () => {
    const shareData = {
      title: 'Tulum Unido - Grupos Oficiales de WhatsApp',
      text: lang === 'es' 
        ? 'Tulum Unido es un grupo de ciudadanos reunidos en busca de un mejor Tulum. Únete y elige tu grupo:'
        : 'Tulum Unido is a community of citizens working together for a better Tulum. Join your group:',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        handleCopyLink(window.location.href);
      }
    } else {
      handleCopyLink(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col items-center justify-start antialiased selection:bg-emerald-500 selection:text-white relative">
      
      {/* Background Palm Beach & Sky Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a231b] via-[#0d2e24] to-[#04140f]" />
        <div className="absolute -top-10 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      {/* Desktop Header Bar */}
      <header className="w-full hidden md:flex items-center justify-between px-6 py-2.5 bg-slate-950/70 backdrop-blur-md border-b border-white/10 text-xs text-slate-300 z-20">
        <div className="flex items-center gap-2">
          <TulumUnidoLogo variant="emblem" className="w-7 h-7" />
          <span className="font-bold text-white tracking-wide">Tulum Unido</span>
          <span className="text-slate-400">· Ciudadanos reunidos por un mejor Tulum</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-0.5 bg-slate-800 rounded-lg border border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('mobile_mockup')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                viewMode === 'mobile_mockup'
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Vista Móvil</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('full')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                viewMode === 'full'
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Pantalla Completa</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-emerald-400" />
            <span>Editar Enlaces</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className={`relative z-10 w-full flex-1 flex justify-center ${viewMode === 'mobile_mockup' ? 'md:py-6' : 'py-0'}`}>
        
        {/* The Banner Shape Container */}
        <div
          className={`w-full bg-white text-slate-800 flex flex-col transition-all duration-200 ${
            viewMode === 'mobile_mockup'
              ? 'max-w-sm sm:max-w-md md:rounded-[40px] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] md:border-[7px] md:border-slate-800 overflow-hidden min-h-[92vh]'
              : 'max-w-xl min-h-screen shadow-2xl'
          }`}
        >

          {/* Top Quick Bar (Normas + Idioma + Compartir) */}
          <div className="pt-3 pb-1 px-5 flex items-center justify-between text-slate-500">
            <button
              type="button"
              onClick={() => setIsRulesModalOpen(true)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 transition-colors bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60"
            >
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>{lang === 'es' ? 'Normas' : 'Rules'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <Globe className="w-3 h-3 text-slate-500" />
                <span>{lang.toUpperCase()}</span>
              </button>

              <button
                type="button"
                onClick={handleShareApp}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                title="Compartir enlace"
                aria-label="Compartir enlace"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Banner Logo Section */}
          <div className="pt-3 pb-2 px-6 text-center">
            <TulumUnidoLogo variant="banner-header" />
          </div>

          {/* Citizen Community Definition & Call to Action (Replacing QR code) */}
          <div className="px-6 pt-3 pb-4 text-center">
            {/* The user-requested citizen mission text */}
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 rounded-2xl border border-emerald-200/70 shadow-xs">
              <div className="flex items-center justify-center gap-1.5 text-[#0a4d3c] mb-1 font-bold text-xs uppercase tracking-wide">
                <Users className="w-3.5 h-3.5 text-emerald-700" />
                <span>{lang === 'es' ? 'Comunidad Ciudadana' : 'Citizen Community'}</span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-700 font-semibold leading-snug">
                {lang === 'es'
                  ? 'Tulum Unido es un grupo de ciudadanos reunidos en busca de un mejor Tulum.'
                  : 'Tulum Unido is a group of citizens gathered together in search of a better Tulum.'}
              </p>
            </div>

            {/* Slogan from the banner: "ÚNETE Y ELIGE EL GRUPO QUE TE INTERESA" */}
            <div className="mt-4 inline-block">
              <h3 className="text-xs sm:text-sm font-black text-[#0e3b2e] tracking-wider uppercase font-['Cabinet_Grotesk',sans-serif]">
                {lang === 'es' 
                  ? 'ÚNETE Y ELIGE EL GRUPO QUE TE INTERESA'
                  : 'JOIN & CHOOSE THE GROUP OF YOUR INTEREST'}
              </h3>
              <div className="h-0.5 w-12 bg-emerald-600 mx-auto mt-1 rounded-full" />
            </div>
          </div>

          {/* The 4 Group Buttons / Pills (Main Links) */}
          <div className="px-5 pt-1 pb-6 space-y-3.5 flex-1 flex flex-col justify-center">
            {channels.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                onOpenDetails={(ch) => setSelectedChannel(ch)}
                onJoinWhatsApp={handleJoinWhatsApp}
              />
            ))}
          </div>

          {/* Banner Bottom Artwork: Mayan Ruins of Tulum, Palms, Waves & Slogan */}
          <div className="relative mt-auto pt-6 pb-6 px-6 text-center overflow-hidden bg-gradient-to-t from-[#093527]/10 via-transparent to-transparent">
            
            {/* Illustrated Tulum Ruin & Palms Silhouette */}
            <div className="w-full flex justify-center mb-3 opacity-90">
              <svg
                viewBox="0 0 320 80"
                className="w-full max-w-xs h-16 drop-shadow-sm select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Sun behind ruins */}
                <circle cx="215" cy="42" r="20" fill="#a7f3d0" opacity="0.35" />

                {/* Tulum El Castillo Mayan Ruin Silhouette */}
                <path
                  d="M170 65 L 175 48 L 180 48 L 182 40 L 205 40 L 208 48 L 222 48 L 228 65 Z"
                  fill="#0e3b2e"
                />
                <rect x="189" y="44" width="7" height="9" rx="0.5" fill="#ffffff" opacity="0.8" />
                <path
                  d="M150 70 C 160 62, 175 60, 240 60 C 255 60, 270 65, 280 72 Z"
                  fill="#0e3b2e"
                  opacity="0.9"
                />

                {/* Palm Trees */}
                <path d="M255 65 C 256 50, 258 35, 260 25" stroke="#0e3b2e" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M260 25 C 252 20, 246 22, 244 26" stroke="#0e3b2e" strokeWidth="2" strokeLinecap="round" />
                <path d="M260 25 C 255 16, 249 16, 247 18" stroke="#0e3b2e" strokeWidth="2" strokeLinecap="round" />
                <path d="M260 25 C 265 14, 271 16, 273 18" stroke="#0e3b2e" strokeWidth="2" strokeLinecap="round" />
                <path d="M260 25 C 268 20, 274 22, 276 26" stroke="#0e3b2e" strokeWidth="2" strokeLinecap="round" />

                <path d="M272 68 C 274 55, 276 45, 278 36" stroke="#0e3b2e" strokeWidth="2" strokeLinecap="round" />
                <path d="M278 36 C 272 30, 267 32, 265 35" stroke="#0e3b2e" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M278 36 C 284 30, 289 32, 291 35" stroke="#0e3b2e" strokeWidth="1.8" strokeLinecap="round" />

                {/* Left Palm Leaves */}
                <path
                  d="M10 68 C 25 55, 45 52, 65 66 C 45 64, 30 68, 10 75 Z"
                  fill="#0e3b2e"
                  opacity="0.8"
                />
                <path
                  d="M20 74 C 35 60, 58 58, 80 72 C 60 70, 42 74, 20 80 Z"
                  fill="#0e3b2e"
                />

                {/* Wave Curves under the ruins */}
                <path
                  d="M0 72 C 50 64, 90 76, 140 70 C 190 64, 240 74, 320 68 L 320 80 L 0 80 Z"
                  fill="#008fa2"
                  opacity="0.85"
                />
                <path
                  d="M0 76 C 60 70, 110 80, 170 74 C 230 68, 280 78, 320 74 L 320 80 L 0 80 Z"
                  fill="#0a4d3c"
                />
              </svg>
            </div>

            {/* Bottom Slogan from the banner */}
            <div className="flex flex-col items-center">
              <span className="text-xs sm:text-sm font-black tracking-widest text-[#0a4d3c] uppercase font-['Cabinet_Grotesk',sans-serif]">
                GENTE DE AQUÍ
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#0a4d3c] uppercase mt-0.5">
                HACIENDO UN MEJOR TULUM
              </span>

              {/* Golden accent bar */}
              <div className="w-16 h-1 bg-[#df981c] rounded-full mt-2" />
            </div>

            {/* Admin quick access */}
            <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="hover:text-slate-600 transition-colors flex items-center gap-1"
              >
                <Settings className="w-3 h-3" />
                <span>{lang === 'es' ? 'Configurar Enlaces' : 'Manage Links'}</span>
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={handleShareApp}
                className="hover:text-slate-600 transition-colors flex items-center gap-1"
              >
                <Share2 className="w-3 h-3" />
                <span>{lang === 'es' ? 'Compartir Directorio' : 'Share Directory'}</span>
              </button>
            </div>

          </div>

        </div>
      </main>

      {/* Modal for Group Details & Guidelines */}
      <ChannelModal
        channel={selectedChannel}
        lang={lang}
        isOpen={Boolean(selectedChannel)}
        onClose={() => setSelectedChannel(null)}
        onJoin={(ch) => handleJoinWhatsApp(ch)}
        onCopyLink={handleCopyLink}
        hasCopied={false}
      />

      {/* Community Rules Modal */}
      <RulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
        lang={lang}
      />

      {/* Admin Link Editor Modal */}
      <AdminEditorModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        lang={lang}
        channels={channels}
        settings={settings}
        onSaveChannels={handleSaveChannels}
        onSaveSettings={handleSaveSettings}
        onResetDefaults={handleResetDefaults}
      />

      {/* Toast */}
      <Toast message={toastMessage} isVisible={isToastOpen} />

    </div>
  );
}
