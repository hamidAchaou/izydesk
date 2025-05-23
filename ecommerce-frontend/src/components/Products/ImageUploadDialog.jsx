import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Alert,
} from "@mui/material";

// Constants for validation
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const ImageUploadDialog = ({ 
  open, 
  onClose, 
  onUpload, 
  initialImages = [],
  maxFileSize = MAX_FILE_SIZE,
  allowedFileTypes = ALLOWED_FILE_TYPES
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Initialize with existing images and new files
  useEffect(() => {
    const existing = initialImages.filter(img => typeof img === 'string' || img.url);
    const files = initialImages.filter(img => img instanceof File);
    
    setExistingImages(existing);
    setSelectedFiles(files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    })));
  }, [initialImages]);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      selectedFiles.forEach(({ preview }) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [selectedFiles]);

  const validateFiles = (files) => {
    const errors = [];
    const validFiles = [];

    files.forEach((file) => {
      if (!allowedFileTypes.includes(file.type)) {
        errors.push({
          fileName: file.name,
          message: `Invalid file type (${file.type}). Allowed: ${allowedFileTypes.join(', ')}`
        });
      } else if (file.size > maxFileSize) {
        errors.push({
          fileName: file.name,
          message: `File too large (${(file.size / (1024 * 1024)).toFixed(2)}MB). Max: ${maxFileSize / (1024 * 1024)}MB`
        });
      } else {
        validFiles.push(file);
      }
    });

    return { errors, validFiles };
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const { errors, validFiles } = validateFiles(files);
    setValidationErrors(errors);

    if (validFiles.length > 0) {
      const filesWithPreview = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setSelectedFiles(prev => [...prev, ...filesWithPreview]);
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleRemoveExisting = (index) => {
    setExistingImages(prev => {
      const newExisting = [...prev];
      newExisting.splice(index, 1);
      return newExisting;
    });
  };

  const handleUpload = () => {
    if (validationErrors.length > 0) return;
    
    // Combine existing images with new files
    const allFiles = [
      ...existingImages,
      ...selectedFiles.map(({ file }) => file)
    ];
    
    onUpload(allFiles);
    onClose();
  };

  const totalImagesCount = existingImages.length + selectedFiles.length;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: 22,
          color: "var(--primary-color)",
          borderBottom: "1px solid var(--border-color)",
          pb: 1,
          mb: 2,
        }}
      >
        Upload Images ({totalImagesCount} selected)
      </DialogTitle>

      <DialogContent dividers>
        {/* File selection button */}
        <Button 
          variant="outlined" 
          component="label" 
          sx={{ mb: 2 }}
          disabled={totalImagesCount >= 10} // Optional: limit total images
        >
          Select Images
          <input
            type="file"
            hidden
            multiple
            accept={allowedFileTypes.join(',')}
            onChange={handleFileChange}
          />
        </Button>

        {totalImagesCount >= 10 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Maximum of 10 images allowed
          </Alert>
        )}

        {/* Validation errors */}
        {validationErrors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {validationErrors.map((error, index) => (
              <Box key={index} sx={{ fontSize: '0.875rem' }}>
                <strong>{error.fileName}:</strong> {error.message}
              </Box>
            ))}
          </Alert>
        )}

        {/* Existing images */}
        {existingImages.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Existing Images:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {existingImages.map((img, index) => (
                <Chip
                  key={`existing-${index}`}
                  label={typeof img === 'string' ? `Image ${index + 1}` : img.name || img.url}
                  onDelete={() => handleRemoveExisting(index)}
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Newly selected files */}
        {selectedFiles.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              New Images:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selectedFiles.map(({ file, preview }, index) => (
                <Box key={`new-${index}`} sx={{ position: 'relative' }}>
                  <Chip
                    label={file.name}
                    onDelete={() => handleRemoveFile(index)}
                    color="primary"
                    variant="outlined"
                  />
                  {/* Optional: Show thumbnail preview */}
                  {preview && (
                    <Box 
                      component="img"
                      src={preview}
                      alt={file.name}
                      sx={{
                        position: 'absolute',
                        bottom: '100%',
                        left: 0,
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        display: 'none',
                        '&:hover': { display: 'block' }
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {totalImagesCount === 0 && (
          <Typography variant="body2" color="textSecondary">
            No images selected
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "var(--primary-color)",
            borderColor: "var(--primary-color)",
            "&:hover": {
              backgroundColor: "var(--secondary-color)",
              borderColor: "var(--accent-hover-color)",
              color: "var(--accent-hover-color)",
            },
          }}
          variant="outlined"
        >
          Cancel
        </Button>

        <Button
          onClick={handleUpload}
          disabled={totalImagesCount === 0 || validationErrors.length > 0}
          variant="contained"
          sx={{
            backgroundColor: "var(--accent-color)",
            color: "var(--background-color)",
            "&:hover": {
              backgroundColor: "var(--accent-hover-color)",
            },
          }}
        >
          Confirm Selection
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageUploadDialog;