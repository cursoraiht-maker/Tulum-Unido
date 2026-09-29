export type ChannelCategory = 
  | 'todos'
  | 'vigilancia'
  | 'brigadas'
  | 'chat_general'
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
  color: string;
  textColor?: string;
  icon: 'Shield' | 'Users' | 'MessageCircle' | 'Settings';
  whatsappInviteUrl: string;
  membersCount?: number;
  badge?: string;
  rules: string[];
  coordinator?: string;
}

export interface CommunitySettings {
  communityName: string;
  sloganTop: string;
  sloganBottom: string;
  callToAction: string;
  mainCommunityWhatsappUrl: string;
  contactAdminWhatsapp: string;
  emergencyPhone: string;
}
