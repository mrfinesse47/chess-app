import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { TextField, Button } from "@chess/ui";
import { REQUIRED_MESSAGE, SigninResponse, ErrorResponse } from "@chess/utils";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "@chess/features";
/* eslint-disable-next-line */
export interface SigninProps {}

const StyledSignin = styled.div`
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
const SigninButton = styled(Button)`
  width: 100%;
`;
const ErrorText = styled.p`
  color: red;
`;
type FormValues = {
  email: string;
  password: string;
};

export function Signin(props: SigninProps) {
  const router = useRouter();
  const { setUser } = useSession();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();
  const signin = useMutation<SigninResponse, ErrorResponse, FormValues>(
    async (data) =>
      await axios({
        method: "POST",
        data,
        baseURL: "http://localhost:8001",
        url: "/api/users/login",
      })
  );
  return (
    <StyledSignin>
      <main>
        <h1>Sign In</h1>
        <SignupForm
          onSubmit={handleSubmit(async (data) => {
            try {
              const response = await signin.mutateAsync(data);
              setUser(response.data.profile);
              console.log(response);
              router.push("/");
            } catch (err) {
              console.log(err);
            }
          })}
        >
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
          <SigninButton type="submit">Sign In</SigninButton>
          {signin.isError ? (
            <ErrorText>{signin.error.message}</ErrorText>
          ) : null}
        </SignupForm>
      </main>
    </StyledSignin>
  );
}

export default Signin;
