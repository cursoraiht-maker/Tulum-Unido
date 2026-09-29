import React from 'react';
import { 
  Shield, 
  Users, 
  MessageCircle, 
  Settings, 
  ChevronRight, 
  Info,
  ExternalLink 
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
      case 'Shield':
        return <Shield className="w-6 h-6 text-white stroke-[2.2]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-white stroke-[2.2]" />;
      case 'MessageCircle':
        return <MessageCircle className="w-6 h-6 text-white stroke-[2.2]" />;
      case 'Settings':
        return <Settings className="w-6 h-6 text-white stroke-[2.2]" />;
      default:
        return <MessageCircle className="w-6 h-6 text-white stroke-[2.2]" />;
    }
  };

  return (
    <div className="w-full transition-transform active:scale-[0.98]">
      {/* Pill shaped button modeled precisely from the feather banner */}
      <div
        onClick={(e) => onJoinWhatsApp(channel, e)}
        style={{ backgroundColor: channel.color }}
        className="w-full rounded-full py-3.5 px-4 sm:px-5 flex items-center justify-between shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group text-white border border-white/20 select-none relative overflow-hidden"
      >
        {/* Subtle ambient light gradient highlight inside pill */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

        {/* Left: Icon in circle matching the banner */}
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 z-10">
          <div className="w-12 h-12 rounded-full border-2 border-white/90 bg-white/10 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
            {getIcon()}
          </div>

          {/* Group Name in bold capital letters matching the banner typography */}
          <div className="flex flex-col min-w-0 text-left">
            <h3 className="font-black text-base sm:text-lg tracking-wider text-white leading-tight font-['Cabinet_Grotesk',sans-serif] uppercase truncate">
              {channel.title}
            </h3>
            <span className="text-[11px] sm:text-xs text-white/85 font-medium leading-none mt-1 truncate">
              {channel.subtitle}
            </span>
          </div>
        </div>

        {/* Right side: Action icon & Info button */}
        <div className="flex items-center gap-1.5 z-10 flex-shrink-0 ml-2">
          {/* Info trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(channel);
            }}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            title="Ver normas y detalles"
            aria-label="Ver detalles"
          >
            <Info className="w-4 h-4 text-white" />
          </button>

          {/* WhatsApp Direct Arrow */}
          <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold shadow-sm group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-5 h-5 text-emerald-800 stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
};
