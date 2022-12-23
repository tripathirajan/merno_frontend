import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Stack, styled, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';


const StyledContainer = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(2),
    borderStyle: 'dashed',
    backgroundColor: theme.palette.grey[100],
    borderColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius
}));
const StyledThumbnailOuter = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    borderRadius: '5px',
    border: `1px solid ${theme.palette.grey[300]}`,
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 120,
    height: 120,
    padding: '3px',
    boxSizing: 'border-box',
    position: 'relative'
}));
const StyledThumbnailInner = styled(Box)(({ theme }) => ({
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
}));

const StyledImage = styled('img')(({ theme }) => ({
    display: 'block',
    width: 'auto',
    height: '100%',
    borderRadius: '5px'
}));



const Thumbnail = React.memo((props) => {
    const { preview, onRemoveClick } = props;
    return (<StyledThumbnailOuter component="div">
        <StyledThumbnailInner>
            <StyledImage
                src={preview}
                onLoad={() => { URL.revokeObjectURL(preview) }}
            />
        </StyledThumbnailInner>
        <IconButton
            sx={{
                right: '-10px',
                top: '-10px',
                position: 'absolute',
                zIndex: 1,
                p: 0
            }}
            onClick={onRemoveClick}
        >
            <CancelRoundedIcon color="error" />
        </IconButton>
    </StyledThumbnailOuter>)
});

const FileUploaded = React.memo(props => {
    const { name, handleOnChangeFile } = props;
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg'],
        },
        maxFiles: 1,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    const handleImageRemove = (index) => {
        if (!files?.length) {
            return;
        }
        const filtered = files.filter((file, row) => row !== index);
        setFiles(filtered);
    }

    return (
        <StyledContainer
            direction="column"
            component="section"
            spacing={2}
        >
            <Stack
                alignItems="center"
                justifyContent="center"
                {...getRootProps({ className: 'dropzone' })}
            >
                <input
                    name={name}
                    onChange={handleOnChangeFile}
                    {...getInputProps()}
                />
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>Click here or Drop files here.</Typography>
            </Stack>
            <Box component="aside" display="flex" sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {
                    files.map((file, index) => <Thumbnail key={file?.preview} preview={file?.preview} onRemoveClick={() => {
                        handleImageRemove(index)
                    }} />)
                }
            </Box>
        </StyledContainer>
    )
})


export default FileUploaded;