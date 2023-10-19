import AuthWrapperTwo from '@/app/shared/auth-layout/auth-wrapper-two';
import SignUpForm from './sign-up-form';

export default function SignUpPage() {
  return (
    <AuthWrapperTwo title="Sign Up!" isSocialLoginActive={true}>
      <SignUpForm />
    </AuthWrapperTwo>
  );
}
