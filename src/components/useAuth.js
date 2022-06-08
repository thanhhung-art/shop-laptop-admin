import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

function useAuth() {
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch('/api/auth/check/admin');
      const data = await res.json();
      setVerified(data.success);

      if (!data.success) {
        localStorage.removeItem('userId');
        router.push('/login');
      }
    }

    checkAuth();
  },[])

  return [verified];
}

export default useAuth;