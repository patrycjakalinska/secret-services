import React from 'react'

const workingHoursPrompts = [
  'open',
  'working hours',
  'working time',
  'day you work',
]

const contactPrompts = [
  'contact',
  'email',
  'phone',
  'number',
  'call',
  'send',
  'get in touch',
  'reach out',
]

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lowerCaseMessage = message.toLowerCase()

    if (lowerCaseMessage.includes('hello')) {
      actions.handleHello()
    } else if (
      workingHoursPrompts.some((prompt) => lowerCaseMessage.includes(prompt))
    ) {
      actions.handleWorkingHours()
    } else if (
      contactPrompts.some((prompt) => lowerCaseMessage.includes(prompt))
    ) {
      actions.handleContactInformation()
    } else {
      actions.handleUnrecognizedMessage()
    }
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        })
      })}
    </div>
  )
}

export default MessageParser
