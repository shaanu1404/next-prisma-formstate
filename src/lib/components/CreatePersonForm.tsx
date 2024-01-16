"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { ResponseMessage, createPerson } from "@/lib/actions/personActions";
import { Button } from "./Button";
import { Alert } from "./Alert";

const formInitialState: ResponseMessage = {
  type: "success",
};

export function CreatePersonForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(createPerson, formInitialState);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (formState && formState.type === "success") {
      ref.current?.reset();
    }
  }, [formState]);

  const handleFormToggle = () => setShowForm((state) => !state);

  function displayFieldError(fieldName: "fullname" | "email") {
    return (
      formState.type === "fieldErrors" &&
      fieldName in formState.fieldErrors.fieldErrors &&
      formState.fieldErrors.fieldErrors[fieldName] && (
        <p className="text-xs text-red-500 mt-1">
          {formState.fieldErrors.fieldErrors[fieldName]?.join(", ")}.
        </p>
      )
    );
  }

  return (
    <div className="mb-4 space-y-3">
      <Button onClick={handleFormToggle}>Add new person</Button>
      {(formState?.type === "error" || formState?.type === "success") &&
        formState?.message && (
          <Alert variant={formState.type}>{formState.message}</Alert>
        )}
      {showForm && (
        <form ref={ref} className="space-y-2" action={formAction}>
          <div className="grid grid-cols-2 space-x-4">
            <div className="flex flex-col">
              <label htmlFor="fullname" className="text-sm text-gray-200">
                Fullname
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter your fullname"
                className="p-2 bg-transparent border-b border-b-green-600 placeholder:text-sm placeholder:text-gray-700 outline-none focus:border-b-green-400"
              />
              {displayFieldError("fullname")}
            </div>
            <div className="flex flex-col">
              <label htmlFor="fullname" className="text-sm text-gray-200">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="p-2 bg-transparent border-b border-b-green-600 placeholder:text-sm placeholder:text-gray-700 outline-none focus:border-b-green-400"
              />
              {displayFieldError("email")}
            </div>
          </div>
          <SubmitButton />
        </form>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="success">
      {pending && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 animate-spin"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      )}
      <span>Add person</span>
    </Button>
  );
}
