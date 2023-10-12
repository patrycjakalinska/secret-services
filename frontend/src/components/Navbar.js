import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import '../misc/styles.css'

const pages = ['Services', 'Blog', 'About']
const Navbar = ({ user, fullpageApi, handleLogout }) => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    handleLogout()
    navigate('/')
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleMoveToSection = (section) => {
    if (fullpageApi && fullpageApi.current) {
      fullpageApi.current.moveTo(section)
    } else {
      console.log('AAAAAAAAAAAAAAAA' + section)
    }
  }
  console.log(user)

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#F1F0F0',
        zIndex: 1000,
        left: 0,
        top: 0,
        position: 'sticky',
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', display: 'flex' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Inter',
                fontWeight: 700,
                color: '#313131',
              }}
            >
              SEC
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                font: 'Inter',
                fontWeight: 700,
                color: '#EC6D62',
              }}
            >
              RET
            </Typography>
          </Link>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, flex: { xs: 1 } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#313131"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem
                key="home"
                onClick={() => handleMoveToSection('homePage')}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() =>
                    handleMoveToSection(page.toLowerCase() + 'Page')
                  }
                >
                  <Typography textAlign="center" color="#313131">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <div className="Navbar__Items">
            <Link to="/" style={{ textDecoration: 'none', display: 'flex' }}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  mr: 0,
                  fontWeight: 'bold',
                  color: '#EC6D62',
                }}
              >
                SEC
              </Typography>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  mr: 0,
                  fontWeight: 'bold',
                  color: '#313131',
                  textDecoration: 'none',
                }}
              >
                RET
              </Typography>
            </Link>
          </div>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-between',
              marginRight: '1rem',
            }}
          >
            <Button
              key="home"
              onClick={() => handleMoveToSection('page1')}
              sx={{
                color: '#EC6D62',
                my: 2,
                display: 'block',
                textTransform: 'none',
              }}
            >
              {' '}
              Home
            </Button>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleMoveToSection(page.toLowerCase() + 'page')}
                sx={{
                  my: 2,
                  color: '#313131',
                  display: 'block',
                  textTransform: 'none',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {Object.keys(user).length !== 0 ? (
            <Box
              sx={{
                flexGrow: 0,
                padding: '.5em',
                backgroundColor: isUserMenuOpen ? '#FEFDFD' : 'none',
                borderRadius: '16px',
              }}
            >
              <Tooltip title="Open settings">
                <Box
                  onClick={handleOpenUserMenu}
                  sx={{ display: 'flex', flexDirection: 'row' }}
                >
                  <IconButton sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                    <Box
                      sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        alignItems: 'start',
                        paddingX: '1em',
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontWeight: '500',
                          fontSize: '16px',
                          color: '#313131',
                        }}
                      >
                        {user.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontSize: '12px',
                          color: 'rgba(49, 49, 49, 0.50);',
                        }}
                      >
                        {user.mail}
                      </Typography>
                    </Box>
                    {isUserMenuOpen ? (
                      <KeyboardDoubleArrowDownIcon
                        sx={{
                          display: { xs: 'none', md: 'flex' },
                          color: 'rgba(49, 49, 49, 0.50);',
                        }}
                      />
                    ) : (
                      <KeyboardDoubleArrowRightIcon
                        sx={{
                          display: { xs: 'none', md: 'flex' },
                          color: 'rgba(49, 49, 49, 0.50);',
                        }}
                      />
                    )}
                  </IconButton>
                </Box>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="account" onClick={handleCloseUserMenu}>
                  <Link
                    to={`/user/${user.id}`}
                    style={{ textDecoration: 'none', color: '#313131' }}
                  >
                    <Typography textAlign="center">Account</Typography>
                  </Link>
                </MenuItem>
                <MenuItem key="cases" onClick={handleCloseUserMenu}>
                  <Link
                    to="/cases"
                    style={{ textDecoration: 'none', color: '#313131' }}
                  >
                    <Typography
                      textAlign="center"
                      sx={{ textDecoration: 'none', textTransform: 'none' }}
                    >
                      My cases
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem key="bookmarks" onClick={handleCloseUserMenu}>
                  <Link
                    to={'/bookmarks'}
                    style={{ textDecoration: 'none', color: '#313131' }}
                  >
                    <Typography textAlign="center">Bookmarks</Typography>
                  </Link>
                </MenuItem>
                <MenuItem key="logout" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogoutClick}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link to="/login">
              <Button
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: '16px',
                  fontWeight: 500,
                  font: 'Inter',
                  textTransform: 'none',
                  width: { xs: '6rem', md: '10rem' },
                  backgroundColor: '#EC6D62',
                  '&:hover': { backgroundColor: '#3C404A' },
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
