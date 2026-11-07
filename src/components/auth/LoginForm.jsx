import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../Field";
import FieldSet from "../FieldSet";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await api.post(
        `/auth/login`,
        formData,
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;
          console.log("login time auth token", authToken);

          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: "Invalid email or password",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
    >
      <FieldSet>
        {/* email */}
        <Field label="Email" error={errors.email}>
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
        {errors?.root?.random && (
          <div className="my-2 pb-2 text-sm text-red-600">
            {errors.root.random.message}
          </div>
        )}
        {/* login Btn */}
        <Field>
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Login
          </button>
        </Field>
      </FieldSet>
    </form>
  );
};
