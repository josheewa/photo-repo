export const menuItemsData = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Gallery', //▲ ▼
    url: '',
    submenu: [
      {
        title: 'All',
        url: '/tags/all',
      },
      {
        title: 'Landscape',
        url: 'city',
        url: '/tags/landscape',
      },
      {
        title: 'City',
        url: '/tags/city',
      },
      {
        title: 'Flowers',
        url: '/tags/flowers',
      },
      {
        title: 'Astro',
        url: '/tags/astro',
      },
    ],
  },
  {
    title: 'Favorites',
    url: 'favorites',
  },
  {
    title: 'Contact',
    url: '',
    submenu: [
      {
        title: 'Instagram',
        url: 'https://www.instagram.com/jooshtography/',
        target: '_blank',
        icon: '/instagram.png',
      },
      {
        title: 'E-mail',
        // url: 'mailto:jooshtography@gmail.com',
        url: '/email',
        // target: '_blank',
        icon: '/gmail.png',
      },
      {
        title: 'Github',
        url: 'https://github.com/josheewa',
        target: '_blank',
        icon: '/github.png',
      },
    ],
  },
]
