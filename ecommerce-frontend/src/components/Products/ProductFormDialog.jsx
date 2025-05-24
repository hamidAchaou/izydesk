import React, { useEffect, useState } from "react";
import ImageUploadDialog from "./ImageUploadDialog";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { uploadImage } from "../../api";

const ProductFormDialog = ({
  open,
  onClose,
  onSubmit,
  product,
  categories,
}) => {
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [images, setImages] = useState(product?.images || []);
  const [isUploading, setIsUploading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      categoryId: "",
      description: "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        price: product.price || "",
        stock: product.stock || "",
        categoryId: product.category?.id || "",
        description: product.description || "",
      });
      setImages(product.images || []);
    } else {
      reset({
        name: "",
        price: "",
        stock: "",
        categoryId: "",
        description: "",
      });
      setImages([]);
    }
  }, [product, reset]);

  const handleFormSubmit = async (data) => {
    try {
      setIsUploading(true);

      // Télécharge uniquement les nouvelles images (fichiers), conserve les URLs existantes
      const uploadedImageUrls = await Promise.all(
        images.map(async (img) => {
          if (img instanceof File || img instanceof Blob) {
            return await uploadImage(img);
          }
          return img.url || img;
        })
      );

      const productData = {
        ...data,
        images: uploadedImageUrls,
      };

      await onSubmit(productData);
      onClose();
    } catch (error) {
      console.error("Échec de la sauvegarde du produit :", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenImageDialog = () => {
    setImageDialogOpen(true);
  };

  const handleCloseImageDialog = () => {
    setImageDialogOpen(false);
  };

  const handleImagesUploaded = (newImages) => {
    setImages((prev) => [...prev, ...newImages]);
    setImageDialogOpen(false);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            padding: 2,
          },
        }}
      >
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
          {product ? "Modifier le produit" : "Ajouter un nouveau produit"}
        </DialogTitle>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <DialogContent dividers sx={{ pb: 2 }}>
            {/* Champs du produit */}
            <Controller
              name="name"
              control={control}
              rules={{ required: "Le nom du produit est requis" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nom du produit"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  autoFocus
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": { color: "var(--primary-color)" },
                    "& label.Mui-focused": { color: "var(--accent-color)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "var(--border-color)" },
                      "&:hover fieldset": {
                        borderColor: "var(--accent-color)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--accent-color)",
                      },
                    },
                  }}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{ required: "La description est requise" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": { color: "var(--primary-color)" },
                    "& label.Mui-focused": { color: "var(--accent-color)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "var(--border-color)" },
                      "&:hover fieldset": {
                        borderColor: "var(--accent-color)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--accent-color)",
                      },
                    },
                  }}
                />
              )}
            />

            <Controller
              name="price"
              control={control}
              rules={{
                required: "Le prix est requis",
                min: { value: 0, message: "Le prix doit être positif" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Prix"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  inputProps={{ step: "0.01" }}
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": { color: "var(--primary-color)" },
                    "& label.Mui-focused": { color: "var(--accent-color)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "var(--border-color)" },
                      "&:hover fieldset": {
                        borderColor: "var(--accent-color)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--accent-color)",
                      },
                    },
                  }}
                />
              )}
            />

            <Controller
              name="stock"
              control={control}
              rules={{
                required: "Le stock est requis",
                min: { value: 0, message: "Le stock doit être positif" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Le stock doit être un entier",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Stock"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.stock}
                  helperText={errors.stock?.message}
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": { color: "var(--primary-color)" },
                    "& label.Mui-focused": { color: "var(--accent-color)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "var(--border-color)" },
                      "&:hover fieldset": {
                        borderColor: "var(--accent-color)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--accent-color)",
                      },
                    },
                  }}
                />
              )}
            />

            <Controller
              name="categoryId"
              control={control}
              rules={{ required: "La catégorie est requise" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Catégorie"
                  fullWidth
                  margin="normal"
                  error={!!errors.categoryId}
                  helperText={errors.categoryId?.message}
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": { color: "var(--primary-color)" },
                    "& label.Mui-focused": { color: "var(--accent-color)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "var(--border-color)" },
                      "&:hover fieldset": {
                        borderColor: "var(--accent-color)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--accent-color)",
                      },
                    },
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Box mt={2}>
              <Button variant="outlined" onClick={handleOpenImageDialog}>
                Télécharger des images
              </Button>

              <Box mt={1} sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {images.length === 0 && (
                  <Box sx={{ color: "gray", fontStyle: "italic" }}>
                    Aucune image téléchargée pour le moment
                  </Box>
                )}
                {images.map((img, index) => (
                  <Chip
                    key={index}
                    label={img.name || img.url || `Image ${index + 1}`}
                    onDelete={() => handleRemoveImage(index)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={onClose}
              disabled={isSubmitting || isUploading}
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
              Annuler
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || isUploading}
              sx={{
                backgroundColor: "var(--accent-color)",
                color: "var(--background-color)",
                "&:hover": {
                  backgroundColor: "var(--accent-hover-color)",
                },
              }}
            >
              {(isSubmitting || isUploading) ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ImageUploadDialog
        open={imageDialogOpen}
        onClose={handleCloseImageDialog}
        onUpload={handleImagesUploaded}
        initialImages={images}
      />
    </>
  );
};

export default ProductFormDialog;