import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Karen Schenck — Psychopraticienne',
    short_name: 'Karen Schenck',
    description: 'Psychopraticienne à Antibes. Approche intégrative — TCC, Gestalt-thérapie, thérapie des schémas et psychologie jungienne.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F3EC',
    theme_color: '#F7F3EC',
    icons: [
      {
        src: '/icon-light-32x32.svg',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
    ],
  };
}
