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

  // Channels state matching the 6 groups from the updated graphic
  const [channels, setChannels] = useState<WhatsAppChannel[]>(() => {
    try {
      const saved = localStorage.getItem('tulum_unido_banner_channels_v2');
      return saved ? JSON.parse(saved) : INITIAL_CHANNELS;
    } catch {
      return INITIAL_CHANNELS;
    }
  });

  const [settings, setSettings] = useState<CommunitySettings>(() => {
    try {
      const saved = localStorage.getItem('tulum_unido_banner_settings_v2');
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
    localStorage.setItem('tulum_unido_banner_channels_v2', JSON.stringify(updated));
    showToast(lang === 'es' ? 'Enlaces actualizados' : 'Links updated');
  };

  const handleSaveSettings = (updated: CommunitySettings) => {
    setSettings(updated);
    localStorage.setItem('tulum_unido_banner_settings_v2', JSON.stringify(updated));
    showToast(lang === 'es' ? 'Ajustes guardados' : 'Settings saved');
  };

  const handleResetDefaults = () => {
    setChannels(INITIAL_CHANNELS);
    setSettings(INITIAL_SETTINGS);
    localStorage.removeItem('tulum_unido_banner_channels_v2');
    localStorage.removeItem('tulum_unido_banner_settings_v2');
    showToast(lang === 'es' ? 'Restablecido al directorio oficial' : 'Reset to official directory defaults');
  };

  const handleUploadLogo = (dataUrl: string) => {
    const updatedSettings = { ...settings, customLogoUrl: dataUrl };
    setSettings(updatedSettings);
    localStorage.setItem('tulum_unido_banner_settings_v2', JSON.stringify(updatedSettings));
    showToast(lang === 'es' ? '¡Logo oficial actualizado!' : 'Official logo updated!');
  };

  const handleResetLogo = () => {
    const updatedSettings = { ...settings, customLogoUrl: undefined };
    setSettings(updatedSettings);
    localStorage.setItem('tulum_unido_banner_settings_v2', JSON.stringify(updatedSettings));
    showToast(lang === 'es' ? 'Logo restablecido' : 'Logo reset to default');
  };

  // Click on WhatsApp group
  const handleJoinWhatsApp = (channel: WhatsAppChannel, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.8 },
        colors: [channel.iconBgColor || '#0c2d48', '#25D366', '#ffffff'],
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
          <TulumUnidoLogo variant="emblem" className="w-7 h-7" customLogoUrl={settings.customLogoUrl} />
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
            <TulumUnidoLogo
              variant="banner-header"
              customLogoUrl={settings.customLogoUrl}
              onUploadLogo={handleUploadLogo}
              onResetLogo={handleResetLogo}
            />
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

          {/* Footer Section with Social Media & Links */}
          <div className="relative mt-auto pt-2 pb-6 px-6 text-center">

            {/* Social Links: Instagram & Facebook */}
            <div className="flex flex-col items-center mt-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#032b4b]/80 mb-2.5">
                {lang === 'es' ? 'Nuestras Redes Sociales' : 'Follow Our Social Media'}
              </span>

              <div className="flex items-center justify-center gap-3 w-full max-w-xs">
                {/* Instagram Button */}
                <a
                  href={settings.instagramUrl || 'https://instagram.com/tulumunido'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[46px] flex items-center justify-center gap-2.5 px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98] group"
                >
                  {/* Official Instagram Gradient Logo */}
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center p-1 text-white shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 leading-none">Instagram</span>
                    <span className="text-[10px] text-slate-400 font-medium">@tulumunido</span>
                  </div>
                </a>

                {/* Facebook Button */}
                <a
                  href={settings.facebookUrl || 'https://facebook.com/tulumunido'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[46px] flex items-center justify-center gap-2.5 px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98] group"
                >
                  {/* Official Facebook Blue Logo */}
                  <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 translate-y-0.5">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 leading-none">Facebook</span>
                    <span className="text-[10px] text-slate-400 font-medium">Tulum Unido</span>
                  </div>
                </a>
              </div>
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
