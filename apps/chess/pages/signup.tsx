import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { TextField, Button } from "@chess/ui";
import { REQUIRED_MESSAGE, SignupResponse, ErrorResponse } from "@chess/utils";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "@chess/features";
/* eslint-disable-next-line */
export interface SignupProps {}

const StyledSignup = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SignupForm = styled.form`
  & > * + * {
    margin-top: var(--flow);
  }
`;
const SignupButton = styled(Button)`
  width: 100%;
`;
const ErrorText = styled.p`
  color: red;
`;
type FormValues = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
};

export function Signup(props: SignupProps) {
  const router = useRouter();
  const { setUser } = useSession();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();
  const signup = useMutation<SignupResponse, ErrorResponse, FormValues>(
    async (data) =>
      await axios({
        method: "POST",
        data,
        baseURL: "http://localhost:8001",
        url: "/api/users/signup",
      })
  );
  return (
    <StyledSignup>
      <main>
        <h1>Signup</h1>
        <SignupForm
          onSubmit={handleSubmit(async (data) => {
            try {
              const response = await signup.mutateAsync(data);
              setUser(response.data.profile);
              router.push("/");
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
          {signup.isError ? (
            <ErrorText>{signup.error.message}</ErrorText>
          ) : null}
        </SignupForm>
      </main>
    </StyledSignup>
  );
}

export default Signup;
