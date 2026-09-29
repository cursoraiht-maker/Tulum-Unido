import { WhatsAppChannel, CommunitySettings } from '../types';

export const INITIAL_SETTINGS: CommunitySettings = {
  communityName: 'Tulum Unido',
  sloganTop: 'COMUNIDAD · ACCIÓN · UN MEJOR TULUM',
  sloganBottom: 'GENTE DE AQUÍ HACIENDO UN MEJOR TULUM',
  callToAction: 'ÚNETE Y ELIGE EL GRUPO QUE TE INTERESA',
  mainCommunityWhatsappUrl: 'https://chat.whatsapp.com/invite/tulum-unido-central',
  contactAdminWhatsapp: '+529841234567',
  emergencyPhone: '911',
};

export const INITIAL_CHANNELS: WhatsAppChannel[] = [
  {
    id: 'vigilancia-ciudadana',
    title: 'VIGILANCIA CIUDADANA',
    subtitle: 'Seguridad vecinal y auxilio inmediato',
    description: {
      es: 'Red vecinal activa de alerta rápida, seguridad ciudadana, auxilio comunitario y reportes viales en Tulum.',
      en: 'Active neighborhood safety watch, immediate roadside assistance, and security coordination for Tulum.',
    },
    category: 'vigilancia',
    icon: 'Shield',
    color: '#0a4d3c', // Dark forest green from the banner
    whatsappInviteUrl: 'https://chat.whatsapp.com/invite/tulum-vigilancia',
    membersCount: 890,
    badge: 'Prioridad & Seguridad',
    coordinator: 'Comité de Seguridad Vecinal',
    rules: [
      'Exclusivo para reportes de seguridad reales, auxilio vial y emergencias.',
      'Prohibido el spam, publicidad o discusiones políticas.',
      'Comparte ubicación o referencias exactas al reportar.',
    ],
  },
  {
    id: 'brigadas',
    title: 'BRIGADAS',
    subtitle: 'Acción comunitaria, limpieza y rescate',
    description: {
      es: 'Voluntariado para limpieza de playas, cenotes, reforestación, rescate animal, bacheo y brigadas de apoyo solidario.',
      en: 'Hands-on community volunteering, beach and cenote cleanups, reforestation, animal welfare, and neighborhood action.',
    },
    category: 'brigadas',
    icon: 'Users',
    color: '#008fa2', // Turquoise cyan from the banner
    whatsappInviteUrl: 'https://chat.whatsapp.com/invite/tulum-brigadas',
    membersCount: 640,
    badge: 'Voluntariado Activo',
    coordinator: 'Coordinación de Brigadas',
    rules: [
      'Coordinación de actividades y brigadas presenciales sin fines de lucro.',
      'Confirmar asistencia y traer equipo de protección o hidratación cuando aplique.',
      'Mantener comunicación enfocada en el operativo del día.',
    ],
  },
  {
    id: 'chat-general',
    title: 'CHAT GENERAL',
    subtitle: 'Espacio de convivencia y diálogo vecinal',
    description: {
      es: 'Punto de encuentro para vecinos, avisos comunitarios, recomendaciones locales, dudas generales y convivencia sana.',
      en: 'Open town square for neighbors, verified community announcements, local tips, general queries, and neighborly chat.',
    },
    category: 'chat_general',
    icon: 'MessageCircle',
    color: '#df981c', // Golden yellow from the banner
    whatsappInviteUrl: 'https://chat.whatsapp.com/invite/tulum-chat-general',
    membersCount: 1250,
    badge: 'Comunidad Abierta',
    coordinator: 'Equipo Moderador',
    rules: [
      'Trato cordial y respetuoso en todo momento.',
      'No saturar con cadenas, memes ofensivos ni autopromoción masiva.',
      'Para temas de seguridad urgente, usar el canal de Vigilancia Ciudadana.',
    ],
  },
  {
    id: 'comisiones-de-trabajo',
    title: 'COMISIONES DE TRABAJO',
    subtitle: 'Proyectos, gestión ciudadana y soluciones',
    description: {
      es: 'Mesas técnicas y grupos de trabajo organizados para servicios públicos, movilidad, medio ambiente, cultura y gestiones.',
      en: 'Working committees, civic initiatives, and organized workgroups for public infrastructure, mobility, eco-policy, and civic solutions.',
    },
    category: 'comisiones',
    icon: 'Settings',
    color: '#2e8b44', // Mid leaf green from the banner
    whatsappInviteUrl: 'https://chat.whatsapp.com/invite/tulum-comisiones',
    membersCount: 480,
    badge: 'Proyectos & Ciudadanía',
    coordinator: 'Mesa Técnica Ciudadana',
    rules: [
      'Participación propositiva orientada a proyectos y seguimiento ciudadano.',
      'Aportar ideas constructivas y compromisos de seguimiento.',
      'Respetar las agendas de trabajo acordadas por la comisión.',
    ],
  },
];
