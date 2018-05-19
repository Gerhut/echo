/**
 * @author iwillwen (Chaoyang Gan)
 * @email willwengunn@gmail.com
 * @create date 2018-05-19 04:56:30
 * @modify date 2018-05-19 04:56:30
 * @desc
 *   This is a web app bulit for celebrating the May 20th (Which means 'I Love You' in Chinese) with my girl friend. ;P
 *   It was inspired by the message effect named *echo* in iMessage.
 *   This is not a business project. So dont waste too much bandwidth of my now.sh account. thanks.
 * 
 *   Just make your fun.
*/

// Constants
const screenSize = {
  width: document.body.offsetWidth,
  height: document.body.offsetHeight
}
const fontSizePixel = 16

// Messages to Fire!
const defaultMessage = '老婆最可爱！😘'
let messages = [ defaultMessage ]

/**
  You can change the messages to show, just concat them with hash symbol(#) and
  put the uri-ecnoded (like using encodeURIComponent) string into the hash of the url.
  Just like https://echo.example.com/#MessageOne#MessageTwo#MessageThree.
  Because the unicode are supported, so emoji is good.

  Maybe there is a good idea that showing 'I Love You' in some different languages. hmm
*/
if (window.location.hash.length > 0) {
  messages = decodeURIComponent(window.location.hash.substr(1)).split('#')
}

// The first message to show
const staticMessage = messages[0]
const staticMsg = {
  good: true,
  classes: [ 'msg', 'brighten' ],
  message: staticMessage,
  style: {
    left: Math.ceil((screenSize.width / 2) - ((staticMessage.length + 1 /*padding*/) * fontSizePixel / 2)) + 'px',
    top: Math.ceil(((screenSize.height / 2) - (fontSizePixel + 0.6 /*padding*/ / 2)) * (1 - ((0.618 - 0.5) * 2))) + 'px'
  }
}

document.title = staticMessage

new Vue({
  el: '#echo',

  data: {
    messages,
    msgs: [ staticMsg ]
  },

  methods: {
    fire() {
      if (staticMsg.classes.length > 1) staticMsg.classes.splice(1)

      requestAnimationFrame(this.newMsg)
    },

    randomMsg() {
      const index = Math.round(Math.random() * (this.messages.length - 1))
      return this.messages[index]
    },

    newMsg() {
      // Random message with random position and random size
      const left = Math.ceil(Math.random() * 0.9 * screenSize.width) + 'px'
      const top = Math.ceil(Math.random() * 0.9 * screenSize.height) + 'px'
      const scale = 1 + Math.random()

      const msg = {
        good: true,
        classes: [ 'msg', 'hide' ],
        style: {
          top, left,
          transform: `scale(${scale})`
        },
        message: this.randomMsg()
      }

      // Append the message element
      this.msgs.push(msg)
      // Fire!
      setTimeout(() => msg.classes.splice(1), 100)

      setTimeout(() => {
        msg.classes.push('hide')

        // Wait for the hidding animation complete
        setTimeout(() => msg.good = false, 500)

        // Clear the array for garbage collecting
        setTimeout(() => {
          if (this.msgs.length <= 1) return

          const hasMsgs = this.msgs.slice(1)
            .map(({ good }) => good)
            .reduce((left, right) => left || right)

          if (!hasMsgs) this.msgs.splice(1)
        }, 2000)
      }, 5000)
    }
  }
})

/**
 * Of course, this is just a tiny thing only costed 30 mins and 100+ lines of code.
 * If you are really want to make your women happy. I think a GUCCI is the perfect choice.
 */