// in ActionProvider.jsx
import React from 'react'

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleUnrecognizedMessage = () => {
    const botMessage = createChatBotMessage(
      "I don't understand. Could you paraphrase that question?"
    )
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.')

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleWorkingHours = () => {
    const botMessage = createChatBotMessage(
      'Our working hours are Monday to Friday, from 8 AM to 8 PM.'
    )

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleContactInformation = () => {
    const botMessage = createChatBotMessage(
      'You can contact us at mrDetective@secret.com or call us at +48 881234233.',
      {
        delay: 1000,
      }
    )
    const botMessage2 = createChatBotMessage(
      'But if you already use our service there is a hotline avaible at 33003-00. All you need is your case unique number.',
      { withAvatar: false, delay: 1000 }
    )

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage, botMessage2],
    }))
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleUnrecognizedMessage,
            handleHello,
            handleWorkingHours,
            handleContactInformation,
          },
        })
      })}
    </div>
  )
}

export default ActionProvider
