import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const CategoryFormDialog = ({
  open,
  onClose,
  onSubmit,
  category,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  React.useEffect(() => {
    if (category) {
      reset({
        name: category.name || '',
      });
    } else {
      reset({
        name: '',
      });
    }
  }, [category, reset]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'var(--background-color)',
          color: 'var(--text-color)',
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          padding: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: 22,
          color: 'var(--primary-color)',
          borderBottom: '1px solid var(--border-color)',
          pb: 1,
          mb: 2,
        }}
      >
        {category ? 'Modifier la catégorie' : 'Ajouter une nouvelle catégorie'}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent dividers sx={{ pb: 2 }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Le nom de la catégorie est requis' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nom de la catégorie"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
                autoFocus
                variant="outlined"
                sx={{
                  '& .MuiInputBase-root': { color: 'var(--primary-color)' },
                  '& label.Mui-focused': { color: 'var(--accent-color)' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'var(--border-color)' },
                    '&:hover fieldset': {
                      borderColor: 'var(--accent-color)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--accent-color)',
                    },
                  },
                }}
              />
            )}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              '&:hover': {
                backgroundColor: 'var(--secondary-color)',
                borderColor: 'var(--accent-hover-color)',
                color: 'var(--accent-hover-color)',
              },
            }}
            variant="outlined"
          >
            Annuler
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: 'var(--accent-color)',
              color: 'var(--background-color)',
              '&:hover': {
                backgroundColor: 'var(--accent-hover-color)',
              },
            }}
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryFormDialog;