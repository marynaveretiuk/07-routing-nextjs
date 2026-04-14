"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import type { CreateNoteData } from "@/types/note";

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  content: Yup.string().max(500, "Too Long!"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = (values: CreateNoteData) => {
    createMutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Title
          <Field className={css.input} type="text" name="title" />
          <span className={css.error}>
            <ErrorMessage name="title" />
          </span>
        </label>

        <label className={css.label}>
          Content
          <Field
            className={css.textarea}
            as="textarea"
            name="content"
            rows={8}
          />
          <span className={css.error}>
            <ErrorMessage name="content" />
          </span>
        </label>

        <label className={css.label}>
          Tag
          <Field className={css.select} as="select" name="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <span className={css.error}>
            <ErrorMessage name="tag" />
          </span>
        </label>

        <div className={css.actions}>
          <button className={css.cancelButton} type="button" onClick={onClose}>
            Cancel
          </button>

          <button
            className={css.submitButton}
            type="submit"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
