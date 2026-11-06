import { useForm } from "react-hook-form";
import Field from "../Field";
import FieldSet from "../FieldSet";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    console.log("register form data", data);

    const matched = data.password === data.confirmPassword;
    if (!matched) {
      return setError("confirmPassword", {
        type: "manual",
        message: "Password does not match",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
    >
      <FieldSet>
        {/* name */}
        <Field label="Name" error={errors.name}>
          <input
            {...register("name", { required: "Name is required" })}
            className="auth-input"
            name="name"
            type="text"
            id="name"
          />
        </Field>
        {/* email */}
        <Field Field label="Email" error={errors.email}>
          <input
            {...register("email", { required: "Email is required" })}
            className="auth-input"
            name="email"
            type="email"
            id="email"
          />
        </Field>
        {/* password */}
        <Field label="Password" error={errors.password}>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="auth-input"
            name="password"
            type="password"
            id="password"
          />
        </Field>
        {/* confirm password */}
        <Field label="Retype Password" error={errors.confirmPassword}>
          <input
            className="auth-input"
            name="confirmPassword"
            type="password"
            id="confirmPassword"
          />
        </Field>
        {errors.manual && (
          <div className="m-2 text-sm text-red-600">
            {errors.manual.message}
          </div>
        )}
        {/* Submit btn */}
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Register
        </button>
      </FieldSet>
    </form>
  );
};
