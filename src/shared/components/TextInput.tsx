import React from 'react';
import styled from 'styled-components';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  $width?: string;
  $padding?: string;
  $fontSize?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const StyledInput = styled.input<{
  $hasError: boolean;
  $customWidth: string;
  $customPadding: string;
  $customFontSize: string;
}>`
  padding: ${({ $customPadding }) => $customPadding || '0.5rem'};
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? theme.palette.error.main : '#ccc')};
  border-radius: 4px;
  font-size: ${({ $customFontSize }) => $customFontSize || '1rem'};
  width: ${({ $customWidth }) => $customWidth || '100%'};
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.palette.error.main : theme.palette.primary.main};
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const TextInput: React.FC<TextInputProps> = ({
  value = '', // Default to empty string if undefined
  onChange,
  placeholder,
  label,
  error,
  $width = '100%',
  $padding = '0.5rem',
  $fontSize = '1rem',
  type = 'text', // Default to "text" input type
  ...restProps // Collect any additional props
}) => (
  <Wrapper>
    {label && <Label>{label}</Label>}
    <StyledInput
      type={type}
      value={value !== undefined ? String(value) : ''} // Convert to string for HTML input compatibility
      onChange={onChange}
      placeholder={placeholder}
      $hasError={!!error}
      aria-describedby={error ? 'error-message' : undefined}
      $customWidth={$width}
      $customPadding={$padding}
      $customFontSize={$fontSize}
      {...restProps} // Spread additional props here
    />
    {error && <ErrorMessage id="error-message">{error}</ErrorMessage>}
  </Wrapper>
);

export default TextInput;
