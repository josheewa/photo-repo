export const menuItemsData = [
    {
      title: 'Gallery', //▲ ▼
      url: '',
      submenu: [
        {
          title: 'All',
          url: '/',
        },
        {
          title: 'Landscape',
          url: 'landscape',
        },
        {
          title: 'City',
          url: 'city',
        },
        {
          title: 'Flowers',
          url: 'flowers',
        },
        {
          title: 'Astro',
          url: 'astro',
        },
      ],
    },
    {
      title: 'Favorites',
      url: 'favorites',
    },
    {
      title: 'Bio',
      url: 'bio',
    },
    {
      title: 'Contact',
      url: '',
      submenu: [
        {
          title: 'Instagram',
          url: 'https://www.instagram.com/jooshtography/',
          target: '_blank',
          icon: '/instagram.png'
        },
        {
          title: 'E-mail',
          // url: 'mailto:jooshtography@gmail.com',
          url: 'email',
          // target: '_blank',
          icon: '/gmail.png'
        },
        {
          title: 'Github',
          url: 'https://github.com/josheewa',
          target: '_blank',
          icon: '/github.png'
        }
      ]
    }
  ];