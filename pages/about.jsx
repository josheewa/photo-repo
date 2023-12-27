
import React from 'react'
import Head from "next/head";

const About = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {/* <h1>About me</h1> */}
        <p>
          ⨯ TypeError: Cannot read properties of undefined (reading 'toggle') at
          Navbar (webpack-internal:///./components/Navigation/navbar.jsx:39:48)
          at renderWithHooks
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:5658:16)
          at renderIndeterminateComponent
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:5731:15)
          at renderElement
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:5946:7)
          at renderNodeDestructiveImpl
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:6104:11)
          at renderNodeDestructive
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:6076:14)
          at renderNode
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:6259:12)
          at renderChildrenArray
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:6211:7)
          at renderNodeDestructiveImpl
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:6141:7)
          at renderNodeDestructive
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:6076:14)
          at renderElement
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:5971:9)
          at renderNodeDestructiveImpl
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:6104:11)
          at renderNodeDestructive
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:6076:14)
          at renderIndeterminateComponent
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:5785:7)
          at renderElement
          (/Users/josheewa/Development/web/photo-repo/node_modules/react-dom/cjs/react-dom-server.browser.development.js:5946:7)
        </p>
      </main>
    </>
  )
}

export default About;