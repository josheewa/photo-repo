export const menuItemsData = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Gallery',
    url: '',
    submenu: [
      {
        title: 'Browse All',
        url: '/tags/all',
      },
      {
        title: 'Flowers',
        url: '/tags/flowers',
      },
      {
        title: 'Sunset',
        url: '/tags/sunset',
      },
      {
        title: 'City',
        url: '/tags/city',
      },
      {
        title: 'Astro',
        url: '/tags/astro',
      },
      {
        title: 'Favorites',
        url: '/tags/favorites',
      },
    ],
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
        url: '/email',
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
