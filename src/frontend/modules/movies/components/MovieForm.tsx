import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MovieInput } from '../types/movieTypes';
import TextInput from '@/shared/components/TextInput';
import Button from '@/shared/components/Button';
import Typography from '@/shared/components/Typography';
import styled from 'styled-components';

// Yup schema for validation
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  genre: yup.string().optional(),
  releaseYear: yup
    .number()
    .typeError('Release year must be a number')
    .min(1900, 'Release year must be after 1900')
    .max(new Date().getFullYear(), 'Release year cannot be in the future')
    .optional(),
});

// Props interface for the form
interface MovieFormProps {
  initialValues?: MovieInput;
  onSubmit: (data: MovieInput) => Promise<void>; // Make onSubmit async
  submitButtonLabel?: string;
  onCancel?: () => void;
}

// Styled components for form layout
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

// MovieForm component definition
const MovieForm: React.FC<MovieFormProps> = ({
  initialValues,
  onSubmit,
  submitButtonLabel = 'Save',
  onCancel,
}) => {
  // Initialize the form with validation and default values
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MovieInput>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  // Custom submit handler to handle async submission
  const onSubmitForm = async (data: MovieInput) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmitForm)}>
      <Typography variant="h5">Movie Details</Typography>

      {/* Title field */}
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Title"
            placeholder="Enter movie title"
            error={errors.title?.message}
            {...field}
          />
        )}
      />

      {/* Description field */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Description"
            placeholder="Enter movie description"
            error={errors.description?.message}
            {...field}
          />
        )}
      />

      {/* Genre field */}
      <Controller
        name="genre"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Genre"
            placeholder="Enter genre"
            error={errors.genre?.message}
            {...field}
          />
        )}
      />

      {/* Release Year field */}
      <Controller
        name="releaseYear"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Release Year"
            placeholder="Enter release year"
            type="number"
            error={errors.releaseYear?.message}
            {...field}
          />
        )}
      />

      {/* Submit and Cancel buttons */}
      <ButtonGroup>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : submitButtonLabel}
        </Button>
        {onCancel && (
          <Button type="button" $variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </ButtonGroup>
    </FormWrapper>
  );
};

export default MovieForm;
