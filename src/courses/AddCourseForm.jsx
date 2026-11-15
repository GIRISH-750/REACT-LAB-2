// The form: owns its six inputs and raises "add this course" through onAdd.
// It never talks to the API itself.
import { useState } from "react";

const EMPTY = { code: "", title: "", department: "", credits: "", capacity: "", description: "" };

const FIELDS = [
  { name: "code", label: "Code", type: "text" },
  { name: "title", label: "Title", type: "text" },
  { name: "department", label: "Department", type: "text" },
  { name: "credits", label: "Credits", type: "number" },
  { name: "capacity", label: "Capacity", type: "number" },
];

export function AddCourseForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fieldErrors = error?.fieldErrors ?? {};

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onAdd({
        code: form.code,
        title: form.title,
        department: form.department,
        credits: Number(form.credits),
        capacity: Number(form.capacity),
        description: form.description === "" ? null : form.description,
      });
      setForm(EMPTY);
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="add-course" onSubmit={handleSubmit}>
      <h2>Add a course</h2>

      {FIELDS.map((field) => (
        <div className="field" key={field.name}>
          <label htmlFor={`course-${field.name}`}>{field.label}</label>
          <input
            id={`course-${field.name}`}
            name={field.name}
            type={field.type}
            value={form[field.name]}
            onChange={handleChange}
            aria-invalid={fieldErrors[field.name] ? "true" : undefined}
            aria-describedby={fieldErrors[field.name] ? `course-${field.name}-error` : undefined}
          />
          {fieldErrors[field.name] && (
            <p className="field-error" id={`course-${field.name}-error`}>
              {fieldErrors[field.name]}
            </p>
          )}
        </div>
      ))}

      <div className="field">
        <label htmlFor="course-description">Description</label>
        <textarea
          id="course-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          aria-invalid={fieldErrors.description ? "true" : undefined}
          aria-describedby={fieldErrors.description ? "course-description-error" : undefined}
        />
        {fieldErrors.description && (
          <p className="field-error" id="course-description-error">
            {fieldErrors.description}
          </p>
        )}
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error.message}
        </p>
      )}

      <button type="submit" disabled={submitting}>
        Add course
      </button>
    </form>
  );
}
