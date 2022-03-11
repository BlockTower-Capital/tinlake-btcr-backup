import React from 'react'
import styled, { useTheme } from 'styled-components'
import { IconSearch } from '../..'
import { Box } from '../Box'
import { InputBox, InputBoxProps } from '../InputBox'

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & InputBoxProps

const StyledTextInput = styled.input`
  width: 100%;
  border: 0;
  background: transparent;
  height: 22px;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  line-height: inherit;
  color: inherit;

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }

  &:focus {
    color: ${({ theme }) => theme.colors.accentPrimary};
  }
`

export const TextInput: React.FC<TextInputProps> = ({
  label,
  secondaryLabel,
  disabled,
  errorMessage,
  ...inputProps
}) => {
  return (
    <InputBox
      label={label}
      secondaryLabel={secondaryLabel}
      disabled={disabled}
      errorMessage={errorMessage}
      inputElement={<StyledTextInput disabled={disabled} {...inputProps} />}
    />
  )
}

export const SearchInput: React.FC<TextInputProps> = ({
  label,
  secondaryLabel,
  disabled,
  errorMessage,
  ...inputProps
}) => {
  return (
    <InputBox
      label={label}
      secondaryLabel={secondaryLabel}
      disabled={disabled}
      errorMessage={errorMessage}
      inputElement={<StyledTextInput type="search" disabled={disabled} {...inputProps} />}
      rightElement={<IconSearch size="iconSmall" color="textPrimary" />}
    />
  )
}

export const DateInput: React.FC<TextInputProps> = ({
  label,
  secondaryLabel,
  disabled,
  errorMessage,
  ...inputProps
}) => {
  return (
    <InputBox
      label={label}
      secondaryLabel={secondaryLabel}
      disabled={disabled}
      errorMessage={errorMessage}
      inputElement={
        <StyledTextInput
          type="date"
          disabled={disabled}
          required // hides the reset button in Firefox
          {...inputProps}
        />
      }
    />
  )
}

const StyledNumberInput = styled(StyledTextInput)`
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const NumberInput: React.FC<TextInputProps> = ({
  label,
  secondaryLabel,
  disabled,
  errorMessage,
  rightElement,
  ...inputProps
}) => {
  return (
    <InputBox
      label={label}
      secondaryLabel={secondaryLabel}
      disabled={disabled}
      errorMessage={errorMessage}
      inputElement={<StyledNumberInput type="number" disabled={disabled} {...inputProps} />}
      rightElement={rightElement}
    />
  )
}

export type TextAreaInputProps = React.InputHTMLAttributes<HTMLTextAreaElement> & InputBoxProps

const StyledTextArea = styled(Box)`
  display: block;
  width: 100%;
  border: 2px solid transparent;
  background: transparent;
  min-height: 66px;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  line-height: inherit;
  color: inherit;
  resize: vertical;

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }

  &:focus {
    color: ${({ theme }) => theme.colors.accentPrimary};
  }
`

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  secondaryLabel,
  disabled,
  errorMessage,
  rightElement,
  ...inputProps
}) => {
  const {
    space: [, one, two],
  } = useTheme()
  return (
    <InputBox
      label={label}
      secondaryLabel={secondaryLabel}
      disabled={disabled}
      errorMessage={errorMessage}
      inputElement={
        <Box bleedX={2} bleedY={1}>
          {/* Offset the padding by 2px, to move the browser's resize gizmo a little inwards, so it doesn't overlap the rounded border  */}
          <StyledTextArea as="textarea" px={`${two - 2}px`} py={`${one - 2}px`} disabled={disabled} {...inputProps} />
        </Box>
      }
      rightElement={rightElement}
    />
  )
}