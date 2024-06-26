import {themes as prismThemes} from 'prism-react-renderer';
import search from "@cmfcmf/docusaurus-search-local";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nodestream',
  tagline: 'Work With Graphs Declaratively',
  favicon: 'img/favicon.ico',

  url: 'https://nodestream-proj.github.io',
  baseUrl: '/docs',
  organizationName: 'nodestream-proj',
  projectName: 'docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: true,

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/nodesteram-proj/docs/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/nodesteram-proj/docs/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-903SETWVRF',
          anonymizeIP: true,
        },
      })
    ],
  ],

  plugins: [search],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Nodestream',
        logo: {
          alt: 'Nodestream Logo',
          src: 'img/nodestream.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/nodestream-proj/nodestream',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github Discussions',
                href: 'https://github.com/orgs/nodestream-proj/discussions',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/nodestream-proj/nodestream',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nodestream Project.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      // announcementBar: {
      //   id: 'in_progress',
      //   content: "This documentation is a work in progress and not meant for public consumption.",
      //   backgroundColor: '#20232a',
      //   textColor: '#fff',
      //   isCloseable: false,
      // },
    }),
};

export default config;
