import React from 'react';
import { 
  Shield, 
  Users, 
  MessageCircle, 
  Settings, 
  Globe, 
  Recycle, 
  ChevronRight, 
  Info 
} from 'lucide-react';
import { WhatsAppChannel } from '../types';

interface ChannelCardProps {
  channel: WhatsAppChannel;
  onOpenDetails: (channel: WhatsAppChannel) => void;
  onJoinWhatsApp: (channel: WhatsAppChannel, e: React.MouseEvent) => void;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({
  channel,
  onOpenDetails,
  onJoinWhatsApp,
}) => {
  const getIcon = () => {
    switch (channel.icon) {
      case 'MessageCircle':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            <circle cx="9" cy="12" r="0.9" fill="currentColor"/>
            <circle cx="12" cy="12" r="0.9" fill="currentColor"/>
            <circle cx="15" cy="12" r="0.9" fill="currentColor"/>
          </svg>
        );
      case 'Shield':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        );
      case 'Users':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        );
      case 'Globe':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        );
      case 'Recycle':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
            <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
            <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
            <path d="m14 16 3 3 3-3"/>
            <path d="M8.294 4.5h7.412a1.83 1.83 0 0 1 1.57.881 1.785 1.785 0 0 1 .004 1.784L13.5 13.5"/>
            <path d="m10 8-3-3.5L10 1"/>
            <path d="m3 14 1.5 3 3-1.5"/>
          </svg>
        );
      case 'Settings':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        );
      default:
        return <MessageCircle className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="w-full transition-transform active:scale-[0.985]">
      {/* Pill shaped button styled after the newly uploaded image */}
      <div
        onClick={(e) => onJoinWhatsApp(channel, e)}
        style={{ 
          backgroundColor: channel.pillBgColor || '#f8fafc',
          borderColor: channel.borderColor || '#e2e8f0',
        }}
        className="w-full rounded-full py-2.5 px-3 sm:px-4 flex items-center justify-between shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group border select-none relative"
      >
        {/* Left: Round icon badge with solid color */}
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2">
          <div
            style={{ backgroundColor: channel.iconBgColor }}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-white ring-1 ring-black/5 group-hover:scale-105 transition-transform"
          >
            {getIcon()}
          </div>

          {/* Group Title in bold Navy matching the image */}
          <div className="flex flex-col min-w-0 text-left">
            <h3 className="font-extrabold text-sm sm:text-[15px] tracking-wide text-[#0c2d48] leading-tight font-['Cabinet_Grotesk',sans-serif] uppercase truncate">
              {channel.title}
            </h3>
            <span className="text-[10.5px] sm:text-[11px] text-slate-500 font-medium leading-none mt-0.5 truncate">
              {channel.subtitle}
            </span>
          </div>
        </div>

        {/* Right side: Chevron > in dark navy & Info trigger */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Rules/Info toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(channel);
            }}
            className="w-7 h-7 rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 flex items-center justify-center transition-colors"
            title="Normas y detalles"
            aria-label="Ver detalles"
          >
            <Info className="w-3.5 h-3.5" />
          </button>

          {/* Chevron Right matching the image */}
          <div className="w-7 h-7 flex items-center justify-center text-[#0c2d48] group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
};
