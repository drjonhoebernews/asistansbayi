import SignInForm from './sign-in-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import KayitImg from  '@public/KayitImg.png';
export default function SignIn() {
  return (
    <AuthWrapperOne
        title={
            <>
                Merhaba, Sistem Sahibi! Lütfen{' '}
                <span className="relative inline-block">
            Oturum açarak
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
                kontrollerinizi başlatın.
            </>
        }
        description="Sistem sahibi olarak, platformun tüm özelliklerine ve arka plan işlevlerine erişim sağlarsınız. Tüm verilere göz atabilir, iş akışlarını optimize edebilir ve yönetimsel kararlar alabilirsiniz."
      bannerTitle="Tüm Kontrol Sizin Elinizde."
      bannerDescription="Özel olarak tasarlanmış yönetim paneli ile işletmenizin her bir yanını kolaylıkla gözlemleyin, analiz edin ve yönlendirin."
      isSocialLoginActive={true}
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <Image
            src={KayitImg}
            alt="Giriş alanı resmi"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
      }
    >
      <SignInForm />
    </AuthWrapperOne>
  );
}
