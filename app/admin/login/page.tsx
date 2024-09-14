'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect to admin page after successful login
      router.push('/admin/');
    }
  };

  // If already logged in, redirect to admin page
  if (session) {
    router.push('/admin');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#000033] to-[#000066] text-white">
      <Card className="w-full max-w-md bg-blue-900/20 border-blue-400/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-36 h-12">
              <Image
                src="/images/LargeSideLogo.png"
                alt="Aoniqq Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 144px, 144px"
                priority
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-2 rounded-md flex items-center mb-4">
              <AlertCircle className="w-5 h-5 mr-2" />
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-blue-900/30 border-blue-400/30 text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-blue-900/30 border-blue-400/30 text-white placeholder-gray-400"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}