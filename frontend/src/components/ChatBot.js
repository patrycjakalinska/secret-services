import React, { useEffect, useState } from 'react'
import Chatbot from 'react-chatbot-kit'
import { Tooltip, Box, Button, Typography, Paper, Avatar } from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import CloseIcon from '@mui/icons-material/Close'
import config from '../utils/config'
import ActionProvider from '../utils/ActionProvider'
import MessageParser from '../utils/MessageParser'

const ChatBot = ({ user }) => {
  const [showBot, toggleBot] = useState(false)

  return (
    <Paper id="chatbotContainer" elevation={10}>
      {showBot ? (
        <Chatbot
          config={Object.keys(user).length !== 0 ? config(user.profilePicture.url) : config('')}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
          headerText={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingX: '1rem',
                width: '100%',
              }}
            >
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                Ask chatbot{' '}
              </Typography>
              <Button onClick={() => toggleBot((prev) => !prev)}>
                <CloseIcon sx={{ color: '#313131' }} />
              </Button>
            </Box>
          }
          placeholderText={'Type something...'}
          close="true"
        />
      ) : (
        <Button
          className="app-chatbot-button"
          sx={{ marginX: '1rem' }}
          onClick={() => toggleBot((prev) => !prev)}
        >
          <Tooltip className="app-chatbox" title="Chat with Sarsa.">
            <div>
              <SmartToyIcon sx={{ color: '#313131' }} />
            </div>
          </Tooltip>
        </Button>
      )}
    </Paper>
  )
}

export default ChatBot
