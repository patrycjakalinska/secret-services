import { createChatBotMessage } from 'react-chatbot-kit'
import { Avatar } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment'
import ServiceWidget from '../components/ServiceWidget'

const config = (userUrl) => {
  return {
    initialMessages: [createChatBotMessage(`Hello, how can I help you?`)],
    widgets: [
      {
        widgetName: 'services',
        widgetFunc: () => <ServiceWidget />,
      },
    ],
    customStyles: {
      botMessageBox: {
        backgroundColor: '#EC6D62',
      },
      chatButton: {
        backgroundColor: '#313131',
      },
    },
    customComponents: {
      botAvatar: () => (
        <Avatar src="https://res.cloudinary.com/ddw3shtfu/image/upload/v1698180852/detectiveApp/misc/gtcmtlk4qtn4ka9klfzz.jpg" />
      ),
      userAvatar: () => <Avatar src={userUrl} />,
    },
  }
}

export default config
