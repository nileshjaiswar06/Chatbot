import { TypeAnimation } from "react-type-animation"

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        'Chat with Your own AI',
        1000,
        'Built with OpenAI API',
        1500,
        'Your own Customized ChatGPT',
        1500,
      ]}
      speed={50}
      style={{ fontSize: '60px', color: "white", display: "inline-block", textShadow: "1px 1px 20px #000"}}
      repeat={Infinity}
    />
  )
}

export default TypingAnim