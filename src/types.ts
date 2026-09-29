export type ChannelCategory = 
  | 'todos'
  | 'chat_general'
  | 'vigilancia'
  | 'voluntarios'
  | 'tulum_united'
  | 'economia_circular'
  | 'comisiones';

export interface WhatsAppChannel {
  id: string;
  title: string;
  subtitle: string;
  description: {
    es: string;
    en: string;
  };
  category: ChannelCategory;
  iconBgColor: string;
  pillBgColor: string;
  borderColor: string;
  icon: 'MessageCircle' | 'Shield' | 'Users' | 'Globe' | 'Recycle' | 'Settings';
  whatsappInviteUrl: string;
  membersCount?: number;
  badge?: string;
  rules: string[];
  coordinator?: string;
}

export interface CommunitySettings {
  communityName: string;
  sloganTop: string;
  callToAction: string;
  mainCommunityWhatsappUrl: string;
  contactAdminWhatsapp: string;
  emergencyPhone: string;
  instagramUrl?: string;
  facebookUrl?: string;
  customLogoUrl?: string;
}
