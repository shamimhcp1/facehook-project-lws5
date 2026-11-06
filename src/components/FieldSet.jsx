export default function FieldSet({ label, children }) {
  return (
    <fieldset>
      {label && <legend>{label}</legend>}
      <div>{children}</div>
    </fieldset>
  );
}
