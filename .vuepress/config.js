import { webpackBundler } from '@vuepress/bundler-webpack'
import { defineUserConfig } from 'vuepress'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import { defaultTheme } from '@vuepress/theme-default'
import { description } from '../package.json'

import path from "path"

const base = "/";

export default defineUserConfig ({
  bundler: webpackBundler({
    configureWebpack: (config) => {
      config.devtool = 'source-map';
      config.optimization = {
        usedExports: true,
        minimize: true
      }
      config.performance = {
        maxAssetSize: 400000,
        maxEntrypointSize: 400000
      }
    },
  }),
  title: 'MrChromebox.tech',
  description: description,
  base,
  head: [
    ['meta', { name: 'theme-color', content: '#6a4aec' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { rel: 'icon', href: base + 'favicon.ico', sizes: '16x16 32x32 48x48 64x64', type: 'image/vnd.microsoft.icon' }],
  ],
  theme: defaultTheme({
    logo: '/favicon.ico',
    accentColor: '#6a4aec',
    nextLinks: false,
    prevLinks: false,
    editLink: false,
    contributors: false,
    navbar: [
      {
        text: 'Donate via Paypal',
        link: 'https://www.paypal.com/donate/?hosted_button_id=VS8JKCK492NHW',
      },
      {
        text: 'Give via Patreon',
        link: 'https://patreon.com/user?u=117343117',
      },
      {
        text: 'Get Help on the Forums',
        link: 'https://forum.chrultrabook.com/'
      },
      {
        text: 'Github Repos',
        link: 'https://github.com/MrChromebox/'
      }
    ],
    sidebarDepth: 0,
    sidebar: [
      {
        text: 'News & Updates',
        link: '/docs/news',
      },
      {
        text: 'Getting Started',
        link: '/docs/getting-started',
      },
      {
        text: 'FAQ',
        link: '/docs/faq',
      },
      {
        text: 'Known Issues',
        link: '/docs/known-issues',
      },
      {
        text: 'Glossary',
        link: '/docs/glossary',
      },
      {
        text: 'Supported Devices',
        link: '/docs/supported-devices',
      },
      {
        text: 'Firmware Utility Script',
        link: '/docs/fwscript',
      },
      {
        text: 'ChromeOS Boot Modes',
        link: '/docs/boot-modes/',
        collapsible: true,
        children: [
          {
            text: 'Normal Mode',
            link: '/docs/boot-modes/normal',                
          },
          {
            text: 'Recovery Mode',
            link: '/docs/boot-modes/recovery',                
          },
          {
            text: 'Developer Mode',
            link: '/docs/boot-modes/developer',                
          },
          {
            text: 'Legacy Boot Mode (aka AltFw)',
            link: '/docs/boot-modes/legacy',                
          },
        ]
      },
      {
        text: 'Firmware 101',
        link: '/docs/firmware/',
        collapsible: true,
        children: [
          {
            text: 'Firmware Types',
            link: '/docs/firmware/types',
          },
          {
            text: 'Firmware Write Protect',
            link: '/docs/firmware/wp/',
            collapsible: false,
            children: [
              {
                text: 'Disabling FW WP',
                link: '/docs/firmware/wp/disabling',
              }
            ]
          },
          {
            text: 'Flashing Firmware',
            link: '/docs/firmware/flashing-firmware'
          },
          {
            text: 'Updating Firmware',
            link: '/docs/firmware/updating-firmware'
          },
          {
            text: 'Flashing Manually',
            link: '/docs/firmware/manual-flashing',
          },
          {
            text: 'Booting Your OS',
            link: '/docs/firmware/booting'
          },
        ]
      },
      {
        text: 'Reverting to ChromeOS',
        link: '/docs/reverting/',
        collapsible: true,
        children: [
          {
            text: 'Flashing Stock Firmware',
            link: '/docs/reverting/flashing-stock',
          },
          {
            text: 'ChromeOS Recovery USB',
            link: '/docs/reverting/recovery-usb',
          }
        ]
      },
      {
        text: 'Help and Support',
        link: '/docs/support/',
        collapsible: true,
        children: [
          {
            text: 'Making a Bootable USB',
            link: '/docs/support/bootableusb',
          },
          {
            text: 'Debugging / Getting Help',
            link: '/docs/support/debugging',
          },
          {
            text: 'Compiling Your Own Firmware',
            link: '/docs/support/compiling',
          },
          {
            text: 'Unbricking',
            link: '/docs/support/unbricking/',
            collapsible: false,
            children: [
              {
                text: 'With a ch341a USB Programmer',
                link: '/docs/support/unbricking/unbrick-ch341a',
              },
              {
                text: 'With a Suzy-Q Cable',
                link: '/docs/support/unbricking/unbrick-suzyq',
              },
            ]
          }
        ]
      },
      {
        text: 'Documentation Sitemap',
        link: '/docs/sitemap',
      },
      {
        text: 'Contributing',
        link: '/docs/contributing',
      },
    ]
  }),
  plugins: [
    searchPlugin({
      maxSuggestions: 12,
      isSearchable: (page) => page.path !== '/',
      getExtraFields: (page) => {
        const tags = page.frontmatter.tags ?? [];
        const title = page.title ?? '';
        return [...tags, title];
      },
      hotKeys: ['s', '/', { key: 'f', ctrl: true }],
      locales: {
        '/': {
          placeholder: 'Search',
        }
      }
    }),
    registerComponentsPlugin({
      components: {
        AddScript: path.resolve(__dirname, './components/AddScript.vue'),
      },
    })
  ]
})
