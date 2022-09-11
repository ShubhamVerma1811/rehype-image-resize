import { visit } from 'unist-util-visit'

/**
 *
 * @param {import('.').Options} options
 */
export default function resizeImage({ transformer }) {
  return (tree) => {
    visit(tree, (node) => {
      if (node.tagName === 'img') {
        try {
          const res = transformer({
            src: node.properties.src,
            alt: node.properties.alt
          })

          if (res?.width) node.properties.width = res.width
          if (res?.height) node.properties.height = res.height
          if (res?.alt) node.properties.alt = res.alt
        } catch (e) {
          throw new Error(`rehype-image-resize Error: ${e}`)
        }
      }
    })
  }
}
