import { WhatsAppChannel, CommunitySettings } from '../types';

export const INITIAL_SETTINGS: CommunitySettings = {
  communityName: 'Tulum Unido',
  sloganTop: 'JUNTOS POR UN MEJOR TULUM',
  callToAction: 'ÚNETE Y ELIGE EL GRUPO QUE TE INTERESA',
  mainCommunityWhatsappUrl: 'https://chat.whatsapp.com/invite/tulum-unido-central',
  contactAdminWhatsapp: '+529841234567',
  emergencyPhone: '911',
  instagramUrl: 'https://instagram.com/tulumunido',
  facebookUrl: 'https://facebook.com/tulumunido',
};

export const INITIAL_CHANNELS: WhatsAppChannel[] = [
  {
    id: 'chat-general',
    title: 'CHAT GENERAL',
    subtitle: 'Comunidad, diálogo vecinal y avisos',
    description: {
      es: 'Punto de encuentro para vecinos de Tulum, dudas generales, avisos comunitarios verificados y diálogo constructivo.',
      en: 'Community town square for Tulum neighbors, local questions, general announcements, and helpful dialogue.',
    },
    category: 'chat_general',
    icon: 'MessageCircle',
    iconBgColor: '#e8a238', // Golden yellow circle
    pillBgColor: '#fff9ed', // Cream yellow pill
    borderColor: '#fde5be',
    whatsappInviteUrl: 'https://chat.whatsapp.com/invite/tulum-chat-general',
    membersCount: 1420,
    badge: 'Comunidad Abierta',
    coordinator: 'Equipo Moderador',
    rules: [
      'Trato cordial y respetuoso en todo momento.',
      'No spam, cadenas masivas ni temas no relacionados con Tulum.',
      'Reportes de seguridad canalizarlos a Vigilancia Ciudadana.',
    ],
  },
  {
    id: 'vigilancia-ciudadana',
    title: 'VIGILANCIA CIUDADANA',
    subtitle: 'Seguridad vecinal y auxilio inmediato',
    description: {
      es: 'Red vecinal de alerta inmediata, auxilio ciudadano, prevención del delito y reportes de seguridad en Tulum.',
      en: 'Immediate neighborhood alert network, community safety watch, and roadside emergency assistance in Tulum.',
    },
    category: 'vigilancia',
    icon: 'Shield',
    iconBgColor: '#14385c', // Dark navy blue circle
    pillBgColor: '#eef5fc', // Soft ice blue pill
    borderColor: '#d0e3f7',
    whatsappInviteUrl: 'https://chat.whatsapp.com/invite/tulum-vigilancia',
    membersCount: 1180,
    badge: 'Seguridad & Auxilio',
    coordinator: 'Comité de Seguridad Vecinal',
    rules: [
      'Uso exclusivo para situaciones reales de emergencia o reportes de seguridad.',
      'Indicar siempre ubicación clara (calles, colonia o coordenadas).',
      'Prohibido el uso de este canal para ventas o conversaciones casuales.',
    ],
  },
  {
    id: 'voluntarios-brigadas-de-limpieza',
    title: 'VOLUNTARIOS BRIGADAS DE LIMPIEZA',
    subtitle: 'Acción comunitaria, playas, cenotes y manglares',
    description: {
      es: 'Brigadas activas de limpieza de playas públicas, cenotes, retiro de sargazo y conservación de espacios naturales.',
      en: 'Volunteer cleanups for public beaches, cenotes, mangroves, reef protection, and local environmental actions.',
    },
    category: 'voluntarios',
    icon: 'Users',
    iconBgColor: '#1b4d3e', // Deep forest green circle
    pillBgColor: '#edf7f2', // Soft mint green pill
    borderColor: '#cceade',
    whatsappInviteUrl: 'https://chat.whatsapp.com/invite/tulum-brigadas',
    membersCount: 890,
    badge: 'Voluntariado Verde',
    coordinator: 'Coordinación de Brigadas',
    rules: [
      'Organización de brigadas presenciales y voluntarias sin fines de lucro.',
      'Confirmar asistencia a las convocatorias para logística de herramientas y bolsas.',
      'Cuidar flora y fauna silvestre durante las jornadas.',
    ],
  },
  {
    id: 'tulum-united',
    title: 'TULUM UNITED',
    subtitle: 'International & English-speaking community',
    description: {
      es: 'Grupo bilingüe para residentes internacionales, nómadas y amigos de Tulum colaborando activamente con la comunidad local.',
      en: 'Bilingual & English group for international residents, expat neighbors, and nomads connecting with the Tulum local community.',
    },
    category: 'tulum_united',
    icon: 'Globe',
    iconBgColor: '#009aa6', // Vibrant teal circle
    pillBgColor: '#e8f7f8', // Soft cyan pill
    borderColor: '#c6edf0',
    whatsappInviteUrl: 'https://chat.whatsapp.com/invite/tulum-united-intl',
    membersCount: 760,
    badge: 'International / English',
    coordinator: 'Tulum United Liaisons',
    rules: [
      'English & Spanish welcoming environment.',
      'Focus on positive civic integration, culture, local tips, and collaboration.',
      'Zero commercial spam or unauthorized crypto solicitations.',
    ],
  },
  {
    id: 'economia-circular',
    title: 'ECONOMÍA CIRCULAR',
    subtitle: 'Reciclaje, compostaje, trueque y sostenibilidad',
    description: {
      es: 'Iniciativas de reciclaje, reducción de plásticos, compostaje orgánico, trueque solidario y comercio local sostenible.',
      en: 'Circular economy initiatives, waste reduction, organic composting, material repurposing, zero waste, and local barter.',
    },
    category: 'economia_circular',
    icon: 'Recycle',
    iconBgColor: '#2e8540', // Nature green circle
    pillBgColor: '#edf7ed', // Soft light green pill
    borderColor: '#cbebcb',
    whatsappInviteUrl: 'https://chat.whatsapp.com/invite/tulum-economia-circular',
    membersCount: 650,
    badge: 'Sustentabilidad',
    coordinator: 'Comité de Sustentabilidad',
    rules: [
      'Promover prácticas circulares, reúso, reciclaje y donaciones.',
      'Prioridad a trueque e intercambios ecológicos.',
      'Compartir centros de acopio y horarios de recolección selectiva.',
    ],
  },
  {
    id: 'comisiones-de-trabajo',
    title: 'COMISIONES DE TRABAJO',
    subtitle: 'Mesas técnicas, proyectos y gestión ciudadana',
    description: {
      es: 'Equipos ciudadanos organizados para proyectos cívicos, movilidad, agua, infraestructura pública y seguimiento vecinal.',
      en: 'Citizen workgroups and committees organized for infrastructure, mobility, public services, eco-policy, and community action.',
    },
    category: 'comisiones',
    icon: 'Settings',
    iconBgColor: '#007a87', // Deep teal circle
    pillBgColor: '#e7f5f7', // Soft ice cyan pill
    borderColor: '#c5e8ec',
    whatsappInviteUrl: 'https://chat.whatsapp.com/invite/tulum-comisiones',
    membersCount: 520,
    badge: 'Proyectos & Ciudadanía',
    coordinator: 'Mesa Técnica Ciudadana',
    rules: [
      'Participación propositiva y seguimiento constante a los acuerdos.',
      'Respetar las agendas de cada mesa de trabajo.',
      'Documentar avances y compartir minutas con los integrantes.',
    ],
  },
];
