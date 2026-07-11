"use client";

import React, { HTMLInputTypeAttribute, ReactNode, useState } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Field, FieldError } from "@/components/ui/field";

import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface FormControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;

  label?: string;
  placeholder?: string;

  type?: HTMLInputTypeAttribute;

  disabled?: boolean;

  inputClassName?: string;
  containerClassName?: string;
  labelClassName?: string;

  startIcon?: ReactNode;
  endIcon?: ReactNode;

  autoComplete?: string;

  id?: string;
}

export default function FormController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  inputClassName = "",
  containerClassName = "",
  labelClassName = "",

  startIcon,
  endIcon,

  autoComplete = "off",

  id,
}: FormControllerProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={`flex flex-col gap-2 ${containerClassName}`}
        >
          {label && (
            <label
              htmlFor={id || String(name)}
              className={`text-sm font-bold text-text-title ${labelClassName}`}
            >
              {label}
            </label>
          )}

          <div className="relative">

            {startIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {startIcon}
              </div>
            )}

            <Input
              {...field}
              id={id || String(name)}
              disabled={disabled}
              autoComplete={autoComplete}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              type={
                isPassword
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              className={`
                ${startIcon ? "pr-10" : ""}
                ${isPassword || endIcon ? "pl-10" : ""}
                ${inputClassName}
              `}
            />

            {isPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              >
                {showPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            ) : (
              endIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  {endIcon}
                </div>
              )
            )}
          </div>

          {fieldState.invalid && (
            <FieldError
              className="text-danger text-sm"
              errors={
                fieldState.error?.message
                  ? [{ message: fieldState.error.message }]
                  : []
              }
            />
          )}
        </Field>
      )}
    />
  );
}