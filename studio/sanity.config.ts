import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Luneva',
  projectId: 'xzn8ycoc',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.documentTypeListItem('homePage').title('Home Page'),
                    S.documentTypeListItem('about').title('About Us'),
                    S.documentTypeListItem('faq').title('FAQ'),
                  ])
              ),
            S.listItem()
              .title('Components')
              .child(
                S.list()
                  .title('Components')
                  .items([
                    S.documentTypeListItem('hero').title('Hero Sections'),
                    S.documentTypeListItem('videoBanner').title('Video Banners'),
                    S.documentTypeListItem('textWithParagraph').title('Text with Paragraphs'),
                    S.documentTypeListItem('bentoGrid').title('Bento Grids'),
                  ])
              ),
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .child(
                        S.document()
                          .schemaType('settings')
                          .documentId('settings')
                      ),
                    S.listItem()
                      .title('Header')
                      .child(
                        S.document()
                          .schemaType('header')
                          .documentId('header')
                      ),
                    S.listItem()
                      .title('Footer')
                      .child(
                        S.document()
                          .schemaType('footer')
                          .documentId('footer')
                      ),
                  ])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                ![
                  'homePage',
                  'about',
                  'faq',
                  'hero',
                  'videoBanner',
                  'textWithParagraph',
                  'header',
                  'footer',
                  'link',
                  'settings',
                ].includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
