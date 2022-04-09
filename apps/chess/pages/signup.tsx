import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { TextField, Button } from "@chess/ui";
import { REQUIRED_MESSAGE } from "@chess/utils";
import axios from "axios";
/* eslint-disable-next-line */
export interface SignupProps {}

const StyledSignup = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3e3e3e;
`;

const SignupForm = styled.form`
  & > * + * {
    margin-top: 1rem;
  }
`;
const SignupButton = styled(Button)`
  width: 100%;
`;
type FormValues = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
};

export function Signup(props: SignupProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();
  const signup = useMutation<unknown, unknown, FormValues>(
    async (data) => await axios.post("/api/users/signup", data)
  );
  return (
    <StyledSignup>
      <SignupForm
        onSubmit={handleSubmit(async (data) => {
          try {
            await signup.mutateAsync(data);
          } catch (err) {
            console.log(err);
          }
        })}
      >
        <TextField
          id="first-name"
          label="First Name"
          placeholder="John"
          hasError={Boolean(errors.firstName)}
          errorMessage={errors.firstName?.message}
          {...register("firstName", { required: REQUIRED_MESSAGE })}
        />
        <TextField
          id="last-name"
          label="Last Name"
          placeholder="Doe"
          hasError={Boolean(errors.lastName)}
          errorMessage={errors.lastName?.message}
          {...register("lastName", { required: REQUIRED_MESSAGE })}
        />
        <TextField
          id="user-name"
          label="Username"
          placeholder="MrFinesse"
          hasError={Boolean(errors.userName)}
          errorMessage={errors.userName?.message}
          {...register("userName", { required: REQUIRED_MESSAGE })}
        />
        <TextField
          id="email"
          type="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          hasError={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          {...register("email", { required: REQUIRED_MESSAGE })}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          hasError={Boolean(errors.password)}
          errorMessage={errors.password?.message}
          {...register("password", { required: REQUIRED_MESSAGE })}
        />
        <SignupButton type="submit">Signup</SignupButton>
      </SignupForm>
    </StyledSignup>
  );
}

export default Signup;
