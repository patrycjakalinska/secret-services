import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import VisuallyHiddenInput from './misc/VisuallyHiddenInput'
import Backdrop from './misc/Backdrop'
import MuiBackdrop from '@mui/material/Backdrop'
import cases from '../services/cases'

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

const ImageUploadModal = ({ caseToUpdate, open, setOpen, updateCaseInfo }) => {
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
    event.preventDefault()
    try {
      setLoading(true)
      setOpen(false)
        const data = new FormData()
      if (selectedFiles) {
        data.append('caseName', caseToUpdate.name)
        for (let i = 0; i < selectedFiles.length; i++) {
          data.append('files', selectedFiles[i])
        }
        data.append('caseId', caseToUpdate._id)
        const updatedCase = await cases.addPhotos(data)
        updateCaseInfo(updatedCase)

        setLoading(false)
        setFileName('')
        setSelectedFiles('')
      }
    } catch (err) {
      console.log('Something went wrong.')
    }
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
              Add photos to case
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <Button
                component="label"
                variant="contained"
                disableElevation
                sx={{
                  textTransform: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  backgroundColor: '#3C404A',
                  fontSize: '12',
                  marginX: '1rem',
                  marginTop: '1rem',
                  width: '50%',
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
              <Button
                variant="contained"
                onClick={() => console.log('A')}
                type="submit"
                disableElevation
                sx={{
                  textTransform: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  marginX: '1rem',
                  backgroundColor: '#EC6D62',
                  fontSize: '12',
                  marginTop: '1rem',
                  width: '50%',
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

export default ImageUploadModal
