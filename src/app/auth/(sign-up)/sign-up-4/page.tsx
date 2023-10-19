import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import SignUpForm from './sign-up-form';

export default function SignUpPage() {
  return (
    <AuthWrapperFour
      title="Join us today! Get special benefits and stay up-to-date."
      isSocialLoginActive={true}
    >
      <SignUpForm />
    </AuthWrapperFour>
  );
}
