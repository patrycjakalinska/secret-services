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

  //TODO:
  // create vidget for showing services:w

  const handleServices = () => {
    const botMessage = createChatBotMessage('Here are our avaiable services:', {
      widget: 'services',
    })

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handlePrice = () => {
    const botMessage = createChatBotMessage(
      'Our pricing varies depending on the specific service you require. Please visit our website or contact us for a customized quote.'
    )

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleSurveillanceServiceInfo = () => {
    const botMessage = createChatBotMessage(
      "Our 'Surveillance' service provides discreet and professional monitoring, offering tailored solutions to meet your specific needs. Our expert team uses advanced technology to deliver comprehensive reports and crucial information, ensuring your peace of mind. Whether it's for business, personal, or legal purposes, trust us to secure your interests."
    )

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleCheckServiceInfo = () => {
    const botMessage = createChatBotMessage(
      "Our 'Background Check' service offers comprehensive investigations for individuals and entities, providing crucial information for informed decision-making in personal, professional, or partnership matters. Trust us to reveal the facts you need."
    )

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleMissingPersonServiceInfo = () => {
    const botMessage = createChatBotMessage(
      "Our 'Missing Person' service is dedicated to locating and reuniting individuals with their loved ones. With our experienced team and extensive resources, we are committed to resolving cases with care and professionalism, offering hope and closure to those searching for answers."
    )

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleLocation = () => {
    const botMessage = createChatBotMessage(
      'We work remote to bring you most private investigation. You cannot meet your detective.'
    )

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
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
            handleLocation,
            handleServices,
            handleSurveillanceServiceInfo,
            handleCheckServiceInfo,
            handleMissingPersonServiceInfo,
            handlePrice,
            handleContactInformation,
          },
        })
      })}
    </div>
  )
}

export default ActionProvider
