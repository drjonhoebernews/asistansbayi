'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react'
import jwt from 'jsonwebtoken';  // Eğer 'jsonwebtoken' kütüphanesini projenizde kullanmıyorsanız, bu kütüphaneyi projenize eklemeniz gerekebilir.
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

const menuItems = [
  {
    name: 'Ayarlarım',
    href: routes.forms.profileSettings,
  },
  {
    name: 'Loglar',
    href: '#',
  },
];

function DropdownMenu({user}:any) {
  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp"
          name="Albert Flores"
          color="invert"
        />
        <div className="ms-3">
          <Text tag="h6" className="font-semibold">
            {user.user.first_name}
          </Text>
          <Text className="text-gray-600">{user.user.role}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={() => signOut()}
        >
          Çıkış
        </Button>
      </div>
    </div>
  );
}
interface DecodedToken {
  exp?: number;
  [key: string]: any;  // diğer key-value değerlerini kabul etmek için
}

interface Session {
  user: {
    email: string;
    id: number;
    first_name: string;
    last_name: string;
    role: string;
    avatar: string | null;
  };
  expires: string;
  accessToken: string;
  refreshToken: string;
}


export default function ProfileMenu() {
  const { data: session } = useSession() as { data: Session | null };
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  function getTokenExpiration(token: string): number | null {
    const decodedToken: DecodedToken | null = jwt.decode(token) as DecodedToken | null;
    return decodedToken?.exp || null;
  }

  // Token'in süresi dolmuş mu kontrolü
  function isTokenExpired(token: string): boolean {
    const decodedToken: DecodedToken | null = jwt.decode(token) as DecodedToken | null;

    if (!decodedToken || !decodedToken.exp) {
      console.error("Invalid token format.");
      return true;
    }

    const currentTime = Date.now().valueOf() / 1000;
    return decodedToken.exp < currentTime;
  }

  useEffect(() => {
    if (session?.accessToken) {
      const expiration = getTokenExpiration(session.accessToken);
      if (expiration) {
        const currentTime = Math.floor(Date.now() / 1000);
        setTimeLeft(expiration - currentTime);
      }
    }

    const interval = setInterval(() => {
      setTimeLeft(prevTime => (prevTime ? prevTime - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (session) {
    // console.log(isTokenExpired(session.accessToken))
    if (session.accessToken && isTokenExpired(session.accessToken)) {
      signOut();
      router.push('/signin');  // Router.push yönlendirmesi ile sayfaya yönlendirme
      return null;
    }
  } else {
    console.log('Oturum Kapalı')
  }
  return (
    <Popover
        content={() => (
            <>
              {/*{timeLeft && <div>Oturumun: {Math.floor(timeLeft / 60)} dakika {timeLeft % 60} saniye kaldı.</div>}*/}
              <DropdownMenu user={session} />
            </>
        )}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <button className="w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10">
        <Avatar
          src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp"
          name={"Asistans360"}
          color="invert"
          className="!h-9 w-9 sm:!h-10 sm:w-10"
        />
      </button>
    </Popover>
  );
}
