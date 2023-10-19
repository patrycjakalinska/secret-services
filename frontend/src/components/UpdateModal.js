import { useState } from 'react'
import { Box, TextField, Typography, Button, Grid, Modal } from '@mui/material'
import VisuallyHiddenInput from './utils/VisuallyHiddenInput'
import Backdrop from './utils/Backdrop'
import MuiBackdrop from '@mui/material/Backdrop'
import CloseIcon from '@mui/icons-material/Close'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
}

const UpdateModal = ({ open, setOpen }) => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState('')

  const handleClose = () => setOpen(false)

  const handleSelectImages = (e) => {
    const files = e.target.files
    setSelectedFiles(files)
    setFileName('Selected ' + e.target.files.length + ' photos')
  }
  const handleUploadImages = async (event) => {
    console.log('rere')
    // event.preventDefault()
    // try {
    //   if (selectedFiles) {
    //     setLoading(true)
    //     setOpen(false)
    //     const data = new FormData()
    //     data.append('caseName', caseToUpdate.name)
    //     for (let i = 0; i < selectedFiles.length; i++) {
    //       data.append('files', selectedFiles[i])
    //     }
    //     data.append('caseId', caseToUpdate._id)
    //     const updatedCase = await cases.addPhotos(data)
    //     updateCaseInfo(updatedCase)

    //     setLoading(false)
    //     setFileName('')
    //     setSelectedFiles('')
    //   }
    // } catch (err) {
    //   console.log('Something went wrong.')
    // }
  }

  return (
    <div>
      <Backdrop loading={loading} />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
        slots={{ backdrop: MuiBackdrop }}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <form onSubmit={handleUploadImages}>
          <Box sx={style}>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Button
                onClick={() => setOpen(false)}
                sx={{
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <CloseIcon fontSize="small" style={{ color: '#313131' }} />
              </Button>
            </Box>

            <Typography
              id="modal-modal-title"
              variant="h5"
              sx={{
                textAlign: 'center',
                fontFamily: 'Raleway',
                fontWeight: '500',
              }}
              component="h2"
            >
              Add evidence | updates
            </Typography>
            <Grid container spacing={4} sx={{ marginTop: '1em' }}>
              <Grid item xs={12}>
                <TextField
                  onChange={({ target }) => setTitle(target.value)}
                  label="Title"
                  fullWidth
                  autoFocus
                  sx={{
                    marginBottom: '.5em',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={({ target }) => setLocation(target.value)}
                  label="Location"
                  fullWidth
                  sx={{
                    marginBottom: '.5em',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="contained"
                  fullWidth
                  disableElevation
                  sx={{
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    backgroundColor: '#3C404A',
                    fontSize: '12',
                    height: '100%',
                    '&:hover': { backgroundColor: '#EC6D62' },
                  }}
                >
                  {fileName || 'Attach images'}
                  <VisuallyHiddenInput
                    type="file"
                    multiple
                    onChange={handleSelectImages}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={({ target }) => setDescription(target.value)}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  sx={{
                    marginBottom: '.5em',
                  }}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                fullWidth
                onClick={() => console.log('A')}
                type="submit"
                disableElevation
                sx={{
                  textTransform: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  backgroundColor: '#EC6D62',
                  fontSize: '12',
                  marginTop: '1rem',
                  '&:hover': { backgroundColor: '#3C404A' },
                }}
              >
                {' '}
                Upload{' '}
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  )
}

export default UpdateModal
