import { useState, useEffect } from 'react'
import MuiBackdrop from '@mui/material/Backdrop'
import Backdrop from '../misc/Backdrop'
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import {
  Button,
  TextField,
  Box,
  ImageListItem,
  ImageList,
  Modal,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Zoom from 'react-medium-image-zoom'
import cases from '../../services/cases'

const AllPhotosModal = ({ open, setOpen }) => {
  const id = useParams().id
  const theme = useTheme()
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [uniqueTags, setUniqueTags] = useState([])
  const [filteredPhotos, setFilteredPhotos] = useState([])
  const [filter, setFilter] = useState('all_photos')

  useEffect(() => {
    cases.getEvidenceForCase(id).then((foundEvidence) => {
      setFilteredPhotos(foundEvidence.flatMap((e) => e.photos))
      setPhotos(foundEvidence.flatMap((e) => e.photos))
    })
  }, [])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '300px', sm: '450px', md: '600px' },
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
  }

  const handleClose = () => setOpen(false)

  const handleFilter = (filter) => {
    if (filter === 'all_photos') {
      setFilteredPhotos(photos)
    } else {
      const filteredPhotos = photos.filter((p) =>
        p.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
      )
      setFilteredPhotos(filteredPhotos)
    }
  }

  useEffect(() => {
    const allTags = photos.reduce((tags, photo) => {
      return [...tags, ...photo.tags]
    }, [])

    const uniqueTagsArray = [...new Set(allTags)]
    setUniqueTags(uniqueTagsArray)
  }, [photos])

  useEffect(() => {
    handleFilter(filter)
  }, [filter])

  return (
    <div>
      <Backdrop loading={loading} />
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        onClose={handleClose}
        slots={{ backdrop: MuiBackdrop }}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              id='standard-basic'
              variant='standard'
              label='Filter'
              onChange={({ target }) => setFilter(target.value)}
            />
            <Button
              onClick={() => setOpen(false)}
              sx={{
                padding: '0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <CloseIcon fontSize='small' style={{ color: '#313131' }} />
            </Button>
          </Box>
          <ImageList
            sx={{
              width: '100%',
              height: 450,
              overflow: 'auto',
              [theme.breakpoints.up('xs')]: {
                rowHeight: 164,
                cols: 2,
              },
              [theme.breakpoints.up('sm')]: {
                rowHeight: 164,
                cols: 2,
              },
              [theme.breakpoints.up('md')]: {
                rowHeight: 164,
                cols: 3,
              },
            }}
          >
            {filteredPhotos.map((item) => (
              <ImageListItem key={item.publicId}>
                <Zoom zoomMargin={35} overlayBgColorEnd='rgba(0, 0, 0, 0.85)'>
                  <div>
                    <img
                      src={`${item.url}`}
                      alt={item.publicId}
                      loading='lazy'
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </Zoom>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Modal>
    </div>
  )
}

export default AllPhotosModal
